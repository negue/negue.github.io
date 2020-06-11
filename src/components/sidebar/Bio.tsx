import React from "react"

import negue from "../../images/negue.png"
import styled from "styled-components"

const BioHolder = styled.div`
  display: flex;
  flex-direction: column;
  // width: 170px;
  // padding: 1rem;
  // margin: 1rem;
  margin: 0 auto 0 0;

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
  margin: 0.5rem 1rem 0.5rem 0.5rem;
`;

export const Bio = () => {
  return (
    <BioHolder>
      <FirstRow>
        <BioMain>
          <img
            src={negue}
            style={{ maxWidth: `150px` }}
            className="profile-img"
            alt=""
          />
        </BioMain>
      </FirstRow>
    </BioHolder>
  );
};
