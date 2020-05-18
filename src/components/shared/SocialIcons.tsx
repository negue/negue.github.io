import {contacts} from "../../queries/contacts"
import {FaDev, FaGithubSquare} from "react-icons/fa"
import React from "react"
import styled from "styled-components"

const SocialIcon = styled.a`
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;

export function SocialIcons() {
  const contactsObj = contacts();

  return (
    <>
      <SocialIcon className="github-icon text-secondary p-2 w-25"
        href={contactsObj.github}>
        <span title="GitHub">
          <FaGithubSquare size={26} style={{ color: "secondary" }} />

        </span>
      </SocialIcon>
      <SocialIcon className="dev-icon text-secondary p-2 w-25"
        href={contactsObj.dev}>
        <span title="Dev.to">
          <FaDev size={26} style={{ color: "secondary" }} />
        </span>
      </SocialIcon>
    </>
  );
}
