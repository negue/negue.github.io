// Based on https://github.com/greglobinski/react-custom-share/blob/master/src/styled/ShareButtonIconOnly.js

import {css, cx} from "emotion"
import PropTypes from "prop-types"
import React from "react"

const styles = css`
  align-items: center;
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 44px;
  justify-content: center;
  margin: 1px;
  transition: 0.3s;
  width: 44px;

  & > svg {
    height: auto;
    transition: transform 0.3s;
    width: 24px;
  }

  &:hover > svg {
    fill: #fff;
  }

  @media (any-hover: none) {
    &:hover {
      background: none;
      box-shadow: none;
    }
  }

  @media (min-width: 330px) {
    margin: 5px;
  }

  @media (min-width: 600px) {
    margin: 7px;
  }

  @media (min-width: 1025px) {
    margin: 10px;
  }
`;

const dynamicStyles = props => css`
  & > svg {
    fill: ${props.color};
  }

  &:hover {
    background: ${props.color};
    box-shadow: 0 0 10px ${props.color};
  }

  @media (any-hover: none) {
    &:hover > svg {
      fill: ${props.color};
    }
  }
`;

export const NativeShareButton = props => {
  const { className, callback, ...rest } = props;
  const dynamicStylesStr = dynamicStyles(props);

  return (
    <button
      onClick={ev => callback()}
      className={cx(styles, dynamicStylesStr, className)}
      {...rest}
    />
  );
};

NativeShareButton.propTypes = {
  className: PropTypes.any,
};
