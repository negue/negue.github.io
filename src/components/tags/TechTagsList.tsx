import TechTag from "./TechTag"
import React from "react"
import {graphql, useStaticQuery} from "gatsby"
import {SiteSiteMetadataLabels, TagListQuery} from "../../graphql"
import styled from "styled-components"

const query = graphql`
  query TagList {
    site {
      siteMetadata {
        labels {
          tag
          tech
          svg
          size
          color
          hoverTextColor
        }
      }
    }
  }
`

interface TechTagsListProps {
  tags: string[];
  labelCount?: {[key: string]: number} 
}

const ListHolder = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin-right: 8px;
    margin-top: 8px;
  }
`;

export const TechTagsList = (props: TechTagsListProps) => {
  const labels = useStaticQuery<TagListQuery>(query).site.siteMetadata.labels;
  const tags = props.tags || [];

  const labelsMap: { [key: string]: SiteSiteMetadataLabels } = {};

  for (const label of labels) {
    labelsMap[label.tag] = label;
  }

  return (
    <ListHolder>
      {
        tags
          .map(t => labelsMap[t] || {
            tag: t,
            tech: t,
          })
          .filter(t => !!t)
          .map((label) =>
            <TechTag key={label.tag} 
              tag={label.tag}
              tech={label.tech}
              svg={label.svg}
              size={label.size} 
              color={label.color}
              hoverTextColor={label.hoverTextColor}
              count={props.labelCount && props.labelCount[label.tag]} />
          )
      }
    </ListHolder>
  )
}
