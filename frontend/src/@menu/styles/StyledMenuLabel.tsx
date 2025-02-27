// Third-party Imports
import styled from '@emotion/styled'

// Type Imports
import type { RootStylesType } from '../types'

type StyledMenuLabelProps = RootStylesType & {
  textTruncate?: boolean
}

const StyledMenuLabel = styled.span<StyledMenuLabelProps>`
  flex-grow: 1;
  ${({ textTruncate }) =>
    textTruncate &&
    ` 
      font-weight:400;
      width: 8rem;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.9);
    `};
  ${({ rootStyles }) => rootStyles};
`

export default StyledMenuLabel
