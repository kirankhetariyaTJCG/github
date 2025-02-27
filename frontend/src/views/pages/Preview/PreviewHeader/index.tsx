// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import EditorMode from '../Editor'

// Store Imports
import { setPreviewType } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

const PreviewHeader = () => {
  // State
  const [previewMenu, setPreviewMenu] = useState<HTMLElement | null>(null)
  const [languageMenu, setLanguageMenu] = useState<HTMLElement | null>(null)
  const [openEditor, setOpenEditor] = useState<boolean>(false)

  // Hooks
  const dispatch = useDispatch()
  const router = useRouter()
  const preType = useSelector((state: any) => state.website.website.previewType)

  const setPreview = (type: number) => {
    dispatch(setPreviewType(type))
    setPreviewMenu(null)
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: '#D9D9D9',
          position: 'fixed',
          top: 0,
          zIndex: 100,
          width: '100%',
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              bgcolor: '#D9D9D9',
              py: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon={'bx:edit'} color='#000' />
              <Typography sx={{ fontWeight: 500, color: '#000', fontSize: '1rem' }}>Site Editor</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <LoadingButton
                startIcon={<Icon icon={'ic:round-translate'} />}
                sx={{ color: '#000' }}
                onClick={(e: any) => setLanguageMenu(e.currentTarget)}
              >
                English
              </LoadingButton>
              <LoadingButton
                startIcon={<Icon icon={'mdi:monitor-edit'} />}
                sx={{
                  color: '#fff',
                  bgcolor: '#000 !important',
                  '& > span > svg': { fontSize: '25px !important' }
                }}
                onClick={() => setOpenEditor(true)}
              >
                Editor Mode
              </LoadingButton>
              <LoadingButton
                startIcon={<Icon icon={'mdi:projector-screen-outline'} />}
                endIcon={
                  <Icon
                    icon={'mdi:menu-down'}
                    style={{ transition: 'all 0.2s ease-in-out', transform: Boolean(previewMenu) ? 'rotate(180deg)' : 'none' }}
                  />
                }
                sx={{
                  color: '#000',
                  bgcolor: '#fff !important',
                  '& > span > svg': { fontSize: '25px !important' }
                }}
                onClick={(e: any) => setPreviewMenu(e.currentTarget)}
              >
                Preview
              </LoadingButton>

              <IconButton
                sx={{ color: '#000' }}
                onClick={() => router.replace('/setup/publish/sales-optimized-website')}
              >
                <Icon icon={'ic:round-close'} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      <Menu
        keepMounted
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        anchorEl={previewMenu}
        onClose={() => setPreviewMenu(null)}
        open={Boolean(previewMenu)}
      >
        <MenuItem selected={preType === 1} onClick={() => setPreview(1)} sx={{ fontWeight: 500, width: '8.8rem' }}>
          <Icon icon={'tabler:device-desktop'} style={{ marginRight: '0.5rem' }} />
          Desktop
        </MenuItem>
        <MenuItem selected={preType === 2} onClick={() => setPreview(2)} sx={{ fontWeight: 500, width: '8.8rem' }}>
          <Icon icon={'icon-park-outline:ipad-one'} style={{ marginRight: '0.5rem' }} />
          Tablet
        </MenuItem>
        <MenuItem selected={preType === 3} onClick={() => setPreview(3)} sx={{ fontWeight: 500, width: '8.8rem' }}>
          <Icon icon={'lucide:smartphone'} style={{ marginRight: '0.5rem' }} />
          Mobile
        </MenuItem>
      </Menu>

      <Menu
        keepMounted
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        anchorEl={languageMenu}
        onClose={() => setLanguageMenu(null)}
        open={Boolean(languageMenu)}
      >
        <MenuItem onClick={() => setLanguageMenu(null)} sx={{ fontWeight: 500 }}>
          English
        </MenuItem>
        <MenuItem onClick={() => setLanguageMenu(null)} sx={{ fontWeight: 500 }}>
          French
        </MenuItem>
        <MenuItem onClick={() => setLanguageMenu(null)} sx={{ fontWeight: 500 }}>
          Spanish
        </MenuItem>
      </Menu>

      <EditorMode open={openEditor} setOpen={setOpenEditor} />
    </>
  )
}

export default PreviewHeader
