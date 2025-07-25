export let apiUrl = process.env.NEXT_PUBLIC_API_URL;
export let assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;
export let env = process.env.NEXT_PUBLIC_ENVIRONMENT;

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


   /* if (env === 'development') {
      const modifiedData = Object.fromEntries(
        Object.entries(data.data).map(([key, value]) => {
          if (!value) return [key, value];

          if (key === 'url') {
            return [key, `${value}`];
          }

          if (typeof value === 'object' && !Array.isArray(value)) {
            const newValue = Object.fromEntries(
              Object.entries(value).map(([subkey, subvalue]) => {
                if (!subvalue) return [subkey, subvalue];
                if (subkey === 'url') {
                  return [subkey, `${assetsUrl}${subvalue}`];
                }
                return [subkey, subvalue];
              })
            );
            return [key, newValue];
          }

          return [key, value];
        })
      );

      return modifiedData;
    }*/

    return data.data;
  } catch (err) {
    console.error(err);
  }
}
