import getStrapiContent from "@/strapi";

import PageHeader from "./layouts/pageHeader";
import PageBody from "./layouts/pageBody";
import "./page.css";

export async function generateStaticParams() {
  const pages = await getStrapiContent("pages");

  if (!pages || !Array.isArray(pages)) {
    console.error("⚠️ Invalid response from Strapi:", pages);
    return [];
  }

  return pages
    .filter((page) => page.attributes?.slug)
    .map((page) => ({
      slug: page.attributes.slug,
    }));
}


export default async function Page({ params }) {
  const { slug } = await params;

  const fieldsToPopulate = ["image", "project", "page", "file", "projects"];
  const populateFields = [
    ...fieldsToPopulate.map((field) => `body.${field}`),
    ...fieldsToPopulate.map((field) => `header.${field}`),
  ];

  const request = `pages?filters[slug][$eqi]=${slug}&populate=${populateFields.join(
    ","
  )}`;

  try {
    const pageItem = await getStrapiContent(request);

    let projects = [];
    if (slug === "projects") {
      projects = await getStrapiContent("projects?populate=cover");
    }

    if (!pageItem) throw new Error("Page does not exist or has no content");

    const header = pageItem[0].header
      ? pageItem[0].header
      : console.warn("No header content");
    const body = pageItem[0].body
      ? pageItem[0].body
      : console.warn("No body content");

    return (
      <div className={`page page-${pageItem[0].slug}`}>
        <div className={`page-${pageItem[0].slug}__container container`}>
          <PageHeader header={header} />
          <PageBody body={body} projects={projects} slug={slug} />
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return (
      <div className="section__content">
        <div className="section__title">Error</div>
        <div className="section__description">{e.message}</div>
      </div>
    );
  }
}
