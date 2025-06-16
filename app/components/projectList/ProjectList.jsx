"use client";

import { useState, useEffect, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";

import ListItem from "./_partials/ListItem";
import "./ProjectList.css";

export default function ProjectList({ projects }) {
  const [sortedProjects, setSortedProjects] = useState([]);
  const projectListRef = useRef(null);

  const getDirection = () => {
    if (typeof window === "undefined") return "horizontal";
    return window.innerWidth < 768 ? "vertical" : "horizontal";
  };
  const getSpaceBetween = () => {
    if (typeof window === "undefined") return 60;
    return window.innerWidth < 768 ? 60 : 40;
  };

  const [direction, setDirection] = useState(getDirection() ?? "horizontal");
  const [spaceBetween, setSpaceBetween] = useState(getSpaceBetween() ?? 60);

  useEffect(() => {
    const sorted = [...projects].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortedProjects(sorted);

    const handleResize = () => {
      //setSlidesPerView(getSlidesPerView());
      setDirection(getDirection());
      setSpaceBetween(getSpaceBetween());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [projects]);

  useGSAP(
    () => {
      const items = projectListRef.current.querySelectorAll(
        ".project-list__item"
      );
      if (!items.length) return;

      gsap.from(items, {
        x: 500,
        opacity: 0,
        stagger: 0.3,
        duration: 2,
        ease: "expo.out",
      });
    },
    {
      scope: projectListRef,
      dependencies: [sortedProjects],
    }
  );

  if (!sortedProjects || sortedProjects.length === 0) {
    return (
      <div
        ref={projectListRef}
        className="project-list flex justify-center items-center h-full w-full"
      >
        <div className="project-list__no-content text-center italic">
          <p>No Projects yet</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={projectListRef} className="project-list flex justify-center items-center h-full w-full">
      <Swiper
        className="h-dvh mb-12 md:h-full w-full !overflow-visible"
        modules={[Pagination, Navigation, Mousewheel]}
        slidesPerView={2}
        spaceBetween={spaceBetween}
        direction={direction}
        mousewheel={{
          enable: true,
          releaseOnEdges: true,
          thresholdDelta: 50,
          thresholdTime: 100,
        }}
        breakpoints={{
          768: {
            slidesPerView: 1.5,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 2.5,
          },
          1536: {
            slidesPerView: 3.1,
          },
        }}
      >
        {sortedProjects.map((project, index) => (
          <SwiperSlide
            key={index}
            className="project-list__item w-full h-full md:max-h-fit"
          >
            <ListItem project={project} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
