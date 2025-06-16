"use client";

import { useRef, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Image from "next/image";
import Link from "next/link";

import { assetsUrl } from "@/strapi";
import "./homeSliderComponent.css";
import sliderArrow from "@/public/svg/slider-arrow.svg";

export default function HomeSliderComponent({ slides }) {
  const containerRef = useRef(null);
  const [swiperNavigationWidth, setSwiperNavigationWidth] = useState(0);
  const swiperInstance = useRef(null);

  const projectLink = (project) => {
    return `/projects/${project.slug}`;
  };

  const updateSlideWidth = () => {
    if (containerRef.current) {
      const slideEl = containerRef.current.querySelector(".swiper-slide");
      if (slideEl) {
        setSwiperNavigationWidth(slideEl.offsetWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateSlideWidth);
    updateSlideWidth();
    return () => window.removeEventListener("resize", updateSlideWidth);
  }, []);

  if (!slides || slides.length === 0) {
    return (
      <div className="home-slider">
        <div className="home-slider__no-content text-center italic">
          <p>No Projects yet</p>
        </div>
      </div>
    );
  }

  useGSAP(
    () => {
      const slides = containerRef.current.querySelectorAll(
        ".home-slider__slide"
      );

      gsap.fromTo(
        slides,
        {
          x: containerRef.current.offsetWidth,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power4.out",
        }
      );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {

    },
    { scope: containerRef }
  )

  return (
    <Swiper
      ref={containerRef}
      className="home-slider !overflow-visible relative"
      modules={[Pagination, Navigation, Mousewheel]}
      slidesPerView={1}
      spaceBetween={15}
      centeredSlides={true}
      rewind={true}
      initialSlide={1}
      mousewheel={{
        enable: true,
        releaseOnEdges: true,
        thresholdDelta: 50,
        thresholdTime: 100,
      }}
      onSwiper={(swiper) => {
        swiperInstance.current = swiper;
        updateSlideWidth();
      }}
      navigation={{
        prevEl: ".swiper .swiper-button-prev",
        nextEl: ".swiper .swiper-button-next",
      }}
      pagination={{
        el: ".swiper .swiper-pagination",
        type: "fraction",
        clickable: true,
      }}
      breakpoints={{
        1024: {
          slidesPerView: 1.3,
        },
        1280: {
          slidesPerView: 1.8,
        },
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="home-slider__slide mb-10" >
          <Link href={projectLink(slide)} className="home-slider__slide-container w-full h-full">
            <div className="home-slider__slide-image">
              <Image
                src={slide.cover.url}
                alt={slide.cover.alternativeText ?? slide.cover.legend}
                height={slide.cover.height}
                width={slide.cover.width}
                className="object-cover aspect-[2/3] sm:aspect-square"
                priority={true}
              />
            </div>
            <div className="text-right">
              <h2 className="home-slider__slide-title m-0 text-4xl -mt-4 text-balance">
                {slide.title}
              </h2>
              <p className="home-slider__slide-description text-balance hidden">
                {slide.short_description}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))
      }
      <div
        className="swiper-navigation mx-auto my-4 flex justify-between"
        style={{ width: swiperNavigationWidth }}
      >
        <div className="swiper-pagination hidden md:block"></div>
        <div className="swiper-buttons flex items-center gap-4">
          <div className="swiper-button-prev cursor-pointer py-2">
            <Image src={sliderArrow} alt="slider arrow" />
          </div>
          <div className="swiper-button-next cursor-pointer py-2">
            <Image
              src={sliderArrow}
              alt="slider arrow"
              className="rotate-180"
            />
          </div>
        </div>
        <Link href="" className="font-medium">
          See all projects
        </Link>
      </div>
    </Swiper >
  );
}
