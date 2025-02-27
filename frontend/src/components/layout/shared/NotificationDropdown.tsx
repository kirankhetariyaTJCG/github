'use client'

// MUI Imports
import IconButton from '@mui/material/IconButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

const NotificationDropdown = () => {
  return (
    <>
      <IconButton
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          bgcolor: 'transparent !important',
          '&:hover': {
            bgcolor: theme => `${theme.palette.secondary.lightOpacity} !important`,
            color: theme => theme.palette.primary.light
          },
          fontSize: 23
        }}
      >
        <Icon icon={'mdi:bell-outline'} />
      </IconButton>
    </>
  )
}

export default NotificationDropdown
