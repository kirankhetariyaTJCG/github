// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, IconButton, Typography, Avatar, FormControl, Radio, RadioGroup, Collapse, FormControlLabel, TextField } from '@/Helper/MUIImports'

// Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'

// Store Imports
import { editSection } from '@/redux-store/Website'
import { uploadImage } from '@/redux-store/Website/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import UrlHelper from '@/Helper/Url'

const LogoView = ({ section, onCancel }: { section: any, onCancel: () => void }) => {
  // State
  const [values, setValues] = useState<{ restaurantLogo: any, logoType: number }>({ restaurantLogo: null, logoType: 1 })

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      setValues({ logoType: section?.logoType, restaurantLogo: section?.restaurantLogo ?? null })
    }
  }, [section])

  const LogoDropzone = () => {
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxSize: Constants.IMAGE_SIZE,
      accept: Constants.IMAGE_TYPE,
      onDrop: (acceptedFiles: File[]) => acceptedFiles?.map((file: File) => setValues({ ...values, restaurantLogo: file }))
    })

    return (
      <Box {...getRootProps()} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <input {...getInputProps()} />
        <TextField
          placeholder='Choose file'
          fullWidth
          value={values?.restaurantLogo ? (
            typeof values?.restaurantLogo == 'object'
              ? values?.restaurantLogo?.name
              : AppUtils.getFileNameFromUrl(values?.restaurantLogo))
            : ''
          }
          InputProps={{ readOnly: true }}
        />
        <LoadingButton variant='contained' sx={{ py: 4, width: '12rem' }}>
          Upload Image
        </LoadingButton>
      </Box>
    )
  }

  const handleClose = () => {
    setValues({ restaurantLogo: null, logoType: 1 })
    onCancel()
  }

  const editData = (file_path: string) => {
    dispatch(editSection({
      id: section?.id,
      restaurantLogo: file_path,
      logoType: values?.logoType
    }))
    handleClose()
  }

  const handleSave = async () => {
    if (values?.restaurantLogo instanceof Blob) {
      const res = await uploadImage(values?.restaurantLogo)
      if (res?.success && res?.statusCode === 200) {
        editData(res?.data?.file_path)
      }
    } else {
      editData(values?.restaurantLogo)
    }
  }

  return (
    <Box>
      <FormControl fullWidth>
        <RadioGroup value={values?.logoType} onChange={(e: any) => setValues({ ...values, logoType: Number(e.target.value) })}>
          <FormControlLabel value={1} control={<Radio />} label='Show restaurant name as logo' />
          <Collapse in={values?.logoType === 1}>
            <Box sx={{ my: 2 }}>
              <TextField fullWidth value={section?.restaurantName} InputProps={{ readOnly: true }} />
              <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
                To update the restaurant name, please visit the <b>"Restaurant Details"</b> page and make the changes
                there.
              </Typography>
            </Box>
          </Collapse>
          <FormControlLabel value={2} control={<Radio />} label='Upload my logo (optional / later)' />
        </RadioGroup>
      </FormControl>
      <Collapse in={values.logoType === 2} sx={{ mb: 4 }}>
        <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px', p: 4 }}>
          <LogoDropzone />
          <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
            To ensure high quality, please provide your logo in PNG, JPG, JPEG, or SVG (preferred) format.
          </Typography>
          <Collapse in={AppUtils.checkValue(values?.restaurantLogo)}>
            <Box sx={{ position: 'relative', mt: 4, width: 'max-content' }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '-0.5rem',
                  bgcolor: theme => `${theme.palette.primary.main}!important`,
                  zIndex: 2,
                  p: 0.5
                }}
                onClick={() => setValues({ restaurantLogo: null, logoType: 1 })}
              >
                <Icon icon={'eva:close-outline'} color='#fff' />
              </IconButton>
              <Avatar
                variant='rounded'
                src={values?.restaurantLogo instanceof Blob ? URL.createObjectURL(values?.restaurantLogo) : `${UrlHelper.imgPath}${values?.restaurantLogo}`}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
          </Collapse>
        </Box>
      </Collapse>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          pt: 4,
          gap: 4,
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <LoadingButton
          size='large'
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={handleClose}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          variant='contained'
          size='large'
          disabled={values?.logoType === 2 && !AppUtils.checkValue(values?.restaurantLogo)}
          onClick={handleSave}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default LogoView
