import React from "react"

import negue from "../../images/negue.png"
import {SiteSiteMetadataContacts} from "../../graphql"
import styled from "styled-components"

const BioHolder = styled.div`
  display: flex;
  flex-direction: column;
  // width: 170px;
  margin: 0 auto;

  // padding: 1rem;
  // margin: 1rem;
  margin-left: 0;

  .author-bio {
    // margin-left: 1rem;
    margin-bottom: 0;
  }
  .custom-switch {
    margin-left: 1rem;
    display: inline-block;
  }
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  
  align-self: center;
`;

const BioMain = styled.div`
  margin: 0.5rem;
  margin-right: 1rem;
`;

const BioContacts = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  margin-left: 0.4rem;
`;

interface BioProps {
  author: string;
  contacts: SiteSiteMetadataContacts;
}

export const Bio = ({ author, contacts }: BioProps) => {
  return (
    <BioHolder>
      <FirstRow>
        <BioMain>
          <img
            src={negue}
            style={{ maxWidth: `100px` }}
            className="profile-img"
            alt=""
          />
        </BioMain>
      </FirstRow>
    </BioHolder>
  );
};
