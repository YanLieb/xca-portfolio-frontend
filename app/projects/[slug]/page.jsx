import getStrapiContent from "@/strapi";
import Project from "@/app/projects/[slug]/project/Project";

export async function generateStaticParams() {
  const data = await getStrapiContent("projects");

  if (!data || !Array.isArray(data)) {
    console.error("⚠️ Invalid response from Strapi:", data);
    return [];
  }

  return data
    .filter((project) => project.attributes?.slug)
    .map((project) => ({
      slug: project.attributes.slug,
    }));
}

export default async function Page({ params }) {
  try {
    const { slug } = await params;
    const request = `projects?filters[slug][$eqi]=${slug}&populate=*`;

    const project = await getStrapiContent(request);
    return <Project project={project[0]} />;
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
