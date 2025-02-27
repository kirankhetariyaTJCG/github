'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useSearchParams } from 'next/navigation'

// MUI Imports
import type { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Box, Typography, Select, IconButton, LoadingButton, Chip, MenuItem } from '@/Helper/MUIImports'

// Third-party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { editWebsiteData } from '@/redux-store/Website/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  borderBottom: '0.0625rem solid rgba(74, 74, 81, 0.3)'
}))

interface Colors {
  label: string
  main: string
  secondary: string
  light: string
  btnTextColor: string
}

const Settings = () => {
  // State
  const [open, setOpen] = useState<boolean>(false)
  const [navigation, setNavigation] = useState<number>(2)
  const [fontType, setFontType] = useState<number>(1)
  const [colorSchema, setColorSchema] = useState<any>({
    label: 'Orange-White',
    main: '#FF5833',
    secondary: '#FFFFFF',
    light: '#FFE8E2',
    btnTextColor: '#FF5833'
  })

  // Hooks
  const dispatch = useDispatch()
  const colorData = useSelector((state: any) => state.website.website.color)
  const website = useSelector((state: any) => state.website.website)
  const params = useSearchParams()
  const restaurant_id = params.get('restaurant_id')

  useEffect(() => {
    if (AppUtils.checkValue(website) && Object?.keys(website)?.length > 0) {
      setColorSchema(website?.color)
      setFontType(website?.fonts)
      setNavigation(website?.navigation)
    }
  }, [website])

  const colors: Colors[] = [
    { label: 'Orange-White', main: '#FF5833', secondary: '#FFFFFF', light: '#FFE8E2', btnTextColor: '#FF5833' },
    { label: 'Black-Green', main: '#191A19', secondary: '#4E9F3D', light: '#D6DBD6', btnTextColor: '#FFFFFF' },
    { label: 'Green-Orange', main: '#173A00', secondary: '#DF733C', light: '#E0FAD9', btnTextColor: '#FFFFFF' },
    { label: 'Navy-Whiet', main: '#1E3446', secondary: '#FFFFFF', light: '#E2F0FF', btnTextColor: '#1E3446' }
  ]

  const handleSave = () => {
    dispatch(editWebsiteData({
      restaurant_id: restaurant_id,
      id: website?._id,
      navigation_type: navigation,
      color_scheme: JSON.stringify(colorSchema),
      font_type: fontType
    }))
    setOpen(false)
  }

  return (
    <Box
      sx={{
        blockSize: '100%',
        inlineSize: { xs: 300, md: 350 },
        bgcolor: theme => theme.palette.background.paper,
        position: 'fixed',
        insetBlockStart: 0,
        insetInlineEnd: open ? '0 !important' : { xs: '-300px', md: '-350px' },
        boxShadow: theme => (open ? theme.shadows[10] : 'none'),
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        transition: 'inset-inline-end 300ms ease-in-out, box-shadow 300ms ease-in-out'
      }}
    >
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          fontSize: 22,
          position: 'absolute',
          insetBlockStart: '40%',
          insetInlineEnd: '100%',
          transform: 'translateY(-20%)',
          backgroundColor: `${colorData?.main} !important`,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }}
      >
        <Box
          component={Icon}
          icon='mdi:settings-outline'
          color='#fff'
          sx={{
            animation: 'rotation 3s infinite linear',
            '@keyframes rotation': {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' }
            }
          }}
        />
      </IconButton>
      <Header>
        <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>Customizer</Typography>
        <IconButton size='small' onClick={() => setOpen(false)} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ flex: 1, overflow: 'auto', p: 4 }}>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>Navigation Settings</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 3 }}>
            {['Transparent', 'Filled'].map((label, index) => (
              <Chip
                key={label}
                label={label}
                variant={navigation === index + 1 ? 'filled' : 'outlined'}
                color='primary'
                clickable
                onClick={() => setNavigation(index + 1)}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600, mb: 3 }}>Typography</Typography>
          <Select fullWidth value={fontType} onChange={e => setFontType(Number(e.target.value))}>
            {['Lexend', 'Poppins', 'Montserrat', 'Serif Sans'].map((font, index) => (
              <MenuItem key={font} value={index + 1}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600, mb: 3 }}>Theme Settings</Typography>
          <Box>
            {Array.isArray(colors) &&
              colors?.length > 0 &&
              colors.map((color, index) => (
                <LoadingButton
                  fullWidth
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 4,
                    py: 3,
                    outline: theme =>
                      `${color?.label === colorSchema?.label ? 2 : 1}px solid ${color?.label === colorSchema?.label ? color?.main : theme.palette.divider}`,
                    bgcolor: (color?.label === colorSchema?.label ? color?.light : 'transparent'),
                    borderRadius: '8px',
                    mb: 4,
                    transition: 'all 0.1s ease-in-out',
                    '&:hover': {
                      bgcolor: `${color?.light} !important`
                    }
                  }}
                  onClick={() => setColorSchema(color)}
                >
                  <Typography sx={{ fontWeight: 500, color: theme => theme.palette.text.primary }}>
                    {color.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '50%',
                        bgcolor: color?.main,
                        border: theme => `1px solid ${theme.palette.divider}`
                      }}
                    />
                    <Box
                      sx={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '50%',
                        bgcolor: color?.secondary,
                        border: theme => `1px solid ${theme.palette.divider}`
                      }}
                    />
                  </Box>
                </LoadingButton>
              ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          p: 4,
          bgcolor: theme => theme.palette.background.default,
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <LoadingButton
          variant='contained'
          onClick={handleSave}
        >
          Save
        </LoadingButton>
        <LoadingButton
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </LoadingButton>
      </Box>
    </Box>

  )
}

export default Settings
