import getStrapiContent from "@/strapi";
import Project from "@/app/projects/[slug]/project/Project";

import { notFound } from 'next/navigation';

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
  const { slug } = await params;
  const request = `projects?filters[slug][$eqi]=${slug}&populate=*`;

  const project = await getStrapiContent(request);

  if (!project || project.length === 0) {
    console.warn(`Project with slug "${slug}" not found.`);
    notFound();
  }

  return <Project project={project[0]} />;

}
