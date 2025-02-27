// React Imports
import React, { useEffect, useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Box, Typography, Dialog, DialogTitle, DialogContent, LoadingButton, IconButton, DialogActions, TextField } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
const CsEditor = dynamic(() => import('@/@core/components/CsEditor'), { ssr: false })

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { EditorCommonTypes, ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

const options = [
  { value: 1, title: 'Head Chef' },
  { value: 2, title: 'Chef / Cook' },
  { value: 3, title: 'Bartender' },
  { value: 4, title: 'Dishwasher' },
  { value: 5, title: 'Host / Hostess' },
  { value: 6, title: 'Server / Watier / Waitress' },
  { value: 7, title: 'Restaurant Manager' },
  { value: 8, title: 'Assistant Manager' }
]

const AddEditJob = (props: ModelProps & { handleSave: (data: any[]) => void, jobs: any[] }) => {
  // Props
  const { open, setOpen, row, handleSave, jobs } = props

  // State
  const [desc, setDesc] = useState<string>('')

  const initialValues: EditorCommonTypes = {
    title: '',
    desc: '',
    type: null
  }

  const schema = yup.object().shape({
    type: yup.mixed().required(ErrorConstants.TYPE_ERROR),
    title: yup.string().required(ErrorConstants.TITLE_ERROR),
    desc: yup.string().required(ErrorConstants.DESCRIPTION_ERROR)
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values: EditorCommonTypes) => {
      const data = {
        title: values.title,
        description: desc,
        type: values?.type?.value,
        postedOn: new Date(),
        _id: Object?.keys(row)?.length > 0 ? row?._id : AppUtils.randomId()
      }
      Object?.keys(row)?.length > 0
        ? handleSave(jobs?.map(item => item?._id === row?._id ? { ...data } : item))
        : handleSave([...jobs, { ...data }])
      handleClose()
    }
  })

  useEffect(() => {
    if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('title', row?.title ?? '')
      formik.setFieldValue('desc', row?.description ?? '')
      setDesc(row?.description)
      formik.setFieldValue('type', row?.type ? options[row?.type - 1] : null)
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
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Job
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '45rem' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CsAutocomplete
            sx={{ mb: 4 }}
            label={'Job Type'}
            placeholder='Select Job Type'
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
            label='Job Title'
            placeholder='Enter Job Title'
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
            isTemplate={true}
          />
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

export default AddEditJob
