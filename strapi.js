export let apiUrl = process.env.NEXT_PUBLIC_API_URL;
export let assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
  apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api/";
  assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL || "http://localhost:1337";
} else {
  apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://strapi:1337/api/";
  assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL || "http://strapi:1337";
}

export default async function getStrapiContent(request) {
  try {
    const strapi = await fetch(apiUrl + request, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!strapi) throw new Error("no strapi content found");
    const data = await strapi.json();
    if (!data) throw new Error("no strapi data found");
    return data.data;
  } catch (err) {
    console.error(err);
  }
}
