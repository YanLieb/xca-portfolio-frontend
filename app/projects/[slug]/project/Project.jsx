"use client";

import { useState } from "react";

import SliderComponent from "@/app/projects/[slug]/project/sliderComponent/SliderComponent";
import TextComponent from "@/app/components/textComponent/TextComponent";

export default function Project({ project }) {
  const [descriptionWidth, setDescriptionWidth] = useState(0);

  const setDescriptionContainerWidth = (slideWidth) => {
    setDescriptionWidth(slideWidth);
  };

  return (
    <div className="page page-project project-component overflow-hidden">
      <div className="project-component__content container">
        <div className="project-component__slider">
          {project.gallery.length === 0 && (
            <div className="project-component__no-gallery text-center italic">
              <p>No Gallery yet</p>
            </div>
          )}
          <SliderComponent
            medias={[project.cover, ...project.gallery ? project.gallery : []]}
            setDescriptionContainerWidth={setDescriptionContainerWidth}
          />
        </div>
        <div
          className={`project-component__description mx-auto`}
          style={{ width: descriptionWidth }}
        >
          <TextComponent text={project.description} />
        </div>
      </div>
    </div>
  );
}
