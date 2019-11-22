import React, { useEffect, useState } from "react";
import withLocale from "../../hocs/withLocale";
import getSeoKey from "../../hocs/common";
import useTranslation from "./../../hooks/useTranslation";
import Layout from "../../components/Layout";
import CaseStudiesList from "../../components/CaseStudiesList";
import { LocaleContext } from "./../../context/LocaleContext";
import fetch from "isomorphic-fetch";

const CaseStudies = ({ errorCode, seo }) => {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  const [casesList, setCasesList] = useState([]);
  const [casesContentError, setCasesContentError] = useState("");
  const [casesStatusError, setCasesStatusError] = useState("");

  useEffect(() => {
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/case?_embed${
        locale === "es" ? "" : "&lang=" + locale
      }`
    )
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.status > 200) {
          setCasesContentError(t("errorMessage"));
          setCasesStatusError(result.data.status);
        } else {
          setCasesList(result);
        }
      });
  }, [locale, casesContentError, casesStatusError]);

  if (casesContentError || errorCode) {
    return (
      <Layout titleKey={t("errorMessage")} metaKey={t("errorMessage")}>
        <section className="error-wrapper">
          <h4 className="error-message">
            {casesStatusError ? (
              <span>
                Error: {casesStatusError} | {casesContentError}
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
          <h1>{t("caseStudies")}</h1>
        </aside>
        <main>
          <CaseStudiesList casesList={casesList} />
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

CaseStudies.getInitialProps = async ({ query }) => {
  const caseStudyPageUrls = {
    es: "112",
    en: "114"
  };
  const response = await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/pages/${
      caseStudyPageUrls[query.lang]
    }`
  );
  const seoObject = await response.json();
  const errorCode = response.status > 200 ? response.status : false;
  const seo = errorCode ? null : seoObject;
  return { errorCode, seo };
};

export default withLocale(CaseStudies);
