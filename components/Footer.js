import React from "react";
import useTranslation from "../hooks/useTranslation";
import Logo from "./Logo";
import Locations from "./Locations";

function Footer(props) {
  const { locale, t } = useTranslation();

  return (
    <div className="footer-wrapper">
      <div className="logo-socials-contact-wrapper">
        <aside>
          <Logo locale={props.locale}></Logo>
        </aside>
        <main>
          <div>
            <h4 className="footer-subtitle">{t("socials")}</h4>
            <ul>
              {props.socialMenus.map(item => (
                <li key={item.ID}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <Locations locations={props.contactInfo} />
        </main>
      </div>
      <div className="footer-links">
        <div>{t("copyright")}</div>
        <ul>
          {props.footerMenus.map(item => (
            <li key={item.ID}>
              <a href={item.url}>
                {item.title}
                <span>—</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .logo-socials-contact-wrapper {
          display: flex;
          background: #fff;
          padding: 3rem 48px 0 48px;
        }
        aside {
          width: calc(100% / 3);
          margin-right: 20px;
        }
        .logo {
          width: 175px;
        }
        main {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .footer-links {
          display: flex;
          justify-content: space-around;
          text-align: center;
          margin: 16px 8px;
          font-weight: 500;
          font-size: 15px;
          color: #000;
        }
        .footer-links ul {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row-reverse;
          margin: 0;
        }
        .footer-links a span {
          margin: 0 8px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        a {
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          color: #000;
        }
        .footer-subtitle {
          color: #7f7f7f;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

export default Footer;
