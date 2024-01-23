/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Floema-gatsby`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon-32x32.png",
      },
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-prismic",
      accessToken: `${process.env.API_KEY}`,
      options: {
        repositoryName: "floemy",
        schemas: {
          home: require("./custom_types/home.json"),
          navigation: require("./custom_types/navigation.json"),
          collections: require("./custom_types/collections.json"),
          collection: require("./custom_types/collection.json"),
        },
      },
    },
  ],
};
