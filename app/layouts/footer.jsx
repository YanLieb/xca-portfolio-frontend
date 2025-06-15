import SiteLogo from "@/app/layouts/_partials/siteLogo";
import MainMenu from "@/app/layouts/_partials/mainMenu";
import getStrapiContent from "@/strapi";

export default async function Footer() {
  const request = "footer?populate=logo&populate=menu.menuItem.page";
  const footer = await getStrapiContent(request);

  if (!footer) return null;

  return (
    <footer className="footer container relative mx-auto p-4 flex flex-col justify-between gap-2 align-center text-center sm:flex-row sm:gap-0">
      <div className="footer__copyright order-3 text-sm sm:order-1">
        © {footer.copyright ? footer.copyright : ""} - {new Date().getFullYear()}
      </div>
      <div className="footer__logo mx-auto order-1 sm:order-2 sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2 sm:py-4">
        {footer.logo && (
          <SiteLogo logo={footer.logo} classes={"block w-10 h-auto"} />
        )}
      </div>
      <div className="footer__menu order-2 text-sm sm:order-3">
        {footer.menu && footer.menu.menuItem.length > 0 && (
          <MainMenu
            menu={footer.menu.menuItem}
            classes={"flex gap-2 justify-center"}
            entryClasses={
              "after:content-['-'] last:after:content-[''] after:ml-2"
            }
          />
        )}
      </div>
    </footer>
  );
}
