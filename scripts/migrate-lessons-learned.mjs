import fs from "fs";
import path from "path";
import crypto from "crypto";

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r03r0hgb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.argv[2] || process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;
const apiVersion = "2026-06-03";

function generateKey() {
  return crypto.randomBytes(6).toString("hex");
}

async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`Fetch attempt ${i + 1} failed (${err.message}). Retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
}

async function queryDocuments() {
  const query = encodeURIComponent(`*[_type == "caseStudy"]{ _id, _rev, title, "slug": slug.current, lessonsLearned, lessons }`);
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
  const res = await fetchWithRetry(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity query failed (${res.status}): ${text}`);
  }
  const json = await res.json();
  return json.result || [];
}

async function mutateDocuments(mutations) {
  if (!token) {
    throw new Error("SANITY_API_WRITE_TOKEN or SANITY_AUTH_TOKEN is required to execute mutations.");
  }
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnDocuments=true`;
  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity mutation failed (${res.status}): ${text}`);
  }
  return await res.json();
}

async function runMigration() {
  console.log(`\n========================================`);
  console.log(`Starting Sanity Lessons Learned Migration`);
  console.log(`Project: ${projectId} | Dataset: ${dataset}`);
  console.log(`========================================\n`);

  const documents = await queryDocuments();
  console.log(`Total caseStudy documents found: ${documents.length}`);

  let totalWithLessons = 0;
  let totalWithStrings = 0;
  let totalStringsCount = 0;

  const docsToMigrate = [];

  for (const doc of documents) {
    const rawLessons = doc.lessonsLearned || doc.lessons;
    if (Array.isArray(rawLessons) && rawLessons.length > 0) {
      totalWithLessons++;
      const stringItems = rawLessons.filter((item) => typeof item === "string");
      if (stringItems.length > 0) {
        totalWithStrings++;
        totalStringsCount += stringItems.length;
        docsToMigrate.push(doc);
      }
    }
  }

  console.log(`- Documents with lessonsLearned: ${totalWithLessons}`);
  console.log(`- Documents containing legacy string lessons: ${totalWithStrings}`);
  console.log(`- Total legacy string items to convert: ${totalStringsCount}\n`);

  if (docsToMigrate.length === 0) {
    console.log("No legacy string lessons found. Dataset is already 100% structured!");
    return;
  }

  const mutations = [];

  for (const doc of docsToMigrate) {
    const rawLessons = doc.lessonsLearned || doc.lessons || [];
    const transformedLessons = rawLessons.map((item, idx) => {
      if (typeof item === "string") {
        return {
          _type: "lessonLearnedItem",
          _key: generateKey(),
          title: item.trim(),
        };
      }
      if (item && typeof item === "object") {
        return {
          _type: "lessonLearnedItem",
          _key: item._key || generateKey(),
          title: item.title || item.heading || item.name || `Lesson ${idx + 1}`,
          ...(item.description ? { description: item.description } : {}),
        };
      }
      return null;
    }).filter(Boolean);

    console.log(`Migrating "${doc.title}" (${doc._id}):`);
    console.log(`  Before: ${JSON.stringify(rawLessons)}`);
    console.log(`  After:  ${JSON.stringify(transformedLessons, null, 2)}`);

    mutations.push({
      patch: {
        id: doc._id,
        set: {
          lessonsLearned: transformedLessons,
        },
      },
    });
  }

  console.log(`\nApplying ${mutations.length} document patch mutation(s)...`);
  const mutationResult = await mutateDocuments(mutations);
  console.log(`Mutation applied successfully!`);

  // Verify post-migration state
  console.log(`\n========================================`);
  console.log(`Post-Migration Verification`);
  console.log(`========================================\n`);

  const updatedDocs = await queryDocuments();
  let remainingStrings = 0;
  let totalStructuredItems = 0;

  for (const doc of updatedDocs) {
    const lessons = doc.lessonsLearned;
    if (Array.isArray(lessons)) {
      for (const item of lessons) {
        if (typeof item === "string") {
          remainingStrings++;
        } else if (item && item._type === "lessonLearnedItem") {
          totalStructuredItems++;
        }
      }
    }
  }

  console.log(`Post-migration audit:`);
  console.log(`- Remaining string lessons: ${remainingStrings}`);
  console.log(`- Total structured lessonLearnedItem objects: ${totalStructuredItems}`);

  if (remainingStrings === 0) {
    console.log(`\n SUCCESS: All legacy lessons have been 100% migrated to structured lessonLearnedItem objects!\n`);
  } else {
    console.error(`\n WARNING: ${remainingStrings} string items still remain! Check queries.\n`);
    process.exit(1);
  }
}

runMigration().catch((err) => {
  console.error("Migration failed with error:", err);
  process.exit(1);
});
