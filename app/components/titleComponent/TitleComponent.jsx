import "./titleComponent.css";

export default function TitleComponent({ title, level, classes }) {
  const Tag = `${level ?? "h2"}`;
  return (
    <>
      <Tag className={classes}>{title}</Tag>
    </>
  );
}
