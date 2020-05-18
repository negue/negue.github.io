/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {ReactNode} from "react"
import {Header} from "./header/header"

import {CodeBlockStyles, GlobalStyles, theme, UseTheme} from "../components/shared/styles-global"

import "./layout.css"
import styled, {ThemeProvider} from "styled-components"
import {ScrollTopButton} from "./shared/ScrollTopButton"
import {secondaryBackgroundColor} from "./shared/styles-global"
import {
  ContentWrapper,
  FooterWrapper,
  HeaderWrapper,
  LayoutWrapper,
  MiddleWrapper,
  SidebarWrapper,
} from "./layout-types/sticky"

interface LayoutProps {
  children: ReactNode;
  leftSidebar?: ReactNode;

  rightSidebar?: ReactNode;

  showScrollTop?: boolean;
  showProgress?: boolean;
  centerContent?: boolean;
  title?: string;
}

const Footer = styled.footer`
  background: ${secondaryBackgroundColor};

  display: flex;
  flex-direction: row;
  justify-content: center;

  p {
    margin: 0;
  }

  .d-inline {
    display: inline-block;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  i {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const Layout = ({
  children,
  leftSidebar,
  rightSidebar,
  showProgress,
  showScrollTop,
  title,
  centerContent
}: LayoutProps) => {
  const setTheme = UseTheme();

  if (typeof document !== `undefined`) {
    document.documentElement.style.setProperty('--show-progress-display', showProgress ? 'block' : 'none');
  }

  return (
    // Used to set theme
    //
    //
    //
    <ThemeProvider theme={setTheme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <CodeBlockStyles />
        <LayoutWrapper>
          <HeaderWrapper className="sub-main">
            <Header
              title={title}
              hasSidebar={rightSidebar ? true : false}
            />
          </HeaderWrapper>
          <MiddleWrapper>
            <SidebarWrapper hiddenOnMobile={true} className="sub-main">{leftSidebar}</SidebarWrapper>
            <ContentWrapper center={centerContent} >
              {children}
              {showScrollTop && (
                <ScrollTopButton
                  scrollStepInPx={150}
                  delayInMs={5}
                />
              )}
            </ContentWrapper>

            <SidebarWrapper  hiddenOnMobile={false}>{rightSidebar}</SidebarWrapper>

          </MiddleWrapper>
          <FooterWrapper>
            <Footer>
              <p className="d-inline">
                © {new Date().getFullYear()}{" "}
                <a className="text-info" href="https://negue.github.io/">
                  negue
                </a>
              </p>
              <p className="mt-5 text-muted d-inline">
                <i>
                  {" "}
                  Built with{" "}
                  <a className="text-info" href="https://www.gatsbyjs.org">
                    Gatsby
                  </a>
                </i>{" "}
              </p>
              <p className="mt-5 text-muted d-inline">
                <i>
                  <a className="text-info" href="https://github.com">
                    Edit on GitHub
                  </a>
                </i>{" "}
              </p>
            </Footer>
          </FooterWrapper>
        </LayoutWrapper>
      </ThemeProvider>
    </ThemeProvider>
  );
};
