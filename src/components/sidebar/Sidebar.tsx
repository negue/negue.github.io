import styled from "styled-components"
import React from "react"
import {graphql, Link, StaticQuery} from "gatsby"
import {Bio} from "./Bio"

import "./sidebar.css"

import {TechTagsOverview} from "../tags/TechTagsOverview"
import {setThemeVars} from "../shared/styles-global"

const PageLinks = styled.div`
  display: flex; 
  flex-direction: column;
  margin-bottom: 1rem;

  a {
    height: 2rem;
    width: 100%;
    padding: 8px;
    padding-left: 0;
    white-space: nowrap;

    :hover {
      text-decoration: underline;
      text-decoration-color: ${() => setThemeVars("black", "white")};
      // background: ${() => setThemeVars("#032f62", "#63fa83")}
    }
  }
`;

export const Sidebar = () => {
  return (
    <StaticQuery
      query={graphql`
        query SiteBioQuery {
          site {
            siteMetadata {
              title
              tagline
              author
              contacts {
                linkedin
                github
                stackoverflow
                freecodecamp
                twitter
                dev
              }
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
            limit: 10
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
      `}
      render={(data) => (
        <>
          <div className="sidebar-main border-right">
            <Bio
              author={data.site.siteMetadata.author}
              tagline={data.site.siteMetadata.tagline}
              contacts={data.site.siteMetadata.contacts}
            />

            <div className="tech-tags mt-4">
              <TechTagsOverview title="Tags-Overview"
              />
            </div>
            <br/>
            <Link to="/archive">
              <span className="text-dark d-block py-1">All posts</span>
            </Link>
          </div>
        </>
      )}
    />
  );
};
