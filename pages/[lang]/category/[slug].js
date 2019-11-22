import React, { useEffect, useState } from "react";
import Link from "next/link";
import withLocale from "../../../hocs/withLocale";
import useTranslation from "./../../../hooks/useTranslation";
import Layout from "../../../components/Layout";
import PostsList from "../../../components/PostsList";
import { LocaleContext } from "./../../../context/LocaleContext";
import fetch from "isomorphic-fetch";

const Category = ({
  errorCategoriesCode,
  errorPostsListCode,
  categorySlug
}) => {
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
  }, [locale, categorySlug, categoriesError, categoriesStatusError]);

  const [postsList, setPostsList] = useState([]);
  const [postsListError, setPostsListError] = useState("");
  const [postsListStatusError, setPostsListStatusError] = useState("");

  useEffect(() => {
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/categories?slug=${categorySlug}${
        locale === "es" ? "" : "&lang=" + locale
      }`
    )
      .then(res => res.json())
      .then(category => {
        return fetch(
          `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/posts?categories=${
            category[0].id
          }&_embed${locale === "es" ? "" : "&lang=" + locale}`
        );
      })
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

  if (errorCategoriesCode || errorPostsListCode) {
    return (
      <Layout titleKey={t("errorMessage")} metaKey={t("errorMessage")}>
        <section className="error-wrapper">
          <h4 className="error-message">
            {errorPostsListCode ? (
              <span>
                Error: {errorPostsListCode} | {t("errorMessage")}
              </span>
            ) : (
              <span>
                Error: {errorCategoriesCode} | {t("errorMessage")}
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
    <Layout titleKey={categorySlug} metaKey={categorySlug}>
      <section>
        <aside>
          <h1>{t("blogTitle")}</h1>
          <h2>{t("categoriesTitle")}</h2>
          <div className="categories-wrapper">
            {categories.map(category => (
              <Link
                href={`${category.slug}`}
                key={category.id}
                as={`${category.slug}`}
              >
                <a className="category">
                  <span className="category-title">{category.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </aside>
        <main>
          {postsList && postsList.length > 0 ? (
            <PostsList postsList={postsList} />
          ) : (
            <div>{t("categoriesNotFoundMessage")}</div>
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

Category.getInitialProps = async ({ query }) => {
  const categorySlug = query.slug;

  const response = await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/categories?${
      query.lang === "es" ? "" : "&lang=" + query.lang
    }`
  );
  const errorCategoriesCode = response.status > 200 ? response.status : false;

  let errorPostsListCode = false;
  await fetch(
    `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/categories?slug=${categorySlug}&${
      query.lang === "es" ? "" : "&lang=" + query.lang
    }`
  )
    .then(res => res.json())
    .then(category => {
      return fetch(
        `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/posts?categories=${
          category[0].id
        }&_embed${query.lang === "es" ? "" : "&lang=" + query.lang}`
      );
    })
    .then(res => res.json())
    .then(result => {
      errorPostsListCode = result.status > 200 ? result.status : false;
    });
  return {
    errorCategoriesCode,
    errorPostsListCode,
    categorySlug
  };
};

export default withLocale(Category);
