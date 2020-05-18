import {css} from "styled-components"

export const onMobile = inner => css`
  @media only screen and (max-width: 850px) {
    ${inner}
  }
`

