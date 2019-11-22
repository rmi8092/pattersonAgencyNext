import React from "react";
import Layout from "../../../components/Layout";
import fetch from "isomorphic-fetch";
import getSeoKey from "./../../../hocs/common";
import useTranslation from "./../../../hooks/useTranslation";

const Post = ({ errorCode, post }) => {
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
        post["toolset-meta"].seo.title.raw,
        post.title.rendered
      )}
      metaKey={getSeoKey(
        post["toolset-meta"].seo["meta-description"].raw,
        "Hola, somos Patterson. El copiloto de tu marca. La agencia que gestiona, coordina y diseña tus viajes y eventos de empresa"
      )}
    >
      <section>
        <aside></aside>
        <main>
          <h1 className="post-title">{post.title.rendered}</h1>
          <figure className="post-img">
            <img
              src={post._embedded["wp:featuredmedia"][0]["source_url"]}
              alt={post.title.rendered}
            />
          </figure>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></div>
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
        .post-title {
          font-size: 1.125rem;
        }
        .post-img {
          margin: 0;
        }
        .post-content {
          font-size: 1.125rem;
        }
        @media (min-width: 576px) {
          .post-title {
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
          .post-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </Layout>
  );
};

Post.getInitialProps = async ({ query }) => {
  const response = await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/posts?slug=${
      query.slug
    }&_embed${query.lang === "es" ? "" : "&lang=" + query.lang}`
  );
  const postArray = await response.json();
  const errorCode = response.status > 200 ? response.status : false;
  const post = errorCode ? null : postArray[0];
  return { errorCode, post };
};

export default Post;
