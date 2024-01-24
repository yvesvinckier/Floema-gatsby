import React, { useRef } from "react";
import { graphql } from "gatsby";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Titles from "../components/Home/Titles";

const IndexPage = ({ data }) => {
  const element = useRef();
  const collections = data.allPrismicCollection.edges;

  useGSAP(() => {
    if (!element.current) return;
    element.current.classList.add("home--active");
    gsap.set(document.documentElement, {
      backgroundColor: element.current.getAttribute("data-background"),
      color: element.current.getAttribute("data-color"),
    });
  }, []);

  return (
    <div
      ref={element}
      className="home"
      id="page"
      data-background="#C97164"
      data-color="#F9F1E7"
    >
      <div className="home__wrapper">
        <Titles collections={collections} />
      </div>
    </div>
  );
};

export const query = graphql`
  query {
    allPrismicCollection(sort: { first_publication_date: DESC }) {
      edges {
        node {
          data {
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
