import React from "react";
import withLocale from "../../hocs/withLocale";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import Projects from "../../components/Projects";
import Clients from "../../components/Clients";
import useTranslation from "./../../hooks/useTranslation";
import { LocaleContext } from "./../../context/LocaleContext";

const IndexPage = ({ errorCode, seo }) => {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  if (errorCode) {
    return (
      <Layout titleKey={t("errorMessage")} metaKey={t("errorMessage")}>
        <section className="error-wrapper">
          <h4 className="error-message">
            {errorCode && (
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
    <Layout titleKey={seo.title.raw} metaKey={seo["meta-description"].raw}>
      <Hero locale={locale} />
      <Services locale={locale} />
      <Projects locale={locale} />
      <Clients locale={locale} />
    </Layout>
  );
};

IndexPage.getInitialProps = async ({ query }) => {
  const homeUrls = {
    es: "10",
    en: "35"
  };
  const response = await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/pages/${
      homeUrls[query.lang]
    }`
  );
  const seoObject = await response.json();
  const errorCode = response.status > 200 ? response.status : false;
  const seo = errorCode ? null : seoObject["toolset-meta"].seo;
  return { errorCode, seo };
};

export default withLocale(IndexPage);
