import React, { useState } from "react";
import useTranslation from "../hooks/useTranslation";
import { LocaleContext } from "./../context/LocaleContext";
import axios from "axios";

const ContactForm = () => {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  let response;
  const responses = {
    ok: "Thanks :)",
    ko: "Sorry :("
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const contactUrls = {
      es: "85",
      en: "87"
    };
    const contactUrl =
      "https://demos.todopatterson.com/pat-api/wp-admin/admin-ajax.php?action=custom_contact";
    axios
      .get(contactUrl + `&name=${name}&email=${email}&message=${message}`)
      .then(response => {
        response = response.data;
      })
      .catch(err => {
        response = {
          status: err
        };
      });
  };
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2023.1268382941237!2d2.65221256416436!3d39.574130509900144!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe16b0bcf7a977a92!2sPatterson%20Agency!5e0!3m2!1ses!2ses!4v1571934624020!5m2!1ses!2ses&key=AIzaSyAZ-kce3hJyrcuv9VlYNJFzc0BQ5x15_0I"
        className="map"
        frameBorder="0"
      ></iframe>
      <section>
        <aside>
          <h1>{t("contactTitle")}</h1>
        </aside>
        <main>
          <form onSubmit={handleSubmit}>
            {response && response.status && (
              <div
                className={
                  response.status === "ok" ? "bg-green-light" : "bg-red-light"
                }
              >
                {responses[response.status]}
              </div>
            )}
            <label>
              {t("name")}
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label>
              {t("message")}
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
              ></textarea>
            </label>
            <button type="submit">{t("submit")}</button>
          </form>
        </main>
      </section>
      <style jsx>{`
        .map {
          width: 100%;
          height: 500px;
          margin-top: 2.5rem;
        }
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
        form {
          width: 640px;
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        .bg-green-light {
          color: green;
        }
        .bg-red-light {
          color: red;
        }
        form,
        label,
        input {
          display: block;
        }
        label {
          margin-bottom: 24px;
          font-weight: 500;
        }
        label input,
        label textarea {
          width: 100%;
          margin-top: 8px;
          padding: 4px;
        }
        input,
        textarea {
          border: 1px solid #dae1e7;
        }
        button {
          background: #fff;
          border: 1px solid #dae1e7;
          padding: 8px 16px;
          font-size: 16px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
