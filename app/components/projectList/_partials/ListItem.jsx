import ButtonComponent from "@/app/components/buttonComponent/ButtonComponent";
import Link from "next/link";
import Image from "next/image";

export default function ListItem({ project, index }) {
  const projectLink = (project) => {
    return `/projects/${project.slug}`;
  };

  const limitText = (text, limit = 250) => {
    if (text.length <= limit) return text;
    const truncated = text.slice(0, limit);
    return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
  };

  return (
    <div className="w-full h-full relative flex gap-4 md:flex-col-reverse sm:justify-end">
      <div className="project-list__item-text flex flex-col gap-4 justify-evenly basis-1/2 md:basis-0 md:w-full md:min-h-[180px]">
        <h2 className="project-list__item-title text-2xl m-0">
          {project.title}
        </h2>
        <p className="project-list__item-description m-0">
          {project.short_description ??
            limitText(project.description[0].children[0].text)}
        </p>
        <div className="flex justify-between items-center gap-4">

          <ButtonComponent
            button={{ title: project.button_text ?? 'Read more', link: projectLink(project) }}
            classes="project-list__item-button"
          />
          <span className="font-chainprinter text-5xl hidden md:block">
            {(index + 1).toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="project-list__item-image my-auto h-full basis-1/2 md:basis-0 md:max-h-full">
        <Link href={projectLink(project)}>
          <Image
            src={project.cover.url}
            alt={project.cover.alternativeText ?? project.title}
            width={project.cover.width}
            height={project.cover.height}
            className="aspect-[2/3] h-full w-full object-cover"
            priority
          />
        </Link>
      </div>
      <div className="project-list__separator w-1/2 h-px bg-black absolute -bottom-[30px] left-1/2 -translate-x-1/2 md:bottom-1/2 md:w-px md:h-1/2 md:translate-y-1/2 md:translate-x-[20px] md:left-full"></div>
    </div>
  );
}
