import SiteLogo from "../_partials/siteLogo";
import MainMenu from "../_partials/mainMenu";
import SocialLinks from "../_partials/socialLinks";
import ResponsiveMenuBtn from "../_partials/responsiveMenuBtn";
import getStrapiContent from "@/strapi";

import "./header.css";

export default async function Header() {
  try {
    const request =
      "header?populate=logo&populate=menu.menuItem.page&populate=social_menu.social_link.icon";

    const header = await getStrapiContent(request);

    if (!header) throw new Error("no header content found");
    return (
      <>
        <header className="header bg-white fixed top-0 left-0 right-0 z-50">
          <div className="header__container container py-4 flex justify-between items-center">
            <div className="header__logo">
              {header.logo && <SiteLogo logo={header.logo} />}
            </div>
            <ResponsiveMenuBtn />
            <div className="header__menu fixed z-50 shadow-lg shadow-gray-300 top-0 -left-full w-2/3 h-full bg-white transition-all duration-500 ease-in-out sm:static sm:w-auto sm:h-auto sm:shadow-none">
              {header.menu && header.menu.menuItem.length > 0 && (
                <MainMenu
                  menu={header.menu.menuItem}
                  classes={
                    "flex gap-4 flex-col w-full h-full justify-center items-center p-4 mb-0 sm:flex-row sm:p-0"
                  }
                />
              )}
            </div>
            <div className="header__social-links fixed bottom-0 -left-full w-2/3 h-auto bg-white transition-all duration-500 ease-in-out sm:static sm:w-auto sm:h-auto">
              {header.social_menu &&
                header.social_menu.social_link &&
                header.social_menu.social_link.length > 0 && (
                  <SocialLinks
                    links={header.social_menu.social_link}
                    classes={
                      "flex gap-4 w-full h-full justify-center p-4 mb-0 sm:p-0"
                    }
                  />
                )}
            </div>
          </div>
        </header>
      </>
    );
  } catch (err) {
    console.error(err);
  }
}
