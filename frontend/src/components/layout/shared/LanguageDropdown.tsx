'use client'

// React Imports
import { useRef, useState } from 'react'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Icon from '@/@core/components/Icon'

const LanguageDropdown = () => {
  // States
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [active, setActive] = useState<any>(1)

  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null)

  const arr = ['English', 'French', 'Spanish']

  return (
    <>
      <IconButton
        ref={anchorRef}
        size='small'
        onClick={(e: any) => setAnchorEl(e.currentTarget)}
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
        <Icon icon={'heroicons:language-16-solid'} />
      </IconButton>
      <Menu
        keepMounted
        id='basic-menu'
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {Array.isArray(arr) &&
          arr?.length > 0 &&
          arr?.map((item: any, index: number) => {
            return (
              <MenuItem
                selected={index === active}
                key={index}
                onClick={() => {
                  setActive(index)
                  setAnchorEl(null)
                }}
              >
                <Typography sx={{ ml: 2, fontWeight: 500 }}>{item}</Typography>
              </MenuItem>
            )
          })}
      </Menu>
    </>
  )
}

export default LanguageDropdown
