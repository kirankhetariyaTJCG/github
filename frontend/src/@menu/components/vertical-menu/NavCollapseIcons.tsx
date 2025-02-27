'use client'

// React Imports
import type { HTMLAttributes, ReactElement } from 'react'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'

// Hook Imports
import useVerticalNav from '../../hooks/useVerticalNav'

// Icon Imports
import Icon from '@/@core/components/Icon'

type NavCollapseIconsProps = HTMLAttributes<HTMLSpanElement> & {
  closeIcon?: ReactElement
  lockedIcon?: ReactElement
  unlockedIcon?: ReactElement
  onClick?: () => void
  onClose?: () => void
}

const NavCollapseIcons = (props: NavCollapseIconsProps) => {
  // Props
  const { closeIcon, lockedIcon, unlockedIcon, onClick, onClose, ...rest } = props

  // Hooks
  const { isCollapsed, collapseVerticalNav, isBreakpointReached, toggleVerticalNav } = useVerticalNav()

  // Handle Lock / Unlock Icon Buttons click
  const handleClick = (action: 'lock' | 'unlock') => {
    // Setup the verticalNav to be locked or unlocked
    const collapse = action === 'lock' ? false : true

    // Tell the verticalNav to lock or unlock
    collapseVerticalNav(collapse)

    // Call onClick function if passed
    onClick && onClick()
  }

  // Handle Close button click
  const handleClose = () => {
    // Close verticalNav using toggle verticalNav function
    toggleVerticalNav(false)

    // Call onClose function if passed
    onClose && onClose()
  }

  return (
    <>
      {isBreakpointReached ? (
        <IconButton onClick={handleClose} color='primary'>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      ) : isCollapsed ? (
        <IconButton
          onClick={() => handleClick('lock')}
          color='primary'
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
        >
          <Icon icon={'mingcute:arrows-right-line'} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => handleClick('unlock')}
          color='primary'
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
        >
          <Icon icon={'mingcute:arrows-left-line'} />
        </IconButton>
      )}
    </>
  )
}

export default NavCollapseIcons
