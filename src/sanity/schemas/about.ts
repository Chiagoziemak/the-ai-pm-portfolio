export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "bio",
      title: "Biography",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "skills",
      title: "Skills & Tools",
      type: "array",
      of: [
        {
          type: "object",
          name: "skillGroup",
          title: "Skill Group",
          fields: [
            { name: "category", title: "Category", type: "string" },
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "skillItem",
                  fields: [
                    { name: "name", title: "Name", type: "string" },
                    { name: "level", title: "Level (0-100)", type: "number" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "journey",
      title: "Visual Journey",
      type: "array",
      of: [
        {
          type: "object",
          name: "journeyItem",
          title: "Journey Milestone",
          fields: [
            { name: "year", title: "Year", type: "string" },
            { name: "title", title: "Role Title", type: "string" },
            { name: "company", title: "Company Name", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    },
    {
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
