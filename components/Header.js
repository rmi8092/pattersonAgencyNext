import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "../hooks/useTranslation";
import Navigation from "./Navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";

const Header = props => {
  const router = useRouter();
  const { locale, t } = useTranslation();

  function isHomePage() {
    let pathname = router.pathname.split("/");
    return pathname.length > 2 ? false : true;
  }

  return (
    <div className={"header-wrapper " + (isHomePage() ? "home" : "")}>
      <div className="logo-wrapper">
        <Logo locale={locale}></Logo>
      </div>
      <Navigation navItems={props.navItems} locale={locale} />
      <LocaleSwitcher />
      <style jsx>{`
        .header-wrapper {
          display: flex;
          background: #fff;
          padding: 3rem 48px 0 48px;
        }
        .header-wrapper.home {
          background: #dae2e5;
        }
        .logo-wrapper {
          width: calc(100% / 3);
          margin-right: 20px;
        }
        .logo {
          width: 175px;
        }
      `}</style>
    </div>
  );
};

export default Header;
