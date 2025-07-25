import getStrapiContent from "@/strapi";

import PageHeader from "./layouts/pageHeader";
import PageBody from "./layouts/pageBody";
import "./page.css";

import {notFound} from 'next/navigation';

export async function generateMetadata({params}) {
    const {slug} = params;
    const request = `pages?filters[slug][$eqi]=${slug}`;
    const pageItem = await getStrapiContent(request);

    if (!pageItem || pageItem.length === 0) {
        return {
            title: "Page Not Found | Xca Portfolio",
            description: "Cette page n'existe pas.",
        };
    }

    const {title, description} = pageItem[0];

    if (slug === "projets") {
        return {
            title: "Projets | Xca Portfolio",
            description: "Explorez les projets de Xcaret Castillo Sanchez.",
        };
    }

    if (slug === "a-propos") {
        return {
            title: "À propos | Xca Portfolio",
            description: "À propos de Xcaret Castillo Sanchez.",
        }
    }

    return {
        title: title || "Xca Portfolio",
        description: description || "Portfolio de Xcaret Castillo Sanchez.",
    };
}


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


export default async function Page({params}) {
    const {slug} = await params;

    const fieldsToPopulate = ["image", "project", "page", "file", "projets"];
    const populateFields = [
        ...fieldsToPopulate.map((field) => `body.${field}`),
        ...fieldsToPopulate.map((field) => `header.${field}`),
    ];

    const request = `pages?filters[slug][$eqi]=${slug}&populate=${populateFields.join(
        ","
    )}`;

    const pageItem = await getStrapiContent(request);

    if (!pageItem || pageItem.length === 0) {
        console.warn(`Page with slug "${slug}" not found.`);
        notFound();
    }

    let projects = [];
    if (slug === "projets") {
        projects = await getStrapiContent("projects?populate=cover");
        console.log("Projects fetched:", projects);
    }

    if (!pageItem) throw new Error("Page does not exist or has no content");

    const header = pageItem[0].header
        ? pageItem[0].header
        : console.warn("No header content");
    const body = pageItem[0].body
        ? pageItem[0].body
        : console.warn("No body content");


    return (
        <div className={`page page-${pageItem[0].slug} page-${pageItem[0].id}`}>
            <div className={`page-${pageItem[0].slug}__container container`}>
                <PageHeader header={header}/>
                <PageBody body={body} projects={projects} slug={slug}/>
            </div>
        </div>
    );
}
