import './textComponent.css'

export default function TextComponent({text, classes}) {
	
	const renderChild = (child, index) => {
		if (child.type === "text") {
			let element = child.text;
			
			if (child.code) {
				element = <code key={`code-${index}`}>{element}</code>;
			}
			if (child.strikethrough) {
				element = <s key={`s-${index}`}>{element}</s>;
			}
			if (child.underline) {
				element = <u key={`u-${index}`}>{element}</u>;
			}
			if (child.italic) {
				element = <i key={`i-${index}`}>{element}</i>;
			}
			if (child.bold) {
				element = <strong key={`strong-${index}`}>{element}</strong>;
			}
			return element;
		} else if (child.type === "link") {
			return (
				 <a key={`link-${index}`} href={child.url}>
					 {child.children.map((c, i) => renderChild(c, i))}
				 </a>
			);
		}
		return null;
	};
	
	const renderChildren = (children) =>
		 children.map((child, index) => renderChild(child, index));
	
	const renderElement = (element, index) => {
		switch (element.type) {
			case "heading": {
				const Tag = `h${element.level}`;
				return (
					 <Tag key={`heading-${index}`}>{renderChildren(element.children)}</Tag>
				);
			}
			case "paragraph":
				return (
					 <p key={`paragraph-${index}`}>{renderChildren(element.children)}</p>
				);
				case "list":
        return (
           <ul key={`list-${index}`} className={element.format === "ordered" ? "list-decimal" : "list-disc"}>
             {element.children.map((item, i) => (
               <li key={`list-item-${i}`}>{renderChildren(item.children)}</li>
             ))}
           </ul>
        );
			default:
				return null;
		}
	};
	
	return <div className={classes}>{text.map((el, index) => renderElement(el, index))}</div>
}