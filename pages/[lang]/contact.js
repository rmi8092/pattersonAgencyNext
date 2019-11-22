import Layout from "../../components/Layout";
import ContactForm from "../../components/ContactForm";
import withLocale from "../../hocs/withLocale";
import getSeoKey from "../../hocs/common";
import useTranslation from "./../../hooks/useTranslation";
import fetch from "isomorphic-fetch";

const Contact = ({ errorCode, seo }) => {
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
      <ContactForm />
    </Layout>
  );
};

Contact.getInitialProps = async ({ query }) => {
  const contactUrls = {
    es: "85",
    en: "87"
  };
  const response = await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/pages/${
      contactUrls[query.lang]
    }`
  );
  const seoObject = await response.json();
  const errorCode = response.status > 200 ? response.status : false;
  const seo = errorCode ? null : seoObject;
  return { errorCode, seo };
};

export default withLocale(Contact);
