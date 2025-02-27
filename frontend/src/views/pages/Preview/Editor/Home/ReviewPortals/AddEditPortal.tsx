// React Imports
import React, { useEffect } from 'react'

// MUI Imports
import { InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, LoadingButton, Typography } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { EditorCommonTypes, ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

const options: { value: number, title: string, url: string }[] = [
  { value: 1, title: 'Tripadvisor', url: 'https://www.tripadvisor.in/' },
  { value: 2, title: 'Foursquare', url: 'https://location.foursquare.com/' },
  { value: 3, title: 'Zagat', url: 'https://www.zagat.com/' },
  { value: 4, title: 'Yelp', url: 'https://www.yelp.com/' }
];

const AddEditPortal = (props: ModelProps & { handleSave: (data: any[]) => void, portals: any[] }) => {
  // Props
  const { open, setOpen, row, handleSave, portals } = props

  const initialValues: EditorCommonTypes = { url: '', type: null }

  const schema = yup.object().shape({
    type: yup.mixed().required(ErrorConstants.TYPE_ERROR),
    url: yup.string().required(ErrorConstants.URL_ERROR)
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values: EditorCommonTypes) => {
      const data = {
        name: values.url,
        title: values?.type?.title,
        url: `${values?.type?.url}${values.url}`,
        type: values?.type?.value,
        _id: Object?.keys(row)?.length > 0 ? row?._id : AppUtils.randomId()
      }
      console.log('data ---<', data)
      Object?.keys(row)?.length > 0
        ? handleSave(portals?.map(item => item?._id === row?._id ? { ...data } : item))
        : handleSave([...portals, { ...data }])
      handleClose()
    }
  })

  useEffect(() => {
    if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('url', row?.name ?? '')
      formik.setFieldValue('type', row?.type ? options[row?.type - 1] : null)
    }
  }, [row])

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    formik.resetForm()
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
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Portal
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '45rem' } }}>
        <CsAutocomplete
          sx={{ mb: 6 }}
          label={'Name'}
          placeholder='Select Name'
          options={options}
          isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
          multiple={false}
          getOptionLabel={(option: any) => option?.title || ''}
          value={formik.values.type}
          onChange={(e: any, value: any) => {
            formik.setFieldValue('type', value)
            AppUtils.checkValue(value) && formik.setFieldTouched('type', false, false)
          }}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
        />
        <TextField
          sx={{ mb: 6 }}
          fullWidth
          label='URL to your restaurant profile'
          placeholder='Enter Your Restaurant Url'
          name='url'
          value={formik.values.url}
          onChange={formik.handleChange}
          error={formik.touched.url && Boolean(formik.errors.url)}
          helperText={formik.touched.url && formik.errors.url}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position='start'
                sx={{ display: AppUtils.checkValue(formik.values.type) ? 'flex' : 'none' }}
              >
                <Typography
                  sx={{ fontWeight: 500, textTransform: 'lowercase' }}
                >{`https://www.${formik.values.type?.title}.com/`}</Typography>
              </InputAdornment>
            )
          }}
        />
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

export default AddEditPortal
