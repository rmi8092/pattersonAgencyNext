import React, { useEffect, useState } from "react";
import useTranslation from "../hooks/useTranslation";
import fetch from "isomorphic-unfetch";

function Services(props) {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/service?_embed=true${
        props.locale === "es" ? "" : "&lang=" + props.locale
      }`
    )
      .then(res => res.json())
      .then(result => {
        setServices(result);
      });
  }, [props.locale]);

  return (
    <section>
      <aside>
        <h2>{t("servicesTitle")}</h2>
      </aside>
      <main>
        {services.map(({ id, _embedded, title, link, excerpt }) => (
          <div className="service" key={id}>
            <figure className="service-img">
              <img
                src={_embedded["wp:featuredmedia"][0]["source_url"]}
                alt={title.rendered}
              />
            </figure>
            <a href={link} className="service-title">
              {title.rendered}
            </a>
            <div
              className="service-excerpt"
              dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
            ></div>
          </div>
        ))}
      </main>
      <style jsx>{`
        section {
          display: flex;
          flex-flow: row wrap;
          padding: 24px;
        }

        aside {
          width: calc(33% - 1rem);
          margin-right: 1rem;
          border-bottom: 1px solid #bbc9d6;
        }

        main {
          display: flex;
          flex-wrap: wrap;
          width: calc(67% - 1rem);
          justify-content: space-between;
          margin-left: 1rem;
          border-bottom: 1px solid #bbc9d6;
          padding-bottom: 2.5rem;
        }

        .service {
          padding: 5px;
          width: calc(100% - 10px);
          margin-top: 10px;
        }

        .service-img {
          margin: inherit;
          width: 100%;
        }

        .service-img img {
          width: 100%;
        }

        .service-title,
        .service-excerpt {
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: 2rem;
        }

        .service-title {
          color: #da291c;
          text-decoration: none;
        }

        @media (min-width: 900px) {
          .service {
            width: calc(50% - 10px);
          }
        }
      `}</style>
    </section>
  );
}

export default Services;
