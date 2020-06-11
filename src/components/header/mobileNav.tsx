import React from "react"
import styled, {css} from "styled-components"
import {onMobile} from "../shared/media"

const Wrapper = styled.div`
  display: none;

  ${onMobile(css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25px;
  `)}
`;

interface SecondaryMenuProps {
  open: boolean;
}

export const SecondaryMenu = styled.div<SecondaryMenuProps>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  transition: height 0.1s;
  user-select: none;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
  ${(p) => p.open
    ? css`
          min-height: 4rem;
        `
    : css`
          height: 0;
        `}
`;

interface IconWrapperProps {
  rotate: boolean;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  transition: transform 0.1s;
  height: 22px;
  
  ${(p) =>
    p.rotate ?
    css`
      transform-origin: 50% 55%;
      transform: rotate(180deg);
    ` : undefined}
`;

const SecondaryMenuItem = styled.div`
  // padding-right: 1.25rem;
`;
