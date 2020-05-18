import React from "react"
/*
export const Repositories = () => {
  const repos: PinnedReposQuery = useStaticQuery(graphql`
    query PinnedRepos {
      github {
        viewer {
          pinnedItems(first: 10) {
            nodes {
              ... on GitHub_Repository {
                nameWithOwner
                description
                url
                languages(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  return (
    <section>
      {repos.github!.viewer.pinnedItems.nodes!.filter(notEmpty).map((repo) => (
        <div key={repo.nameWithOwner}>
          <div>{repo.nameWithOwner}</div>
          <div>{repo.description}</div>
        </div>
      ))}
    </section>
  )
}
*/
