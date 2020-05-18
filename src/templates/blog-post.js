import React from "react"
import {graphql} from "gatsby"
import {Layout} from "../components/Layout"
import {SEO} from "../components/seo"
import styled from "styled-components"
import "./blog-post.css"
import "./code-block.styles.scss" // Code block styling
import {TechTagsList} from "../components/tags/TechTagsList"
import CustomShareBlock from "../components/shared/CustomShareBlock"

const RightSidebarBlock = styled.div`

`;

const BlogContentBlock = styled.div`
  a {
    &:hover {
      text-decoration: underline dashed;
    }
  }

  a::before {
    text-decoration: underline dashed;
    content: '🔗 ';
  }

  h1,h2,h3,h4,h5,h6 {
    a {
      &:hover {  
        text-decoration: none;
      }
    }
    
    a::before {
      text-decoration: none;
      content: '';
    }
  }
  
  ul {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
`;

const BlogPost = (props) => {
  const post = props.data.markdownRemark;
  const labels = props.data.site.siteMetadata.labels;
  const siteName = props.data.site.siteMetadata.title;
  const siteUrl = props.data.site.siteMetadata.url;
  const url = `${siteUrl}${props.pageContext.slug}`;
  const tags = post.frontmatter.tags;

  const rightSidebar = (
    <RightSidebarBlock className="px-4 py-2">
      <CustomShareBlock
        title={post.frontmatter.title}
        siteName={siteName}
        url={url}
      />

      <small>
        <i>Published on </i> {post.frontmatter.date}
      </small>

      <br />
      <small>Tags</small>
      <TechTagsList tags={tags} />
    </RightSidebarBlock>
  );

  return (
    <Layout
      rightSidebar={rightSidebar}
      title={post.frontmatter.title}
      showScrollTop={true}
      showProgress={true}
    >
      <div className="post-main">
        <SEO title={post.frontmatter.title} />
        <BlogContentBlock>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </BlogContentBlock>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        url
        title
        labels {
          tag
          tech
          svg
          size
          color
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`;

export default BlogPost;
