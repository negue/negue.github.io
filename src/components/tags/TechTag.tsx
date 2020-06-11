import React from "react"

import {Link} from "gatsby"
import styled from "styled-components"

const TechTagButton = styled.button`
  transition: filter 0.7s ease-out;
  transform: translate3d(0, 0, 0);
  background: #777;
  border: 0;
  font-size: .85rem;
  display: flex;
  padding: 8px;
  align-items: center;
  cursor: pointer;

  p {
    transition-duration: 0;
    color: white;
    margin: 0;
  }

  span {
    height: 20px;
  }

  :hover, :active, :focus {
    outline: 0;
    background: var(--hover-background, #222);

    filter: drop-shadow(0 0 0.5rem var(--svg-hover-color));

    p {
      color: var(--hover-color);
    }

    svg {
      --svg-color: var(--svg-hover-color);
      filter: drop-shadow(0 0 0.75rem var(--svg-hover-color));
    }
  }

  svg {
    fill: var(--svg-color);
    margin-left: 8px;
    
    &.empty {
      display: none;
    }
  }
`;

const TechTag = (props) => {
  const { tag, tech, svg, size, color = 'white', count, hoverTextColor } = props

  // Change colors on hover :>
  const buttonStyle = 
    {
      '--hover-background': '#333',
      '--svg-color': color,
      '--svg-hover-color': color,
      '--hover-border-color': color,
      '--hover-color': color,
    } as React.CSSProperties;

  return (
    <div className="d-inline-block p-1">
      <Link to={`/tags/${tag}/`}>
        <TechTagButton
          className="text-white"
          style={buttonStyle}
        >
          <p className="d-inline">{tech} </p> 
          <span className="d-inline" style={{ fontSize: size, color: color }}>
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
                 width={size} height={size} className={svg ? '' : 'empty'}
            >
              <title>{tech}</title>
              <path 
                d={svg} />
            </svg>
          </span>

        </TechTagButton>
      </Link>
      {(false && count > 0) &&
        <span> x
              {count}
        </span>
      }
    </div>

  )
}

export default TechTag
