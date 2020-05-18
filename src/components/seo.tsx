/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import {graphql, useStaticQuery} from "gatsby"
import {SiteMetaQuery} from "../graphql"

type MetaProps = JSX.IntrinsicElements["meta"]

interface SEOProps {
  description?: string
  lang?: string
  meta?: MetaProps[]
  title: string;
  keywords?: string[];
}

const query = graphql`
      query SiteMeta {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `;

export function SEO({ description, lang = `en`, meta = [], title, keywords = [] }: SEOProps) {
  const { site }: SiteMetaQuery = useStaticQuery(
   query
  )

  const siteMetadata = site!.siteMetadata!
  const metaDescription = description || siteMetadata.description!

  const constantMeta: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteMetadata.author!,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `keywords`,
      content: keywords.join(',')
    }
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={constantMeta.concat(meta)}

    />
  )
}
