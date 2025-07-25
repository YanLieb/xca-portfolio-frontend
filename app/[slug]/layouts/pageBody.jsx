"use client"

import SwitchComponent from "@/app/components/switchComponent"
import ProjectList from "@/app/components/projectList/ProjectList";

export default function PageBody(params) {
	const {body, slug, projects} = params;
	
	return (
		 <section className={"page-body"}>
			 <SwitchComponent pageContent={body}/>
			 {slug === "projets" ? <ProjectList projects={projects}/> : null}
		 </section>
	)
}