import React from "react";
import styled from "styled-components";

const LocationsWrapper = styled.div`
  .textwidget h3 {
    font-size: 15px;
    color: #7f7f7f;
    font-weight: 600;
    margin: 22px 0;
  }
  .textwidget * {
    font-weight: 500;
    font-size: 15px;
    color: #000;
  }
  .textwidget ul {
    list-style: none;
    padding: 0;
  }
  .textwidget a br {
    display: none;
  }
  .textwidget > div:last-child {
    display: flex;
    justify-content: space-around;
  }
`;

function Locations(props) {
  return (
    <LocationsWrapper>
      <div dangerouslySetInnerHTML={{ __html: props.locations }}></div>
      <style jsx>{`
        .textwidget h3 {
          font-size: 15px;
          color: #7f7f7f;
          font-weight: 600;
          margin: 22px 0;
        }
        .textwidget * {
          font-weight: 500;
          font-size: 15px;
          color: #000;
        }
        .textwidget ul {
          list-style: none;
          padding: 0;
        }
        .textwidget a br {
          display: none;
        }
        .textwidget > div:last-child {
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </LocationsWrapper>
  );
}

export default Locations;
