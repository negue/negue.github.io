'use strict'

/* eslint-disable @typescript-eslint/camelcase */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


const siteConfig = require("./config")

const devToRssQuery = `
{
  allMarkdownRemark(
    sort: {
      order: DESC, fields: [frontmatter___date]
    }, 
    filter: {
      frontmatter: {
        devTo: {eq: true}, 
        published: {eq: true}
      }
    }
  ) {
    edges {
      node {
        excerpt
        rawMarkdownBody
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
}
`;

module.exports = {
  siteMetadata: {
    url: siteConfig.url,
    title: siteConfig.title,
    tagline: siteConfig.tagline,
    description: `A blog about various tech-topics.`,
    author: siteConfig.author.name,
    contacts: {
      linkedin: siteConfig.author.contacts.linkedin,
      github: siteConfig.author.contacts.github,
      stackoverflow: siteConfig.author.contacts.stackoverflow,
      freecodecamp: siteConfig.author.contacts.freecodecamp,
      twitter: siteConfig.author.contacts.twitter,
      dev: siteConfig.author.contacts.dev,
    },
    labels: siteConfig.labels,
  },

  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-remark-emoji`, // Emoji list: https://emojipedia.org/joypixels/

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: `blog`,
      },
    },
    /* {
       resolve: "gatsby-source-graphql",
       options: {
         typeName: "GitHub",
         fieldName: "github",
         url: "https://api.github.com/graphql",
         headers: {
           // Learn about environment variables: https://gatsby.dev/env-vars
           Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
         },
         // Additional options to pass to node-fetch
         fetchOptions: {},
       },
     },
     */
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-heading`,
              offsetY: 100
            },
          },
          // Adding title to code blocks. Usage: ```js:title=example.js
          {
            resolve: "gatsby-remark-code-titles",
            options: {
              className: "code-title-custom",
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
            }
          },
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base fo generating different widths of each image.
              maxWidth: 200,
            },
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active : true,
              // Add a custom css class
              class  : 'emoji-icon',
              // In order to avoid pattern mismatch you can specify
              // an escape character which will be prepended to the
              // actual pattern (e.g. `#:poop:`).
              escapeCharacter : '', // (default: '')
              // Select the size (available size: 16, 24, 32, 64)
              size   : 24,
              // Add custom styles
              styles : {
                display      : 'inline',
                margin       : '0',
                'margin-top' : '1px',
                position     : 'relative',
                top          : '5px',
                width        : '25px'
              }
            }
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Raleway`,
          `source sans pro\:300,400,400i,700` // you can also specify font weights and styles
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `negue-blog`,
        short_name: `negue-blog`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/negue.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl: url
              site_url: url
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.rawMarkdownBody }],
                })
              })
            },
            query: devToRssQuery,
            output: "/devto.xml",
            title: "Negue's Blog to DevTo RSS"
          },
        ],
        match: "NEVER_JUST_FOR_DEV_TO_:)",
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        whitelist: [
          'gatsby-plugin-page-progress',
          'gatsby-highlight'
        ], // Don't remove this selector
        ignore: ['code-block.styles.scss', 'index.css', 'layout.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      }
    },
    'gatsby-plugin-page-progress',
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    }
  ],
}
