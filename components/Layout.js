import React, { useEffect, useState } from "react";
import Head from "next/head";
import useTranslation from "../hooks/useTranslation";
import Header from "./Header";
import Footer from "./Footer";
import { LocaleContext } from "./../context/LocaleContext";

const Layout = ({ titleKey, metaKey, children }) => {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  const [navItems, setNavItems] = useState([]);
  const [socialMenus, setSocialMenus] = useState([]);
  const [footerMenus, setFooterMenus] = useState([]);

  useEffect(() => {
    const langParam = locale === "en" ? "?lang=en" : "";
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/custom-menu/v1/all-menu${langParam}`
    )
      .then(res => res.json())
      .then(result => {
        setNavItems(result["header-menu"]);
        setSocialMenus(result["social-menu"]);
        setFooterMenus(result["footer-menu"]);
      });
  }, [locale]);

  const [contactInfo, setContactInfo] = useState("");

  useEffect(() => {
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/custom-widget/v1/widget?widget=sidebar-1`
    )
      .then(res => res.json())
      .then(result => {
        setContactInfo(result);
      });
  }, [locale]);

  return (
    <section>
      <Head>
        <title>{titleKey}</title>
        <meta name="description" content={metaKey} key="" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Header navItems={navItems} />
      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
      `}</style>
      <>{children}</>
      <Footer
        socialMenus={socialMenus}
        footerMenus={footerMenus}
        contactInfo={contactInfo}
        locale={locale}
      />
    </section>
  );
};

export default Layout;
