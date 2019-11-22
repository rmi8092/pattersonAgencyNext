import React, { useEffect, useState } from "react";
import getSeoKey from "../../hocs/common";
import withLocale from "../../hocs/withLocale";
import useTranslation from "./../../hooks/useTranslation";
import Layout from "../../components/Layout";
import { LocaleContext } from "./../../context/LocaleContext";

const About = ({ errorCode, seo }) => {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  const [aboutContent, setAboutContent] = useState(null);
  const [aboutContentError, setAboutContentError] = useState("");
  const [aboutStatusError, setAboutStatusError] = useState("");

  useEffect(() => {
    const aboutUrls = {
      es: "97",
      en: "99"
    };

    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/pages/${aboutUrls[locale]}`
    )
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.status > 200) {
          setAboutContentError(t("errorMessage"));
          setAboutStatusError(result.data.status);
        } else {
          setAboutContent(result.content.rendered);
        }
      });
  }, [locale, aboutStatusError, aboutContentError]);

  if (aboutContentError || errorCode) {
    return (
      <Layout titleKey={t("errorMessage")} metaKey={t("errorMessage")}>
        <section className="error-wrapper">
          <h4 className="error-message">
            {aboutStatusError ? (
              <span>
                Error: {aboutStatusError} | {aboutContentError}
              </span>
            ) : (
              <span>
                Error: {errorCode} | {t("errorMessage")}
              </span>
            )}
          </h4>
        </section>
        <style jsx>{`
          .error-wrapper {
            height: calc(100vh - 550px);
          }
          .error-message {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout
      titleKey={getSeoKey(
        seo["toolset-meta"].seo.title.raw,
        seo.title.rendered
      )}
      metaKey={getSeoKey(
        seo["toolset-meta"].seo["meta-description"].raw,
        "Hola, somos Patterson. El copiloto de tu marca. La agencia que gestiona, coordina y diseña tus viajes y eventos de empresa"
      )}
    >
      <section>
        <aside>
          <p>{errorCode}</p>
          <h1>{t("aboutTitle")}</h1>
        </aside>
        <main>
          <p dangerouslySetInnerHTML={{ __html: aboutContent }}></p>
        </main>
      </section>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          padding: 48px;
        }
        aside {
          flex: 1;
        }
        aside h1 {
          margin-top: 0;
          font-size: 1.125rem;
        }
        main {
          flex: 2;
          justify-content: space-between;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid #bbc9d6;
        }
        @media (min-width: 768px) {
          section {
            flex-direction: row;
          }
          aside {
            margin-right: 1rem;
            border-bottom: 1px solid #bbc9d6;
          }
          aside h1 {
            font-size: 3rem;
          }
          main {
            margin-left: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
};

About.getInitialProps = async ({ query }) => {
  const aboutUrls = {
    es: "97",
    en: "99"
  };
  const response = await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/pages/${
      aboutUrls[query.lang]
    }`
  );
  const seoObject = await response.json();
  const errorCode = response.status > 200 ? response.status : false;
  const seo = errorCode ? null : seoObject;
  return { errorCode, seo };
};

export default withLocale(About);
