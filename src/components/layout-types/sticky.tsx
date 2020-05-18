import styled, {css} from "styled-components"
import {onMobile} from "../shared/media"

const FooterHeight = "40px";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
`;


export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  // background: linear-gradient(180deg, inherit 85%, rgba(0,0,0,0) 100%);
  display: block;
  contain: layout;

  h2 {
    padding: 0.5rem;
    margin: 0;
    text-align: center;
  }

    
  @media only screen and (max-width: 850px) {
    // height: 400px;
  }


  z-index: 1;
`;

export const MiddleWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 94px);
    
  ${onMobile`
    flex-direction: column;
  `}
`;

interface SidebarWrapperProps {
  hiddenOnMobile: boolean;
}

export const SidebarWrapper = styled.div<SidebarWrapperProps>`
  :empty {
    display: none;
  }

  > div {
    position: sticky;
    top: 68px;
    padding: 1rem;
    overflow-x: hidden;
    max-height: calc(100vh - 80px);
  }

  min-width: 260px;
  max-width: 260px;
  
  
  ${props => props.hiddenOnMobile
    ? 
  css`
    @media only screen and (max-width: 850px) {
      display: none;
    }
  `
    : ''}
`;

interface ContentWrapperProps {
  center?: boolean;
}

export const ContentWrapper = styled.div<ContentWrapperProps>`
  flex: 1;
  margin: 1rem;
  max-width: calc(100vw - 2rem);
  
  ${props => props.center ? `
    display: flex;
    align-self: center;
    justive-self: center;
  ` : ''}
  
  ${onMobile`
    flex: 0;
  `}
`;

export const FooterWrapper = styled.div`
  max-height: ${FooterHeight};
`;
