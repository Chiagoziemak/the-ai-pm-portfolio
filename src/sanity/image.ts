import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  if (!source || !source.asset) {
    return null;
  }
  return builder.image(source);
}
