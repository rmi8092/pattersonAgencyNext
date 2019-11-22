import React from "react";
import Layout from "../../../components/Layout";
import getSeoKey from "./../../../hocs/common";
import useTranslation from "./../../../hooks/useTranslation";
import fetch from "isomorphic-unfetch";

const Case = ({ errorCode, cases }) => {
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
        cases["toolset-meta"].seo.title.raw,
        cases.title.rendered
      )}
      metaKey={getSeoKey(
        cases["toolset-meta"].seo["meta-description"].raw,
        "Hola, somos Patterson. El copiloto de tu marca. La agencia que gestiona, coordina y diseña tus viajes y eventos de empresa"
      )}
    >
      <section>
        <aside>
          <h1 className="case-study-title">{cases.title.rendered}</h1>
        </aside>
        <main>
          {cases.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: cases.content.rendered
              }}
            ></div>
          )}
          <figure className="case-study-img">
            <img
              src={cases._embedded["wp:featuredmedia"][0]["source_url"]}
              alt={cases.title.rendered}
            />
          </figure>
          {cases["toolset-meta"] &&
            cases["toolset-meta"]["case-study-fields"].text.raw && (
              <div
                className="case-study-content"
                dangerouslySetInnerHTML={{
                  __html: cases["toolset-meta"]["case-study-fields"].text.raw
                }}
              ></div>
            )}
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
        .case-study-title {
          font-size: 1.125rem;
        }
        .case-study-img {
          margin: 0;
        }
        .case-study-content {
          font-size: 1.125rem;
        }
        @media (min-width: 576px) {
          .case-study-title {
            font-size: 2.5rem;
          }
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
          .case-study-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </Layout>
  );
};

Case.getInitialProps = async ({ query }) => {
  const response = await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/case?slug=${
      query.slug
    }&_embed${query.lang === "es" ? "" : "&lang=" + query.lang}`
  );
  const caseArray = await response.json();
  const errorCode = response.status > 200 ? response.status : false;
  const cases = errorCode ? null : caseArray[0];
  return { errorCode, cases };
};

export default Case;
