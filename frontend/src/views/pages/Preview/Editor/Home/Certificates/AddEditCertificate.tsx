// React Imports
import React, { useEffect, useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, LoadingButton, IconButton, Box, Typography, Collapse, Avatar } from '@/Helper/MUIImports'

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
  { value: 1, title: 'Business License' },
  { value: 2, title: "Food handler's permit" },
  { value: 3, title: 'Liquor License' },
  { value: 4, title: 'Music License' },
  { value: 5, title: 'Certificate of occupancy' },
  { value: 6, title: 'Flammable materials permit' },
  { value: 7, title: 'Health department permit' },
  { value: 7, title: 'Retail sales license' },
  { value: 8, title: 'Sign permit' },
  { value: 9, title: 'Franchise license' },
  { value: 10, title: 'Other' }
]

const AddEditCertificate = (props: ModelProps & { handleSave: (data: any) => void, certificates: any[] }) => {
  // Props
  const { open, setOpen, row, handleSave, certificates } = props

  // State
  const [desc, setDesc] = useState<string>('')

  const initialValues: EditorCommonTypes & { file_type: number } = {
    title: '',
    description: '',
    link: '',
    type: null,
    img: null,
    file_type: 1
  }

  const schema = yup.object().shape({
    type: yup.mixed().required(ErrorConstants.TYPE_ERROR),
    title: yup.string().required(ErrorConstants.TYPE_ERROR),
    description: yup.string().required(ErrorConstants.DESCRIPTION_ERROR)
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values: EditorCommonTypes & { file_type: number }) => {
      let img = values.img
      if (img instanceof Blob) {
        const res = await uploadImage(values?.img)
        if (res?.success && res?.statusCode === 200) {
          img = res?.data?.file_path
        }
      }
      const data = {
        img: img,
        link: values.link,
        title: values.title,
        description: desc,
        type: values?.type?.value,
        file_type: values?.file_type,
        _id: Object?.keys(row)?.length > 0 ? row?._id : AppUtils.randomId()
      }
      Object?.keys(row)?.length > 0
        ? handleSave(certificates?.map(val => (val?._id === row?._id ? { ...data } : val)))
        : handleSave([...certificates, { ...data }])
      handleClose()
    }
  })

  useEffect(() => {
    if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('title', row?.title ?? '')
      formik.setFieldValue('description', row?.description ?? '')
      formik.setFieldValue('link', row?.link ?? '')
      formik.setFieldValue('img', row?.img ?? '')
      setDesc(row?.description)
      formik.setFieldValue('type', row?.type ? options[row?.type - 1] : null)
    }
  }, [row])

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    formik.resetForm()
    setDesc('')
  }

  const CertificateDropzone = () => {
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxSize: Constants.IMAGE_SIZE,
      accept: { 'image/*': ['.png', '.jpg', '.jpeg'], 'application/pdf': ['.pdf'] }, // Pending for future
      onDrop: (acceptedFiles: File[]) => {
        acceptedFiles?.map((file: File) => {
          formik.setFieldValue('file_type', file?.type === 'application/pdf' ? 1 : 2)
          formik.setFieldValue('img', file)
        })
      }
    })

    return (
      <Box {...getRootProps()} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <input {...getInputProps()} />
        <TextField
          placeholder='Choose file'
          fullWidth
          value={
            formik.values.img
              ? typeof formik.values.img == 'object'
                ? formik.values.img?.name
                : AppUtils.getFileNameFromUrl(formik.values.img)
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
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Certificate
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '45rem' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CsAutocomplete
            sx={{ mb: 4 }}
            label={'Certificate Type'}
            placeholder='Select Certificate Type'
            options={options}
            isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
            multiple={false}
            getOptionLabel={(option: any) => option?.title || ''}
            value={formik.values.type}
            onChange={(e: any, value: any) => {
              formik.setFieldValue('type', value)
              formik.setFieldValue('title', value ? value?.title : '')
              AppUtils.checkValue(value) && formik.setFieldTouched('type', false, false)
            }}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          />
          <TextField
            sx={{ mb: 4 }}
            fullWidth
            label='Certificate Title'
            placeholder='Enter Certificate Title'
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
            fieldName='description'
            isTemplate={true}
          />
        </Box>
        <TextField
          sx={{ mb: 4 }}
          fullWidth
          label='Certificate Link (optional)'
          placeholder='Enter Certificate Link'
          name='link'
          value={formik.values.link}
          onChange={formik.handleChange}
          error={formik.touched.link && Boolean(formik.errors.link)}
          helperText={formik.touched.link && formik.errors.link}
        />
        <Box sx={{ mb: 4 }}>
          <CertificateDropzone />
          <Collapse in={AppUtils.checkValue(formik.values.img)}>
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
                onClick={() => formik.setFieldValue('img', null)}
              >
                <Icon icon={'eva:close-outline'} color='#fff' />
              </IconButton>
              {formik.values.file_type === 1 ? (
                <Box
                  sx={{
                    p: 4,
                    boxShadow: theme => theme.shadows[3],
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    height: 100
                  }}
                >
                  <Icon icon={'fa6-regular:file-pdf'} fontSize={45} />
                </Box>
              ) : (
                <Avatar
                  variant='rounded'
                  src={
                    formik.values.img instanceof Blob
                      ? URL.createObjectURL(formik.values.img)
                      : `${UrlHelper.imgPath}${formik.values.img}`
                  }
                  sx={{ width: 100, height: 100 }}
                />
              )}
            </Box>
          </Collapse>
        </Box>
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

export default AddEditCertificate
