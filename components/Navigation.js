import React from "react";
import Link from "next/link";
import useTranslation from "../hooks/useTranslation";

function Navigation(props) {
  const { locale, t } = useTranslation();

  function getLinkHref(item) {
    if (!item) return "";
    item = item.url.split("/");
    return `/${props.locale}/${item[item.length - 2]}`;
  }

  return (
    <nav>
      <ul>
        {props.navItems.map(item => (
          <Link href={getLinkHref(item)} key={item.ID}>
            <a>{item.title}</a>
          </Link>
        ))}
      </ul>
      <style jsx>{`
        nav {
          width: calc(100% - 280px);
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: flex-start;
        }
        nav > ul {
          padding: 0px 16px;
          margin: 0;
        }
        li {
          display: flex;
        }
        a {
          color: #7f7f7f;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 24px 8px;
        }
        a:hover {
          color: black;
        }
        button {
          margin-left: 1em;
        }
        @media (min-width: 900px) {
          a {
            padding: 24px;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navigation;
