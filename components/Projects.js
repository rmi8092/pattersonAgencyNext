import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";

const CarouselWrapper = styled.div`
  .carousel .slide {
    background: transparent;
  }
  .carousel .control-dots {
    position: relative;
    padding-left: 0;
  }
  .carousel .control-dots .dot {
    width: 10px;
    box-shadow: none;
    border: 3px solid #da291c;
    height: 10px;
  }
  .carousel .control-dots .dot.selected {
    background: #da291c;
  }
  .carousel .control-arrow:before {
    border-left-color: #da291c;
    border-right-color: #da291c;
  }
  .projects-item p {
    padding: 0 24px;
  }
`;

function Projects(props) {
  const [projectsTitle, setProjectsTitle] = useState("");
  const [projectsSubtitle, setProjectsSubtitle] = useState("");
  const [projectsText, setProjectsText] = useState("");

  useEffect(() => {
    const projectsUrls = {
      es: "23",
      en: "40"
    };
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/pages/${
        projectsUrls[props.locale]
      }`
    )
      .then(res => res.json())
      .then(result => {
        setProjectsTitle(result.title.rendered);
        setProjectsSubtitle(
          result["toolset-meta"]["project-page-fields"]["projects-subtitle"].raw
        );
        setProjectsText(
          result["toolset-meta"]["project-page-fields"]["projects-text"].raw
        );
      });
  }, [props.locale]);

  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    const langParam = props.locale === "en" ? "&lang=en" : "";
    fetch(
      `https://demos.todopatterson.com/pat-api/wp-json/wp/v2/project?_embed${langParam}`
    )
      .then(res => res.json())
      .then(result => {
        setProjectsList(result);
      });
  }, [props.locale]);

  return (
    <section>
      <aside>
        <h2 className="projects-title">{projectsTitle}</h2>
        <p className="projects-subtitle">{projectsSubtitle}</p>
      </aside>
      <main>
        <p className="projects-text">{projectsText}</p>
        <CarouselWrapper>
          <Carousel showThumbs={false} showStatus={false}>
            {projectsList.map(project => (
              <div key={project.id}>
                <div
                  className="projects-item"
                  dangerouslySetInnerHTML={{ __html: project.content.rendered }}
                ></div>
                <div className="projects-text">
                  {
                    project["toolset-meta"]["project-testimonial-fields"][
                      "project-authors-name"
                    ].raw
                  }
                </div>
                <div className="projects-subtitle">
                  {
                    project["toolset-meta"]["project-testimonial-fields"][
                      "project-authors-role"
                    ].raw
                  }
                </div>
              </div>
            ))}
          </Carousel>
        </CarouselWrapper>
      </main>
      <style jsx>{`
        section {
          display: flex;
          padding: 24px;
        }

        aside {
          flex: 1;
          margin-right: 1rem;
          border-bottom: 1px solid #bbc9d6;
        }

        main {
          flex: 2;
          justify-content: space-between;
          margin-left: 1rem;
          border-bottom: 1px solid #bbc9d6;
          padding-bottom: 2.5rem;
        }

        .projects-subtitle {
          font-size: 1.125rem;
          font-size: 18px;
          line-height: 20.7px;
          font-weight: 500;
          color: #da291c;
        }

        .projects-text {
          font-size: 1.125rem;
          font-size: 18px;
          line-height: 27px;
          font-weight: 500;
        }

        .projects-item {
          font-style: italic;
        }
      `}</style>
    </section>
  );
}

export default Projects;
