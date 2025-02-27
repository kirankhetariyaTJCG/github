// React Imports
import { useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, FormHelperText, TextField, Typography, IconButton, Collapse, Avatar } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDropzone } from 'react-dropzone'

// Store Imports
import { uploadImage } from '@/redux-store/Website/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { EditorCommonTypes } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import UrlHelper from '@/Helper/Url'

const AddEditStage = (props: { row?: any, handleSave: (data: any[], isToggle: boolean) => void, sections: any[] }) => {
  // Props
  const { row, handleSave, sections } = props

  const initialValues: EditorCommonTypes = {
    title: '',
    desc: '',
    bgImg: null
  }

  const schema = yup.object().shape({
    title: yup.string().required(ErrorConstants.TITLE_ERROR),
    desc: yup.string().required(ErrorConstants.DESCRIPTION_ERROR)
  })

  const editData = (data: any) => {
    handleSave(sections?.map(item => item?._id === row?._id ? { ...item, ...data, isOpen: false } : item), false)
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values: EditorCommonTypes) => {
      let img = values.bgImg
      if (typeof values.bgImg == 'object') {
        const res = await uploadImage(values.bgImg)
        if (res?.success && res?.statusCode === 200) {
          img = res?.data?.file_path
        }
      }
      editData({ title: values.title, desc: values?.desc, bgImg: img, _id: row?._id })

    }
  })

  const LogoDropzone = () => {
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxSize: Constants.IMAGE_SIZE,
      accept: Constants.IMAGE_TYPE,
      onDrop: (acceptedFiles: File[]) => acceptedFiles?.map((file: File) => formik.setFieldValue('bgImg', file))
    })

    return (
      <Box {...getRootProps()} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <input {...getInputProps()} />
        <TextField
          placeholder='Choose file'
          fullWidth
          value={formik.values.bgImg ? (
            typeof formik.values.bgImg == 'object'
              ? formik.values.bgImg?.name
              : AppUtils.getFileNameFromUrl(formik.values.bgImg))
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

  useEffect(() => {
    if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('title', row?.title ?? '')
      formik.setFieldValue('desc', row?.desc ?? '')
      formik.setFieldValue('bgImg', row?.bgImg ?? null)
    }
  }, [row])

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          sx={{ mb: 4 }}
          fullWidth
          label='Stage Title'
          placeholder='Enter Stage Title'
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          sx={{ mb: 4 }}
          fullWidth
          multiline
          minRows={3}
          label='Description'
          placeholder='Enter Description'
          name='desc'
          value={formik.values.desc}
          onChange={formik.handleChange}
          error={formik.touched.desc && Boolean(formik.errors.desc)}
          helperText={formik.touched.desc && formik.errors.desc}
        />
        <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px', p: 4 }}>
          <LogoDropzone />
          <Collapse in={AppUtils.checkValue(formik.values.bgImg)}>
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
                onClick={() => formik.setFieldValue('bgImg', null)}
              >
                <Icon icon={'eva:close-outline'} color='#fff' />
              </IconButton>
              <Avatar
                variant='rounded'
                src={formik.values.bgImg instanceof Blob ? URL.createObjectURL(formik.values.bgImg) : `${UrlHelper.imgPath}${formik.values.bgImg}`}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
          </Collapse>
        </Box>
        {formik.touched.bgImg && Boolean(formik.errors.bgImg) && (
          <FormHelperText sx={{ color: 'error.main', ml: '0.5rem', mt: 1 }}>
            {String(formik.errors.bgImg)}
          </FormHelperText>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
          pt: '1rem !important'
        }}
      >
        <LoadingButton size='large' variant='contained' onClick={() => formik.handleSubmit()}>
          Save
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default AddEditStage
