import React from "react";
import Link from "next/link";
import useTranslation from "./../hooks/useTranslation";
import { LocaleContext } from "./../context/LocaleContext";

function CaseStudiesList(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  return (
    <section>
      {props.casesList.map(({ id, slug, content, title, _embedded }) => (
        <Link
          href={`/${locale}/case/${[slug]}`}
          key={id}
          as={`/${locale}/case/${[slug]}`}
        >
          <a className="case-study">
            {_embedded && _embedded["wp:featuredmedia"] && (
              <figure className="case-study-img">
                <img
                  src={_embedded["wp:featuredmedia"][0]["source_url"]}
                  alt={title.rendered}
                />
              </figure>
            )}
            <span className="case-study-title">{title.rendered}</span>
            {content && content !== "" && (
              <div
                dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
                className="case-study-content"
              ></div>
            )}
          </a>
        </Link>
      ))}
      <style jsx>{`
        section {
          display: flex;
        }
        .case-study {
          padding: 5px;
          width: calc(100% - 10px);
          margin-top: 10px;
          text-decoration: none;
        }
        .case-study-img {
          margin: inherit;
          width: 100%;
        }
        .case-study-img img {
          width: 100%;
        }
        .case-study-content {
          color: #000;
        }
        .case-study-title,
        .case-study-content {
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: 2rem;
        }
        .case-study-title {
          color: #da291c;
          text-decoration: none;
        }
        @media (min-width: 900px) {
          .case-study {
            width: calc(50% - 10px);
          }
        }
      `}</style>
    </section>
  );
}

export default CaseStudiesList;
