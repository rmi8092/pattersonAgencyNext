import React from "react";
import Link from "next/link";
import { LocaleContext } from "./../context/LocaleContext";

function PostList(props) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <section>
      {props.postsList.map(({ id, slug, excerpt, title, _embedded }) => (
        <Link
          href={`/${locale}/post/${[slug]}`}
          key={id}
          as={`/${locale}/post/${[slug]}`}
        >
          <a className="post">
            {_embedded && _embedded["wp:featuredmedia"] && (
              <figure className="post-img">
                <img
                  src={_embedded["wp:featuredmedia"][0]["source_url"]}
                  alt={title.rendered}
                />
              </figure>
            )}
            {title && <span className="post-title">{title.rendered}</span>}
            {excerpt && excerpt !== "" && (
              <div
                dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
                className="post-excerpt"
              ></div>
            )}
          </a>
        </Link>
      ))}
      <style jsx>{`
        section {
          display: flex;
        }
        .post {
          padding: 5px;
          width: calc(100% - 10px);
          margin-top: 10px;
          text-decoration: none;
        }
        .post-img {
          margin: inherit;
          width: 100%;
        }
        .post-img img {
          width: 100%;
        }
        .post-excerpt {
          color: #000;
        }
        .post-title,
        .post-excerpt {
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: 2rem;
        }
        .post-title {
          color: #da291c;
          text-decoration: none;
        }
        @media (min-width: 900px) {
          .post {
            width: calc(50% - 10px);
          }
        }
      `}</style>
    </section>
  );
}

export default PostList;
