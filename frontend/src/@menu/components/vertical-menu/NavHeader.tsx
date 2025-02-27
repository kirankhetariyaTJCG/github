// Third-party Imports
import styled from '@emotion/styled'

// Type Imports
import type { ChildrenType } from '../../types'
import type { VerticalNavContextProps } from '../../contexts/verticalNavContext'

// Hook Imports
import useVerticalNav from '../../hooks/useVerticalNav'

// Util Imports
// import { verticalNavClasses } from '../../utils/menuClasses'

type StyledNavHeaderProps = {
  isHovered?: VerticalNavContextProps['isHovered']
  isCollapsed?: VerticalNavContextProps['isCollapsed']
  collapsedWidth?: VerticalNavContextProps['collapsedWidth']
  transitionDuration?: VerticalNavContextProps['transitionDuration']
}

const StyledNavHeader = styled.div<StyledNavHeaderProps>`
  padding: 15px;
  padding-inline-start: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ${({ transitionDuration }) => `padding-inline ${transitionDuration}ms ease-in-out`};

  ${({ isHovered, isCollapsed }) => isCollapsed && !isHovered && `justify-content: start;`}
`

const NavHeader = ({ children }: ChildrenType) => {
  // Hooks
  const { isHovered, isCollapsed, transitionDuration } = useVerticalNav()

  return (
    <StyledNavHeader
      // className={verticalNavClasses.header}
      isHovered={isHovered}
      isCollapsed={isCollapsed}
      transitionDuration={transitionDuration}
    >
      {children}
    </StyledNavHeader>
  )
}

export default NavHeader
