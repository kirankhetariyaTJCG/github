// React Imports
import React, { useEffect, useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Dialog, DialogTitle, DialogContent, DialogActions, LoadingButton, Box, Typography, TextField, IconButton, FormHelperText } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDropzone } from 'react-dropzone'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
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

const options = [
  { value: 1, title: 'NEW! Online Ordering' },
  { value: 2, title: 'Menu Changes' },
  { value: 3, title: 'Anniversary' },
  { value: 4, title: 'Holidays & Vacation' },
  { value: 5, title: 'Start & Stop Delivery' },
  { value: 6, title: 'Introducing New Dish' }
]

const AddEditAnnouncement = (props: ModelProps & { handleSave: (data: any[]) => void, sections: any[] }) => {
  // Props
  const { open, setOpen, row, handleSave, sections } = props

  // State
  const [desc, setDesc] = useState<string>('')

  // Hooks
  useEffect(() => {
    if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('title', row?.title ?? '')
      formik.setFieldValue('desc', row?.desc ?? '')
      setDesc(row?.desc)
      formik.setFieldValue('img', row?.img ?? null)
      formik.setFieldValue('type', row?.type ? options[row?.type - 1] : null)
    }
  }, [row])

  const initialValues: EditorCommonTypes = {
    title: '',
    desc: '',
    img: null,
    type: null
  }

  const schema = yup.object().shape({
    type: yup.mixed().required(ErrorConstants.TYPE_ERROR),
    title: yup.string().required(ErrorConstants.TITLE_ERROR),
    desc: yup.string().required(ErrorConstants.DESCRIPTION_ERROR),
    img: yup.mixed().required(ErrorConstants.IMAGE_ERROR)
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values: EditorCommonTypes) => {
      let img = values.img
      if (typeof img == 'object') {
        const res = await uploadImage(values.img)
        if (res?.success && res?.statusCode === 200) {
          img = res?.data?.file_path
        }
      }
      const data = {
        title: values.title,
        desc: desc,
        img: img,
        type: values?.type?.value,
        _id: Object?.keys(row)?.length > 0 ? row?._id : AppUtils.randomId()
      }
      Object?.keys(row)?.length > 0
        ? handleSave(sections?.map(item => item?._id === row?._id ? { ...data } : item))
        : handleSave([...sections, { ...data }])

      handleClose()
    }
  })

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: Constants.IMAGE_SIZE,
    accept: Constants.IMAGE_TYPE,
    onDrop: (acceptedFiles: File[]) => acceptedFiles?.map((file: File) => formik.setFieldValue('img', file))
  })

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    formik.resetForm()
    setDesc('')
  }

  const handleType = (e: any, value: any) => {
    formik.setFieldValue('type', value)
    formik.setFieldValue('title', value ? value?.title : '')
    AppUtils.checkValue(value) && formik.setFieldTouched('type', false, false)
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
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Announcement
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '45rem' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CsAutocomplete
            sx={{ mb: 4 }}
            label={'Announcement Type'}
            placeholder='Select Announcement Type'
            options={options}
            isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
            multiple={false}
            getOptionLabel={(option: any) => option?.title || ''}
            value={formik.values.type}
            onChange={handleType}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          />
          <TextField
            sx={{ mb: 4 }}
            fullWidth
            label='Announcement Title'
            placeholder='Enter Announcement Title'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
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
            fieldName='desc'
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
            py: AppUtils.checkValue(formik.values.img) ? 4 : 10
          }}
        >
          {AppUtils.checkValue(formik.values.img) ? (
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
                src={formik.values.img instanceof Blob ? URL.createObjectURL(formik.values.img) : `${UrlHelper.imgPath}${formik.values.img}`}
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
              <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1.2rem' }}>Upload Announcement Image</Typography>
            </>
          )}
        </LoadingButton>
        {formik.touched.img && Boolean(formik.errors.img) && (
          <FormHelperText sx={{ color: 'error.main', ml: '0.5rem', mt: 1 }}>{String(formik.errors.img)}</FormHelperText>
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

export default AddEditAnnouncement
