
import Image from "next/image";

export default function SocialLinks({ links, classes }) {
  return (
    <ul className={classes}>
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.url} target="_blank">
            <Image
              className="w-5 h-full"
              src={link.icon.url}
              alt={link.icon.alternativeText ?? link.icon.name}
              width={link.icon.width}
              height={link.icon.height}
              priority={true}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
