'use client'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// ** Icon Imports
import Icon from '@/@core/components/Icon'

const NavToggle = () => {
  // Hooks
  const { toggleVerticalNav, isBreakpointReached } = useVerticalNav()

  return (
    <>
      {isBreakpointReached && (
        <IconButton
          onClick={() => toggleVerticalNav()}
          // size='small'
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            bgcolor: 'transparent !important',
            '&:hover': {
              bgcolor: theme => `${theme.palette.secondary.lightOpacity} !important`,
              color: theme => theme.palette.primary.light
            }
          }}
        >
          <Icon icon={'charm:menu-hamburger'} />
        </IconButton>
      )}
    </>
  )
}

export default NavToggle
