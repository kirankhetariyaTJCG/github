// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, LoadingButton, Typography, IconButton, TextField, FormHelperText } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDropzone } from 'react-dropzone'

// Custom Imports
const CsEditor = dynamic(() => import('@/@core/components/CsEditor'), { ssr: false })

// Store Imports
import { uploadImage } from '@/redux-store/Website/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { EditorCommonTypes, ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import UrlHelper from '@/Helper/Url'

const AddEditVideo = (props: ModelProps & { handleSave: (data: any[]) => void, videos: any[] }) => {
  // Props
  const { open, setOpen, row, handleSave, videos } = props

  // State
  const [desc, setDesc] = useState<string>('')

  const initialValues: EditorCommonTypes = {
    title: '',
    description: '',
    imgSrc: null,
    url: ''
  }

  const schema = yup.object().shape({
    url: yup.string().required(ErrorConstants.URL_ERROR).url(ErrorConstants.VALID_URL_ERROR),
    title: yup.string().required(ErrorConstants.TITLE_ERROR),
    imgSrc: yup.mixed().required(ErrorConstants.IMAGE_ERROR)
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values: EditorCommonTypes) => {
      let img = values?.imgSrc
      if (typeof values?.imgSrc == 'object') {
        const res = await uploadImage(values?.imgSrc)
        if (res?.success && res?.statusCode === 200) {
          img = res?.data?.file_path
        }
      }
      const data = {
        title: values.title,
        description: desc,
        imgSrc: img,
        url: values?.url,
        _id: Object?.keys(row)?.length > 0 ? row?._id : AppUtils.randomId()
      }
      Object?.keys(row)?.length > 0
        ? handleSave(videos?.map(item => item?._id === row?._id ? { ...data } : item))
        : handleSave([...videos, { ...data }])

      handleClose()
    }
  })

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: Constants.IMAGE_SIZE,
    accept: Constants.IMAGE_TYPE,
    onDrop: (acceptedFiles: File[]) => acceptedFiles?.map((file: File) => formik.setFieldValue('imgSrc', file))
  })

  useEffect(() => {
    if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('title', row?.title ?? '')
      formik.setFieldValue('description', row?.description ?? '')
      setDesc(row?.description)
      formik.setFieldValue('imgSrc', row?.imgSrc ?? null)
      formik.setFieldValue('url', row?.url ?? '')
    }
  }, [row])

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    formik.resetForm()
    setDesc('')
  }

  return (
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
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Video
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '45rem' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <TextField
            sx={{ mb: 4 }}
            fullWidth
            label='Video Title'
            placeholder='Enter Video Title'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            sx={{ mb: 4 }}
            fullWidth
            label='Video URL'
            placeholder='Enter Video URL'
            name='url'
            value={formik.values.url}
            onChange={formik.handleChange}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <CsEditor
            label='Description'
            height={200}
            value={desc}
            setValue={setDesc}
            toolbar={true}
            formik={formik}
            fieldName='description'
          />
        </Box>
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
            py: AppUtils.checkValue(formik.values.imgSrc) ? 4 : 10
          }}
        >
          {AppUtils.checkValue(formik.values.imgSrc) ? (
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
                src={formik.values.imgSrc instanceof Blob
                  ? URL.createObjectURL(formik.values.imgSrc)
                  : `${UrlHelper.imgPath}${formik.values.imgSrc}`
                }
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
              <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1.2rem' }}>Upload Video Thumbnail Image</Typography>
            </>
          )}
        </LoadingButton>
        {formik.touched.imgSrc && Boolean(formik.errors.imgSrc) && (
          <FormHelperText sx={{ color: 'error.main', ml: '0.5rem', mt: 1 }}>{String(formik.errors.imgSrc)}</FormHelperText>
        )}
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
        <LoadingButton size='large' sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }} onClick={handleClose}>
          Cancel
        </LoadingButton>
        <LoadingButton size='large' variant='contained' onClick={() => formik.handleSubmit()}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddEditVideo
