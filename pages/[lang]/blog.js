import React, { useEffect, useState } from "react";
import Link from "next/link";
import withLocale from "../../hocs/withLocale";
import getSeoKey from "../../hocs/common";
import useTranslation from "./../../hooks/useTranslation";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";
import { LocaleContext } from "./../../context/LocaleContext";

const Blog = ({ errorCode, seo }) => {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState("");
  const [categoriesStatusError, setCategoriesStatusError] = useState("");

  useEffect(() => {
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/categories?${
        locale === "es" ? "" : "&lang=" + locale
      }`
    )
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.status > 200) {
          setCategoriesError(t("errorMessage"));
          setCategoriesStatusError(result.data.status);
        } else {
          setCategories(result);
        }
      });
  }, [locale, categoriesError, categoriesStatusError]);

  const [postsList, setPostsList] = useState([]);
  const [postsListError, setPostsListError] = useState("");
  const [postsListStatusError, setPostsListStatusError] = useState("");

  useEffect(() => {
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/posts?_embed=true&${
        locale === "es" ? "" : "&lang=" + locale
      }`
    )
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.status > 200) {
          setPostsListError(t("errorMessage"));
          setPostsListStatusError(result.data.status);
        } else {
          setPostsList(result);
        }
      });
  }, [locale, postsListError, postsListStatusError]);

  function getCategoryUrl(categorySlug) {
    return `${locale === "es" ? "/es/" : "/en/"}category/${categorySlug}`;
  }

  if (postsListError || errorCode) {
    return (
      <Layout titleKey={t("errorMessage")} metaKey={t("errorMessage")}>
        <section className="error-wrapper">
          <h4 className="error-message">
            {postsListStatusError ? (
              <span>
                Error: {postsListStatusError} | {postsListError}
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
          <h1>{t("blogTitle")}</h1>
          <h2>{t("categoriesTitle")}</h2>
          <div className="categories-wrapper">
            {categories.map(category => (
              <Link
                href={getCategoryUrl(category.slug)}
                key={category.id}
                as={getCategoryUrl(category.slug)}
              >
                <a className="category">
                  <span className="category-title">{category.name} ></span>
                </a>
              </Link>
            ))}
          </div>
        </aside>
        <main>
          <PostsList postsList={postsList} />
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
        .categories-wrapper {
          display: flex;
          flex-direction: column;
        }
        .categories-wrapper a {
          text-decoration: none;
          color: #7f7f7f;
          font-size: 22px;
          padding: 6px 0;
        }
        .categories-wrapper a:hover {
          color: #000;
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

Blog.getInitialProps = async ({ query }) => {
  const blogUrls = {
    es: "92",
    en: "90"
  };
  const response = await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/pages/${
      blogUrls[query.lang]
    }`
  );
  const seoObject = await response.json();
  const errorCode = response.status > 200 ? response.status : false;
  const seo = errorCode ? null : seoObject;
  return { errorCode, seo };
};

export default withLocale(Blog);
