const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")
const urlUtils = require('./src/utils/url-utils');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      const url = urlUtils.getPostUrl(node.fields.slug);

      createPage({
        path: url,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: path.resolve("src/templates/tag.js"),
        context: {
          tag,
        },
      })
    });


    const postsPerPage = 3
    const numPages = Math.ceil(posts.length / postsPerPage)


    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: urlUtils.getPageUrl(i+1),
        component: path.resolve("./src/templates/post-list.tsx"),
        context: {
          limit: postsPerPage,
          skip: i*postsPerPage,
          numPages,
          currentPage: i+1
        }
      })
    })
  })
}


/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader",
        }
      ],
    },
  })
}
