// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, TextField } from '@/Helper/MUIImports'

// Third Party Imports
import { useDropzone } from 'react-dropzone'

// Custom Imports
import Cropper from '@/@core/components/Cropper'

// Store Imports
import { uploadImage } from '@/redux-store/Website/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import UrlHelper from '@/Helper/Url'

const AddImage = (props: ModelProps & { onSave?: (state: { title: string; src: any }) => void }) => {
  // Props
  const { open, setOpen, row, onSave } = props

  // State
  const [imgData, setImgData] = useState<{ title: string; src: any }>({ title: '', src: '' })
  const [cropImg, setCropImg] = useState<{ open: boolean; src: any }>({ open: false, src: '' })

  // Hooks
  useEffect(() => {
    if (Object?.keys(row)?.length > 0) {
      setCropImg({ open: false, src: row?.src })
      setImgData({ title: row?.title, src: row?.src })
    }
  }, [row])

  useEffect(() => {
    if (!open) {
      handleClose()
    }
  }, [open])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: Constants.IMAGE_SIZE,
    accept: Constants.IMAGE_TYPE,
    onDrop: (acceptedFiles: any) =>
      acceptedFiles.forEach((file: File) => setCropImg({ open: true, src: file }))
  })

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    setCropImg({ open: false, src: '' })
    setImgData({ src: '', title: '' })
  }

  const handleSave = async () => {
    if (onSave) {
      if (imgData?.src instanceof Blob) {
        const file = new File([imgData?.src], "cropped-image.jpg", { type: "image/jpeg" });
        const res = await uploadImage(file)
        if (res?.success && res?.statusCode === 200) {
          onSave({ title: imgData?.title, src: res?.data?.file_path })
        }
      } else onSave(imgData)
    }
  }


  return (
    <>
      <Dialog open={open} maxWidth='md'>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
            px: 4,
            py: 3
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>
            {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Image
          </Typography>
          <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '35rem' } }}>
          <TextField
            fullWidth
            sx={{ mb: 6 }}
            label={'Award / Badge Image Title'}
            placeholder='Enter Award / Badge Image Title'
            value={imgData?.title}
            onChange={(e: any) => setImgData({ ...imgData, title: e.target.value })}
          />
          <LoadingButton
            fullWidth
            {...getRootProps()}
            sx={{
              border: theme => `2px dashed ${theme.palette.divider}`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              px: 4,
              py: AppUtils.checkValue(cropImg?.src) ? 4 : 10,
              mb: 4
            }}
          >
            {AppUtils.checkValue(cropImg?.src) ? (
              <Box sx={{ position: 'relative', height: 'inherit', width: '100%' }}>
                <input {...getInputProps()} />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    bgcolor: theme => `${theme.palette.primary.main} !important`
                  }}
                >
                  <Icon icon={'line-md:uploading-loop'} style={{ color: '#fff' }} />
                </IconButton>
                <Box
                  component={'img'}
                  src={cropImg?.src instanceof Blob ? URL.createObjectURL(cropImg?.src) : `${UrlHelper.imgPath}${cropImg?.src}`}
                  sx={{ width: '100%', height: '10rem', borderRadius: '6px', objectFit: 'cover' }}
                />
              </Box>
            ) : (
              <>
                <input {...getInputProps()} />
                <Box
                  component={Icon}
                  icon={'line-md:uploading-loop'}
                  sx={{ color: theme => theme.palette.primary.main }}
                  fontSize={50}
                />
                <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1.2rem' }}>Upload Award / Badge Image</Typography>
              </>
            )}
          </LoadingButton>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
            pt: '1rem !important'
          }}
        >
          <LoadingButton size='large' sx={{ mb: { xs: 2.5, sm: 0 } }} variant='outlined' onClick={handleClose}>
            Cancel
          </LoadingButton>
          <LoadingButton
            size='large'
            sx={{ mt: { xs: 2.5, sm: 0 } }}
            variant='contained'
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {cropImg?.open &&
        <Cropper
          open={cropImg?.open}
          setOpen={setCropImg}
          src={cropImg?.src ? URL.createObjectURL(cropImg?.src) : ''}
          aspect={16 / 9}
          onSave={src => {
            setImgData({ ...imgData, src: src })
            setCropImg({ open: false, src: src })
          }}
        />}
    </>
  )
}

export default AddImage
