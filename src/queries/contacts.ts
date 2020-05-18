import {graphql, useStaticQuery} from 'gatsby';

export const contacts = () => useStaticQuery(graphql`
  query ContactsQuery {
    site {
      siteMetadata {
        contacts {
          linkedin
          github
          stackoverflow
          freecodecamp
          twitter
          dev
        }
      }
    }
  }
`).site.siteMetadata.contacts;
