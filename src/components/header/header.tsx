import React, {useState} from "react"

import MobilePageLinks from "./MobilePageLinks"
import "./header.css"
import styled, {css} from "styled-components"
import {SocialIcons} from "../shared/SocialIcons"
import {ThemeSwitch} from "../shared/ThemeSwitch"
import {foregroundColor} from "../shared/styles-global"
// @ts-ignore
import negue from "../../images/negue.png"
import {SEO} from "../seo"
import {onMobile} from "../shared/media"
import {IconWrapper, SecondaryMenu} from "./mobileNav"
import {FaChevronDown, FaHome} from "react-icons/fa"
import {Link} from "gatsby"

const visibleOnMobile = css`
  display: none;
  
  ${onMobile(css`
    display: block;
  `)}
`;

const hideOfMobile = onMobile(css`
  display: none;
`);

const HeaderGrid = styled.header<any>`
  display: grid;
  grid-template: "home name toggle title social";

  grid-template-columns: 40px 180px 30px auto ${(props) =>
      props.hasSidebar ? "260" : "100"}px;
  grid-template-rows: auto;
  align-items: center;

  @media only screen and (max-width: 850px) {
    grid-template:
      "title title title home toggleMenu"
      "subMenu subMenu subMenu subMenu subMenu"
      ;

    grid-template-columns: auto auto auto 40px 40px;
    grid-template-rows: auto;
  }
`;

interface CellProps {
  header: boolean;
}

const NameCell = styled.div<CellProps>`
  grid-area: name;
  justify-self: center;
  align-self: center;

  h3 {
    margin: 0;
  }

  @media only screen and (max-width: 850px) {
    h3 {
      margin-left: 0;
    }
  }
  
  ${props => props.header ? hideOfMobile : ''}
`;

const ToggleStyleCell = styled.div<CellProps>`
  grid-area: toggle;
  justify-self: center;
  
  ${props => props.header ? hideOfMobile : ''}
`;

const SocialCell = styled.div<CellProps>`
  grid-area: social;
  justify-self: center;
  align-self: center;

  ${props => props.header ? hideOfMobile : ''}
`;

// const TitleCellBackground = () => setThemeVars(globalVar.headerBgLight, globalVar.headerBgDark);

const TitleCell = styled.div`
  grid-area: title;
  display: flex;
  align-self: center;
justify-self: center;
  
  min-height: 50px;
`;
/*  ${onMobile(css`
    background: ${TitleCellBackground};
  `)}*/
const ImageCell = styled.div`
  grid-area: image;
`;

const ToggleMenuCell = styled.div`
  grid-area: toggleMenu;
  justify-self: center;
  margin-left: 1rem;
  margin-right: 1rem;
  align-self: center;
  margin-top: 0.5rem;
  
  ${visibleOnMobile}
`;

const MenuCell = styled.div`
  grid-area: subMenu;

  ${visibleOnMobile}
`;

const HomeCell = styled.div`
  grid-area: home;
  justify-self: center;
  align-self: center;
  margin-top: 10px;
  margin-left: 8px;
`;

const Image = (
  <img
    src={negue}
    className="ml-4 mt-2"
    style={{
      maxWidth: `75px`,
      maxHeight: `75px`,
      borderRadius: `50%`,
      boxShadow: `1px 1px 3px`,
      marginTop: "5px",
      marginLeft: "5px",
    }}
    alt="author-pic"
  />
);

const SecondaryPanelGrid = styled.div`
  display: grid;
  grid-template:
    "image name social"
    "image . toggle"
    "links links links"
    ;

  width: 100%;
  grid-template-columns: 100px auto auto;
  grid-template-rows: auto;
`;

const LinksCell = styled.div`
  grid-area: links;
`;

const SecondaryPanel = () => (
  <SecondaryPanelGrid>
    <ImageCell>
      <Link to="/">
        {Image}
      </Link>
    </ImageCell>
    <NameCell header={false}>
      <h3 className="author-bio">
        <span>{`<negue />`}</span>
      </h3>
    </NameCell>
    <SocialCell header={false}>
      <SocialIcons />
    </SocialCell>
    <LinksCell>
      <MobilePageLinks />
    </LinksCell>
    <ToggleStyleCell header={false}>
      <ThemeSwitch/>
    </ToggleStyleCell>
  </SecondaryPanelGrid>
);

export const Header = ({ title, hasSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <HeaderGrid hasSidebar={hasSidebar}>
      <HomeCell>
        <Link to="/blog">
          <FaHome size="24px"/>
        </Link>
      </HomeCell>
      <NameCell header={true}>
        <h3 className="author-bio">
          <span>{`<negue />`}</span>
        </h3>
      </NameCell>
      <ToggleStyleCell header={true}>
        <ThemeSwitch/>
      </ToggleStyleCell>
      <ToggleMenuCell>
        <button
          onClick={() => setOpen(!open)}
          className={open ? "active" : ""}
          css={`
            height: 1rem;
            background: transparent;
            border: 0;
            outline: 0;
            
            color: ${foregroundColor};
          `}
        >
          <IconWrapper rotate={open}>
            <FaChevronDown  size="24px" />
          </IconWrapper>
        </button>
      </ToggleMenuCell>
      <SocialCell header={true}>
        <SocialIcons />
      </SocialCell>
      <MenuCell>
        <SecondaryMenu open={open}>
          {open &&
            <SecondaryPanel />
          }
        </SecondaryMenu>
      </MenuCell>
      <TitleCell>
        <h2 className="heading">{title}</h2>
        <SEO title={title} />
      </TitleCell>
    </HeaderGrid>
  );
};
