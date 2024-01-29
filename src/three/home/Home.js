import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Media from "./Media";

const HomeThree = () => {
  const data = useStaticQuery(graphql`
    query {
      prismicHome {
        data {
          gallery {
            image {
              gatsbyImageData(width: 3228, placeholder: NONE)
              alt
            }
          }
        }
      }
    }
  `);

  const home = data.prismicHome;

  return (
    <>
      {home.data.gallery.map((media, index) => (
        <Media key={index} element={media.image.gatsbyImageData} />
      ))}
    </>
  );
};

export default HomeThree;
