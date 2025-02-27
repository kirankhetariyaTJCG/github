// React Imports
import { useEffect } from 'react'

// MUI Imports
import type { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Box, Typography, Drawer, IconButton, LoadingButton, TextField, InputAdornment, FormHelperText } from '@/Helper/MUIImports'

// Third Party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Store Imoprts
import { addCategory, editCategory } from '@/redux-store/Category/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import UrlHelper from '@/Helper/Url'

interface Value {
  categoryName: string
  description: string
  image: any
  addon: any
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  borderBottom: '0.0625rem solid rgba(74, 74, 81, 0.3)'
}))

const Footer = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(3, 4),
  borderTop: `0.0625rem solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '1rem'
}))

const AddEditCategory = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // Hooks
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const loading = useSelector((state: any) => state.category.loading)
  const addonsData = useSelector((state: any) => state.addons.addons)
  const dispatch = useDispatch()

  const values: Value = { categoryName: '', description: '', image: null, addon: [] }

  const schema = yup.object().shape({
    categoryName: yup.string().required(ErrorConstants.NAME_ERROR),
    description: yup.string().required(ErrorConstants.DESCRIPTION_ERROR),
    image: yup.mixed().nullable(),
    addon: yup.mixed().nullable()
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      const payload = {
        image: value?.image,
        menu_id: restaurant?.menu_id,
        name: value?.categoryName,
        description: value?.description,
        addons: value?.addon?.map((item: any) => item?._id)
      }
      Object.keys(row)?.length > 0
        ? dispatch(editCategory({ ...payload, id: row?._id, }))
        : dispatch(addCategory({ ...payload }))
    }
  })

  useEffect(() => {
    if (!loading) {
      handleClose()
    }
  }, [loading])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: Constants.IMAGE_SIZE,
    accept: Constants.IMAGE_TYPE,
    onDrop: (acceptedFiles: any) => acceptedFiles.forEach((file: File) => formik.setFieldValue('image', file))
  })

  useEffect(() => {
    if (Object?.keys(row)?.length > 0) {
      formik.setFieldValue('categoryName', row?.name)
      formik.setFieldValue('description', row?.description)
      formik.setFieldValue('image', row?.image)
      formik.setFieldValue('addon', row?.addons ? row?.addons : [])
    }
  }, [row])

  const handleClose = () => {
    formik.resetForm()
    setOpen({ open: false, row: {} })
  }

  return (
    <Drawer
      onClose={handleClose}
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <Header>
        <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Category
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 4, overflow: 'auto' }}>
        <TextField
          fullWidth
          sx={{ mb: 6 }}
          label={'Category Name'}
          placeholder={'Enter Category Name'}
          name='categoryName'
          value={formik.values.categoryName}
          onChange={formik.handleChange}
          error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
          helperText={formik.touched.categoryName && formik.errors.categoryName}
          inputProps={{ maxLength: 80 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Typography>{formik.values.categoryName?.length} / 80</Typography>
              </InputAdornment>
            )
          }}
        />
        <TextField
          fullWidth
          sx={{ mb: 6 }}
          label={'Description'}
          placeholder={'Enter Description'}
          multiline
          minRows={3}
          inputProps={{ maxLength: 150 }}
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Typography>{formik.values.description?.length} / 150</Typography>
              </InputAdornment>
            )
          }}
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
            height: '10rem',
            p: 4,
            mb: 4
          }}
        >
          {AppUtils.checkValue(formik.values.image) ? (
            <Box sx={{ position: 'relative', height: 'inherit' }}>
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
                src={
                  formik.values.image instanceof Blob
                    ? URL.createObjectURL(formik.values.image)
                    : `${UrlHelper.imgPath}${formik.values?.image}`
                }
                sx={{ width: '10rem', height: '8rem', borderRadius: '6px' }}
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
              <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1.2rem' }}>Upload Category Image</Typography>
            </>
          )}
        </LoadingButton>
        {formik.touched.image && Boolean(formik.errors.image) && (
          <FormHelperText sx={{ color: 'error.main', ml: '0.5rem', mt: 1 }}>
            {String(formik.errors.image)}
          </FormHelperText>
        )}
        <CsAutocomplete
          sx={{ mb: 4 }}
          label='Select Addon'
          placeholder='Select Addon'
          options={addonsData ?? []}
          multiple={true}
          getOptionLabel={(option: any) => option?.name || ''}
          isOptionEqualToValue={(option: any, value: any) => option._id === value._id}
          value={formik.values.addon}
          onChange={(e: any, value: any) => formik.setFieldValue('addon', value)}
          error={formik.touched.addon && Boolean(formik.errors.addon)}
          helperText={formik.touched.addon && formik.errors.addon}
        />
      </Box>
      <Footer>
        <LoadingButton
          size='large'
          sx={{ mt: { xs: 2.5, sm: 0 } }}
          variant='contained'
          loading={loading}
          loadingPosition='start'
          startIcon={loading ? <>&nbsp;</> : <></>}
          onClick={() => formik.handleSubmit()}
        >
          Save
        </LoadingButton>
        <LoadingButton
          size='large'
          sx={{ mb: { xs: 2.5, sm: 0 } }}
          variant='outlined'
          disabled={loading}
          onClick={handleClose}
        >
          Cancel
        </LoadingButton>
      </Footer>
    </Drawer>
  )
}

export default AddEditCategory
