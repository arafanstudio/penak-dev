import { client } from '$lib/sanity/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const showcases = await client.fetch(`*[_type == "showcase"] | order(order asc) {
    "id": _id,
    title,
    image,
    category,
    url,
    order
  }`);

  return {
    showcases
  };
};
