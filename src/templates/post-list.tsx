import {graphql, Link} from "gatsby"
import React from "react"
import {Layout} from "../components/Layout"
import {SEO} from "../components/seo"
import {Sidebar} from "../components/sidebar/Sidebar"
import "../pages/index.css"
import {PostPreview} from "../components/posts/PostPreview"
import {getPageUrl} from "../utils/url-utils"
import {DEFAULT_SEO_KEYWORDS} from "../constants"
import styled from "styled-components"

const PageNavToolbar = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const PostList = (props) => {
    const posts = props.data.allMarkdownRemark.edges
    const labels = props.data.site.siteMetadata.labels
    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = getPageUrl(currentPage - 1);
    const nextPage = getPageUrl(currentPage + 1);

    const postsEl = posts.map((post) => (
      <PostPreview post={post.node} key={post.node.id}/>
    ));
 
    return (
      <Layout
      leftSidebar={
        <Sidebar />
      }
    >
            <SEO title="Home" keywords={DEFAULT_SEO_KEYWORDS} />
      
                <div className="post-list-main">
                    {postsEl}
                    <PageNavToolbar className="text-center mt-4">
                        {!isFirst && (
                            <Link to={prevPage} rel="prev" style={{ textDecoration: `none` }}>
                                <span className="text-dark">← Previous Page</span>
                            </Link>
                        )}
                        {!isLast && (
                            <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
                                <span className="text-dark ml-5">Next Page →</span>
                            </Link>
                        )}
                    </PageNavToolbar>
                </div>
         
        </Layout>
    )
}

export const listQuery = graphql`
         query paginateQuery($skip: Int!, $limit: Int!) {
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
             limit: $limit
             skip: $skip
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
       `

export default PostList
