// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import type { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Box, IconButton, LoadingButton, Typography, Drawer, TextField, Divider, Checkbox } from '@/Helper/MUIImports'

// Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { addMenu, editMenu } from '@/redux-store/MenuSelection/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'
import Constants from '@/Helper/Constants'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  borderBottom: '0.0625rem solid rgba(74, 74, 81, 0.3)'
}))

const AddEditMenu = (props: ModelProps & { handleMenuChange: (id: string) => void }) => {
  // Props
  const { open, setOpen, row, handleMenuChange } = props

  // State
  const [menuName, setMenuName] = useState<string>('')
  const [file, setFile] = useState<any>(null)

  // Hooks
  const defaultMenuData = useSelector((state: any) => state.menuSelection.defaultMenuData)
  const selectedMenuData = useSelector((state: any) => state.menuSelection.selectedMenuData)
  const loading = useSelector((state: any) => state.menuSelection.loading)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  const filteredArr = Array.isArray(defaultMenuData) && defaultMenuData?.length > 0
    ? defaultMenuData.filter((item: any) => item?.cuisine_name?.toLowerCase().includes(menuName.toLowerCase()))
    : []

  useEffect(() => {
    if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
      setFile(row?.cuisine_image)
      setMenuName(row?.cuisine_name)
    }
  }, [row])

  useEffect(() => {
    !loading && handleClose()
  }, [loading])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: Constants.IMAGE_SIZE,
    accept: Constants.IMAGE_TYPE,
    onDrop: (acceptedFiles: any) => acceptedFiles.forEach((file: File) => setFile(file))
  })

  const handleClose = () => {
    setMenuName('')
    setFile(null)
    setOpen({ open: false, row: {} })
  }

  const handleCustomMenu = () => {
    const payload = {
      cuisine_name: menuName,
      cuisine_image: file,
      is_popular: true,
      is_default: false,
    }
    Object?.keys(row)?.length > 0
      ? dispatch(editMenu({ ...payload, id: row?._id }))
      : dispatch(addMenu({ ...payload, restaurant_id: restaurant?._id })
      )
  }

  return (
    <>
      <Drawer
        onClose={handleClose}
        open={open}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 350 } } }}
      >
        <Header>
          <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>
            {Object.keys(row)?.length > 0 ? 'Edit' : 'Add'} Menu
          </Typography>
          <IconButton size='small' onClick={() => setOpen({ open: false, row: {} })} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        <Box component={'form'} noValidate sx={{ p: 4, overflow: 'auto' }}>
          <TextField
            value={menuName}
            onChange={(e: any) => setMenuName(e.target.value)}
            fullWidth
            label='Add Menu'
            placeholder='Enter Menu Name'
          />
          {AppUtils.checkValue(menuName) && Array.isArray(filteredArr) && filteredArr?.length === 0 && (
            <LoadingButton
              fullWidth
              {...getRootProps()}
              sx={{
                border: theme => `3px dashed ${theme.palette.primary.main}`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '12rem',
                p: 4,
                mt: 4
              }}
            >
              {AppUtils.checkValue(file) ? (
                <Box sx={{ position: 'relative', height: 'inherit' }}>
                  <input {...getInputProps()} />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      bgcolor: theme => `${theme.palette.primary.main} !important`
                    }}
                  >
                    <Icon icon={'line-md:uploading-loop'} style={{ color: '#fff' }} />
                  </IconButton>
                  <Box
                    component={'img'}
                    src={file instanceof Blob ? URL.createObjectURL(file) : `${UrlHelper.imgPath}${file}`}
                    sx={{ width: '100%', height: '10rem', objectFit: 'cover', borderRadius: '6px' }}
                  />
                </Box>
              ) : (
                <>
                  <input {...getInputProps()} />
                  <Box
                    component={Icon}
                    icon={'line-md:uploading-loop'}
                    sx={{ color: theme => theme.palette.primary.main }}
                    fontSize={40}
                  />
                  <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1.2rem' }}>Upload Your Menu Image</Typography>
                </>
              )}
            </LoadingButton>
          )}
          <Divider sx={{ my: 4 }} />
          {Array.isArray(filteredArr) && filteredArr?.length > 0 && (
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, mb: 2 }}>Pre-Defined Menus</Typography>
          )}
          {Array.isArray(filteredArr) && filteredArr?.length > 0 && (
            <Box
              sx={{
                overflow: 'auto',
                height: AppUtils.checkValue(menuName) ? 'auto' : 'calc(100% - 8rem)',
                pr: Array.isArray(filteredArr) && filteredArr?.length > 0 ? 4 : 0
              }}
            >
              {filteredArr?.map((cuisine: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                      border: theme => `2px solid ${theme.palette.divider}`,
                      borderRadius: '7px',
                      pl: 4,
                      pr: 2,
                      py: 2,
                      mb: 4,
                      gap: 4
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Box
                        component={'img'}
                        src={`${UrlHelper.imgPath}${cuisine?.cuisine_image}`}
                        alt={cuisine?.cuisine_name}
                        width={80}
                        height={80}
                        sx={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <Typography sx={{ fontWeight: 600, pr: 1 }}>{cuisine?.cuisine_name}</Typography>
                    </Box>
                    <Checkbox
                      checked={selectedMenuData?.some(
                        (cuisineItem: any) => cuisineItem?.cuisine_id === cuisine?._id && cuisineItem?.is_default
                      )}
                      onChange={() => handleMenuChange(cuisine?._id)}
                    />
                  </Box>
                )
              })}
            </Box>
          )}
          {AppUtils.checkValue(menuName) && Array.isArray(filteredArr) && filteredArr?.length === 0 && (
            <LoadingButton
              size='large'
              fullWidth
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              loading={loading}
              loadingPosition='start'
              startIcon={loading ? <>&nbsp;</> : <></>}
              onClick={handleCustomMenu}
            >
              {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} {Object?.keys(row)?.length > 0 ? '' : `"${menuName}"`}
            </LoadingButton>
          )}
        </Box>
      </Drawer>
    </>
  )
}

export default AddEditMenu
