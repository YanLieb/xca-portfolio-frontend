import getStrapiContent from "@/strapi";

import HomeSliderComponent from "@/app/components/homeSlider/HomeSliderComponent";
import "./home.css";

export default async function Page() {
  try {
    const request = `projects?filters[featured][$eq]=true&populate=cover`;

    const projects = await getStrapiContent(request);

    return (
      <div className="page page-home overflow-hidden">
        <div className="homepage-container container">
          <HomeSliderComponent slides={projects} />
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
