import React from "react"
import PropTypes from "prop-types"
import {graphql} from "gatsby"
import "../pages/index.css"

import {Layout} from "../components/Layout"
import {SEO} from "../components/seo"
import {Sidebar} from "../components/sidebar/Sidebar"

import {PostPreview} from "../components/posts/PostPreview"

const Tag = ({ pageContext, data }) => {
  const posts = data.allMarkdownRemark.edges
  const labels = data.site.siteMetadata.labels

  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`


  const postsEl = posts.map((post) => (
    <PostPreview post={post.node} key={post.node.id}/>
  ));

  return (
    <Layout
      leftSidebar={
        <Sidebar />
      }
      title={
        tagHeader
      }
    >
      <SEO title={tagHeader} keywords={[tag]} />
      {postsEl}
    </Layout>
  )
}

Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export const pageQuery = graphql`
  query($tag: String) {
    site {
        siteMetadata {
            title 
            author
            labels {
                tag
                tech 
                svg 
                size 
                color
            } 
        }
    } 
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
         node {
            excerpt(pruneLength: 200)
            html
            id
            frontmatter {
                title
                date(formatString: "MMMM, YYYY")
                tags
            }
             fields {
                slug
            }
        }
      }
    }
  }
`

export default Tag
