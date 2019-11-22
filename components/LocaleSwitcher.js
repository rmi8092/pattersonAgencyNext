import React from "react";
import { useRouter } from "next/router";
import { locales, languageNames } from "../translations/config";
import { LocaleContext } from "../context/LocaleContext";
import { isRegExp } from "util";

const LocaleSwitcher = () => {
  const router = useRouter();
  const { locale } = React.useContext(LocaleContext);

  const handleLocaleChange = React.useCallback(
    e => {
      if (router.route.split("/").includes("post")) {
        router.push(`/${e.currentTarget.value}/blog`);
      } else if (router.route.split("/").includes("case")) {
        router.push(`/${e.currentTarget.value}/cases`);
      } else {
        const regex = new RegExp(`^/(${locales.join("|")})`);
        router.push(
          router.pathname,
          router.asPath.replace(regex, `/${e.target.value}`)
        );
      }
    },
    [router]
  );

  return (
    <div className="switcher-wrapper">
      <select value={locale} onChange={handleLocaleChange}>
        {locales.map(locale => (
          <option key={locale} value={locale}>
            {languageNames[locale].toUpperCase()}
          </option>
        ))}
      </select>
      <style jsx>{`
        .switcher-wrapper {
          width: 80px;
          display: flex;
          justify-content: center;
        }
        select {
          background: none;
          border: none;
          outline: none;
          color: #7f7f7f;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
        }
        select option {
          background: white;
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

export default LocaleSwitcher;
