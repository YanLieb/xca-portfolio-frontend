import ImageComponent from "./imageComponent/ImageComponent";
import TitleComponent from "./titleComponent/TitleComponent";
import TextComponent from "./textComponent/TextComponent";
import ButtonComponent from "./buttonComponent/ButtonComponent";

export default function SwitchComponent({ pageContent }) {
  {
    return pageContent.map((item, index) => {
      switch (item.__component) {
        case 'page-content.image':
          return <ImageComponent key={index} media={item} classes={`image-component ${item.classes ? item.classes : ""}`} />
        case 'page-content.display-title':
          return <TitleComponent key={index} title={item.title} level={item.level} classes={`title-component ${item.classes ? item.classes : ""}`} />
        case 'page-content.text':
          return <TextComponent key={index} text={item.text} classes={`text-component ${item.classes ? item.classes : ""}`}/>
        case 'page-content.button':
          return <ButtonComponent key={index} button={item} classes={`button-component ${item.classes ? item.classes : ""}`} />
        default:
          return null;
      }
    })
  }
}