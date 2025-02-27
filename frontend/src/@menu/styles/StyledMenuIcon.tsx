// Third-party Imports
import styled from '@emotion/styled'

// Type Imports
import type { RootStylesType } from '../types'

const StyledMenuIcon = styled.span<RootStylesType>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 10px;
  color: rgba(255, 255, 255, 0.5) !important;
  ${({ rootStyles }) => rootStyles};
`

export default StyledMenuIcon
