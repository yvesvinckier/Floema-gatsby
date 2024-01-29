import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import HomeThree from "../three/home/Home";
import Titles from "../components/Home/Titles";
import Button from "../components/general/Button";

const IndexPage = ({ data }) => {
  const element = useRef();
  const collections = data.allPrismicCollection.edges;
  const home = data.prismicHome;

  const isBrowser = typeof window !== "undefined";

  useGSAP(() => {
    if (!element.current) return;
    element.current.classList.add("home--active");
    gsap.set(document.documentElement, {
      backgroundColor: element.current.getAttribute("data-background"),
      color: element.current.getAttribute("data-color"),
    });
  }, []);

  return (
    <>
      <div
        ref={element}
        className="home"
        id="page"
        data-background="#C97164"
        data-color="#F9F1E7"
      >
        <div className="home__wrapper">
          <Titles collections={collections} />
          <div className="home__gallery">
            {[...home.data.gallery, ...home.data.gallery].map(
              (media, index) => (
                <figure
                  key={index}
                  className={`home__gallery__media home__gallery__media--${
                    (index % 5) + 1
                  }`}
                >
                  <img
                    src={media.image.url}
                    data-src={media.image.url}
                    alt={media.image.alt}
                    className="home__gallery__media__image"
                  />
                </figure>
              )
            )}
          </div>
          {/* <Link to={linkResolver(home.data.collections)} className="home__link"> */}
          <Link to={home.data.collections.slug} className="home__link">
            <Button className="home__link__button" data-animation="button">
              <span>{home.data.button}</span>
              <svg
                className="home__link__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 288 60"
              >
                <path
                  stroke="#fff"
                  opacity="0.4"
                  fill="none"
                  d="M144,0.5c79.25,0,143.5,13.21,143.5,29.5S223.25,59.5,144,59.5S0.5,46.29,0.5,30S64.75,0.5,144,0.5z"
                ></path>
                <path
                  stroke="#fff"
                  fill="none"
                  d="M144,0.5c79.25,0,143.5,13.21,143.5,29.5S223.25,59.5,144,59.5S0.5,46.29,0.5,30S64.75,0.5,144,0.5z"
                ></path>
              </svg>
            </Button>
          </Link>
        </div>
      </div>
      <div className="canvas__wrapper">
        {isBrowser && (
          <Canvas>
            <HomeThree />
          </Canvas>
        )}
      </div>
    </>
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
    prismicHome {
      data {
        gallery {
          image {
            gatsbyImageData
            url
            alt
          }
        }
        button
        collections {
          slug
        }
      }
    }
  }
`;

export default IndexPage;
