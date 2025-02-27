// React Imports
import { useState, useRef, useEffect } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import ReactCrop, { type Crop } from 'react-image-crop'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

// Styles Imports
import 'react-image-crop/dist/ReactCrop.css'

interface Props {
  open: boolean
  setOpen: (state: { open: boolean; src: any }) => void
  src?: any
  aspect?: number | undefined
  onSave?: (src: any) => void
}

const Cropper = (props: Props) => {
  // Props
  const { open, setOpen, aspect, src, onSave } = props

  // Default crop values
  const defaultCrop: Crop = {
    unit: '%', // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 80,
    height: 80
  }

  // State
  const [crop, setCrop] = useState<Crop>(defaultCrop)
  const [croppedImg, setCroppedImg] = useState<Blob | null>(null)

  // Hooks
  const imageRef = useRef<HTMLImageElement | null>(null)

  const handleCropComplete = async (crop: Crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedBlob = await getCroppedImage(imageRef.current, crop)
      setCroppedImg(croppedBlob)
    }
  }

  const getCroppedImage = (image: HTMLImageElement, crop: Crop): Promise<Blob | null> => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return Promise.resolve(null)
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise(resolve => canvas.toBlob(blob => resolve(blob), 'image/jpeg'))
  }

  const handleClose = () => {
    setCrop(defaultCrop)
    setOpen({ open: false, src: '' })
  }

  return (
    <>
      <Dialog open={open} maxWidth='md' sx={{ zIndex: 10000 }}>
        <DialogTitle
          sx={{
            py: 4,
            px: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600 }}>Crop Image</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon={'ic:round-close'} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '100%', md: '40rem' } }}>
          <Box
            sx={{
              mx: 'auto',
              width: '100%',
              maxWidth: '35rem',
              height: 'auto',
              overflow: 'hidden'
            }}
          >
            <ReactCrop crop={crop} aspect={aspect} onChange={c => setCrop(c)} onComplete={c => handleCropComplete(c)}>
              <Box
                component={'img'}
                ref={imageRef}
                src={src}
                alt='Image to crop'
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'cover'
                }}
                onLoad={() => {
                  if (AppUtils.checkValue(src)) {
                    const generateDefaultCrop = async () => {
                      const croppedBlob = await getCroppedImage(imageRef.current!, defaultCrop)
                      setCroppedImg(croppedBlob)
                    }
                    generateDefaultCrop()
                  }
                }}
              />
            </ReactCrop>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            pt: '1rem !important',
            p: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <LoadingButton
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={() => setOpen({ open: false, src: '' })}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant='contained'
            onClick={() => {
              if (onSave && croppedImg) {
                onSave(croppedImg) // Pass the Blob object to onSave
                setCrop(defaultCrop)
              } else {
                handleClose()
              }
            }}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Cropper
