import getStrapiContent from "@/strapi";
import { notFound } from "next/navigation";

import HomeSliderComponent from "@/app/components/homeSlider/HomeSliderComponent";
import "./home.css";

export const metadata = {
  title: "Home | Xca Portfolio",
  description: "Welcome to the design portfolio of Xcaret Castillo Sanchez.",
};

export default async function Page() {
  try {
    const request = `projects?filters[featured][$eq]=true&populate=cover`;
    const homepageRequest = `pages?filters[slug][$eq]=/&populate[body][populate]=*`;
    const homepage = await getStrapiContent(homepageRequest);

    const projects = await getStrapiContent(request);

    if (!homepage || homepage.length === 0) {
      console.warn("Homepage content not found.");
      notFound();
    }

    return (
      <div className="page page-home overflow-hidden">
        <div className="homepage-container container">
          {projects && projects.length > 0 && homepage[0].body[0] && (
            <HomeSliderComponent slides={projects} button={homepage[0].body[0]} />
          )}
        </div>
      </div >
    );
  } catch (err) {
    console.error(err);
    return (
      <div className="section__content">
        <div className="section__title">Error</div>
        <div className="section__description">{err.message}</div>
      </div>
    );
  }
}
