import React, { useEffect, useState } from "react";
import useTranslation from "../hooks/useTranslation";
import fetch from "isomorphic-unfetch";

function Clients(props) {
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/client?_embed&${
        props.locale === "es" ? "" : "&lang=" + props.locale
      }`
    )
      .then(res => res.json())
      .then(result => {
        setClients(result);
      });
  }, [props.locale]);

  return (
    <section>
      <aside>
        <h2 className="clientsTitle">{t("clientsTitle")}</h2>
      </aside>
      <main className="clients">
        {clients.map(({ id, _embedded, title }) => (
          <div className="client" key={id}>
            <figure className="client-img">
              <img
                src={_embedded["wp:featuredmedia"][0]["source_url"]}
                alt={title.rendered}
              />
            </figure>
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

        .client-img {
          margin: inherit;
        }

        .client-img img {
          max-height: 80px;
          filter: grayscale(100);
        }
      `}</style>
    </section>
  );
}

export default Clients;
