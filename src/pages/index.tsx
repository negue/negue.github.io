import React from "react"
import {graphql as gql} from "gatsby"

import {Layout} from "../components/Layout"
import {SEO} from "../components/seo"

import {DEFAULT_SEO_KEYWORDS} from "../constants"
import UndrawDev from "../assets/undraw_developer_activity.svg"
import styled from "styled-components"


import Typist from "react-typist"
import {TechTagsOverview} from "../components/tags/TechTagsOverview"
import {onMobile} from "../components/shared/media"

const CenteredContent = styled.div`
  margin: 0 auto;
  display: flex;
    flex-direction: column;
    align-items: center;
    
    .tech-tags {
      width: 70%;
      
      ${onMobile`
        width: 95%;
      `}
    }
`;

const InlineContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${onMobile`
    flex-direction: column;
  `}

  h3 {
    vertical-align: top;
    margin: 10px;
  }

  .Typist {
    margin-top: 15px;
    min-height: 150px;
    
    ${onMobile`
      text-align: center;
    `}
  }

  > * {
    display: inline-block;
    max-width: calc(100% - 24px);
    align-self: center;
  }
`;

const IndexPage = ({ data }) => {

  return (
    <Layout title="Welcome" centerContent={true}>
      <SEO title="Welcome" keywords={DEFAULT_SEO_KEYWORDS} />

      <CenteredContent>

        <InlineContent>
          <UndrawDev style={{
            width: 400,
            height: 200
          }} />

        <Typist cursor={{
          show: false
        }}>
          <div> C# </div>
          <div> Vue </div>
          <div> Angular </div>
          <div> TypeScript </div>
          <div> And many others, <br/> more to come :) </div>
        </Typist>
        </InlineContent>

        <br />
        <br />
        <br />
        <div className="tech-tags" >

          <TechTagsOverview/>
        </div>
      </CenteredContent>
    </Layout>
  );
};

export const pageQuery = gql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      limit: 3
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

export default IndexPage;
