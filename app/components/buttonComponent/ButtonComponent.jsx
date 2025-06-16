'use client'
import { useState, useEffect } from "react";

import Image from "next/image"
import Link from "next/link";

import buttonArrow from "@/public/svg/button-arrow.svg"
import './buttonComponent.css'

export default function ButtonComponent({ button, classes }) {
	const [buttonState, setButtonState] = useState({ ...button });

	useEffect(() => {
		let newLink = "#";

		switch (button.add_to_button) {
			case "file":
				newLink = `${button.file.url}`;
				break;
			case "page":
				newLink = `${button.page?.slug || "#"}`;
				break;
			case "project":
				newLink = `/projects/${button.project?.slug || "#"}`;
				break;
			default:
				newLink = button.link || "#";
		}

		setButtonState((prev) => ({ ...prev, link: newLink }));
	}, [button]);


	return (
		<Link
			href={buttonState.link ?? "#"}
			className={`flex gap-2 items-center ${classes ? classes : ''}`}
			target={buttonState.open_in_new_tab ? "_blank" : "_self"}
			rel={buttonState.open_in_new_tab ? "noopener noreferrer" : undefined}
		>
			{buttonState.title}
			<Image src={buttonArrow} alt="button arrow" className="w-8 h-auto" />
		</Link>
	);
}
