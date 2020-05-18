import React from "react"

import {TechTagsList} from "./TechTagsList"
import {graphql, useStaticQuery} from "gatsby"

export const TechTagsOverview = (props: any) => {
  const data = useStaticQuery(graphql`
      query TechTagsOverview {
        site {
          siteMetadata {
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
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { published: { eq: true } } }
        ) {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
  );

  const posts = data.allMarkdownRemark.edges;

  const labelCountMap: { [key: string]: number } = {};

  const labels = new Set();
  posts.forEach(post => {
    post.node.frontmatter.tags.map(t => labels.add(t));
  });

  const tags = Array.from(labels.values());

  return (
    <>
      {props.title && <h4>{props.title}</h4> }
      <div className="d-block">
        <TechTagsList tags={tags} labelCount={labelCountMap}/>
      </div>
    </>
  )
}
