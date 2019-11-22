import React, { useEffect, useState } from "react";
import fetch from "isomorphic-fetch";

function Hero(props) {
  const [heroText, setHeroText] = useState("");

  useEffect(() => {
    const homeUrls = {
      es: "10",
      en: "35"
    };

    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/pages/${
        homeUrls[props.locale]
      }`
    )
      .then(res => res.json())
      .then(result => {
        setHeroText(result["toolset-meta"]["hero-fields"]["hero-text-1"].raw);
      });
  }, [props.locale]);

  return (
    <section>
      <aside></aside>
      <main>
        <p dangerouslySetInnerHTML={{ __html: heroText }}></p>
      </main>
      <style jsx>{`
        section {
          display: flex;
          height: 300px;
          background: #dae2e5;
          padding: 88px 48px;
        }

        aside {
          flex: 0;
        }

        main {
          flex: 3;
        }

        main p {
          font-size: 1.5rem;
        }

        @media (min-width: 900px) {
          aside {
            flex: 1;
          }

          main {
            flex: 2;
          }

          main p {
            margin-right: 164px;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;
