import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 100vw;

  overflow: hidden;
  overflow-wrap: break-word;
`;

export const HeaderWrapper = styled.div``;

export const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  overflow: hidden;
`;

export const SidebarWrapper = styled.div`
  :empty {
    display: none;
  }

  padding: 1rem;
  flex: 0 0 260px;
  overflow-y: auto;

  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;

  overflow-y: auto;

  padding: 1rem;
  padding-top: 0;
`;

export const FooterWrapper = styled.div`

`;
