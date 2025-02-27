// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Box, TextField, LoadingButton, Avatar, Collapse, IconButton } from '@/Helper/MUIImports'

// Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'

// Custom Imports
const CsEditor = dynamic(() => import('@/@core/components/CsEditor'), { ssr: false })

// Store Imports
import { editSection } from '@/redux-store/Website'
import { uploadImage } from '@/redux-store/Website/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { SectionProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import UrlHelper from '@/Helper/Url'

const AboutView = ({ onDelete, section, onCancel }: SectionProps) => {

  // State
  const [value, setValue] = useState<string>('')
  const [img, setImg] = useState<any>(null)

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length) {
      setImg(section?.imgSrc)
      setValue(section?.description)
    }
  }, [section])

  const handleSave = async () => {
    let imgSrc = img
    if (typeof img == 'object') {
      const res = await uploadImage(img)
      if (res?.success && res?.statusCode === 200) {
        imgSrc = res?.data?.file_path
      }
    }
    dispatch(editSection({ id: section?.id, description: value, imgSrc: imgSrc }))
    onCancel && onCancel()
  }

  const AboutUsDropzone = () => {
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxSize: Constants.IMAGE_SIZE,
      accept: Constants.IMAGE_TYPE,
      onDrop: (acceptedFiles: File[]) => acceptedFiles?.map((file: File) => setImg(file))
    })

    return (
      <Box {...getRootProps()} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <input {...getInputProps()} />
        <TextField
          placeholder='Choose file'
          fullWidth
          value={img ? (
            typeof img == 'object'
              ? img?.name
              : AppUtils.getFileNameFromUrl(img))
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

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <CsEditor label='Description' height={200} value={value} setValue={setValue} toolbar={true} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <AboutUsDropzone />
        <Collapse in={AppUtils.checkValue(img)}>
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
              onClick={() => setImg(null)}
            >
              <Icon icon={'eva:close-outline'} color='#fff' />
            </IconButton>
            <Avatar
              variant='rounded'
              src={img instanceof Blob ? URL.createObjectURL(img) : `${UrlHelper.imgPath}${img}`}
              sx={{ width: 100, height: 100 }}
            />
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between', pt: 4,
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <LoadingButton variant='contained' onClick={onDelete}>
          <Icon icon={'ic:twotone-delete'} style={{ fontSize: 20, marginRight: 6 }} />
          Delete
        </LoadingButton>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <LoadingButton
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={onCancel}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant='contained'
            disabled={!AppUtils.checkValue(value) || !AppUtils.checkValue(img)}
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Box >
  )
}

export default AboutView
