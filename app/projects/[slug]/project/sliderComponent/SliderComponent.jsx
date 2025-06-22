"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import VideoComponent from "@/app/components/videoComponent/VideoComponent";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";

import "./SliderComponent.css";
import sliderArrow from "@/public/svg/slider-arrow.svg";

export default function SliderComponent({
	medias,
	setDescriptionContainerWidth = (slideWidth) => {
	},
}) {
	const containerRef = useRef(null);
	const [swiperNavigationWidth, setSwiperNavigationWidth] = useState(0);
	const swiperInstance = useRef(null);

	const updateSlideWidth = () => {
		if (containerRef.current) {
			const slideEl = containerRef.current.querySelector(".swiper-slide");
			if (slideEl) {
				setDescriptionContainerWidth(slideEl.offsetWidth);
				setSwiperNavigationWidth(slideEl.offsetWidth);
			}
		}
	};

	useEffect(() => {
		window.addEventListener("resize", updateSlideWidth);
		updateSlideWidth();
		return () => window.removeEventListener("resize", updateSlideWidth);
	}, []);

	useGSAP(
		() => {
			const slides = containerRef.current.querySelectorAll(
				".slider-component__slide"
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

	return (
		<Swiper
			ref={containerRef}
			className="slider-component__slides mb-10 !overflow-visible"
			modules={[Pagination, Navigation]}
			slidesPerView={1}
			spaceBetween={15}
			centeredSlides={true}
			initialSlide={1}
			onSwiper={(swiper) => {
				swiperInstance.current = swiper;
				updateSlideWidth();
			}}
			pagination={{
				el: ".swiper .swiper-pagination",
				type: "fraction",
				clickable: true,
			}}
			navigation={{
				prevEl: ".swiper .swiper-button-prev",
				nextEl: ".swiper .swiper-button-next",
			}}
			onSlideChange={updateSlideWidth}
			breakpoints={{
				1024: {
					slidesPerView: 1.5,
				},
				1280: {
					slidesPerView: 2,
				},
			}}
		>
			{medias.map((media, index) => (
				<SwiperSlide key={index} className={`slider-component__slide`}>
					{media.mime.startsWith("video/") ?
						(
							<VideoComponent media={media}
								classes={"aspect-[2/3] flex flex-col items-center justify-center md:aspect-square"}
								controls={false}
								autoplay={false}
								videoClasses={""} />
						) : (
							<Image
								priority={index === 0}
								src={media.url}
								alt={media.alternativeText ?? media.name}
								height={media.height}
								width={media.width}
								className="object-cover aspect-[2/3] md:aspect-square"
							/>)}
				</SwiperSlide>
			))
			}
			<div
				className="swiper-navigation mx-auto my-4 flex justify-between"
				style={{ maxWidth: `${swiperNavigationWidth}px` }}
			>
				<div className="swiper-pagination"></div>
				<div className="swiper-buttons flex items-center gap-4">
					<div className="swiper-button-prev">
						<Image src={sliderArrow} alt="slider arrow" />
					</div>
					<div className="swiper-button-next">
						<Image
							src={sliderArrow}
							alt="slider arrow"
							className="rotate-180"
						/>
					</div>
				</div>
			</div>
		</Swiper>
	);
}
