import {MarkdownRemark} from "../../graphql"
import {getPostUrl} from "../../utils/url-utils"
import {Link} from "gatsby"
import React from "react"
import {TechTagsList} from "../tags/TechTagsList"
import styled from "styled-components"

export interface PostPreviewProps {
  post: MarkdownRemark;
}

const OuterPostPreview = styled.div`
  margin-bottom: 1rem;

  .tech-tags {
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
  }

  h2 {
    margin-bottom: 0.5rem;
  }
`;

const PostExcerp = styled.div`
  display: inline;
`;

const TextInfo = styled.div`
  display: block;
`;

export function PostPreview({ post }: PostPreviewProps) {
  const tags = post.frontmatter.tags;
  const toLink = getPostUrl(post.fields.slug);

  return (
    <OuterPostPreview key={post.id} className="container mt-5">
      <Link to={toLink} className="text-dark">
        <h2 className="title">{post.frontmatter.title}</h2>
      </Link>
      <TextInfo>
        <small className="d-block text-info">
          <i>Posted on {post.frontmatter.date}</i>
        </small>
      </TextInfo>
      <PostExcerp>{post.excerpt}</PostExcerp>
      <Link to={toLink} className="text-primary">
        <small className="d-inline-block ml-3"> Read full post</small>
      </Link>

      <div className="tech-tags">
        <TechTagsList tags={tags} />
      </div>
    </OuterPostPreview>
  );
}
