import {graphql} from "gatsby"
import React from "react"
import {Layout} from "../components/Layout"
import {SEO} from "../components/seo"
import {Sidebar} from "../components/sidebar/Sidebar"
import "./index.css"
import {PostPreview} from "../components/posts/PostPreview"

const ArchivePage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  const postsEl = posts.map((post) => (
    <PostPreview post={post.node}/>
  ));

  return (
    <Layout leftSidebar={<Sidebar />} title="Archive">
      <SEO
        title="Archive"
        keywords={[
          `gatsby`,
          `javascript`,
          `react`,
          `web development`,
          `blog`,
          `graphql`,
        ]}
      />

      <div className="post-list-main">
        <h2 className="heading mt-3">All Posts</h2>

        {postsEl}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ArchiveQuery {
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
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200)
          html
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default ArchivePage;
