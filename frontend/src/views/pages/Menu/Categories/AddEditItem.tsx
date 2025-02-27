// React Imports
import { useEffect } from 'react'

// MUI Imports
import type { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Box, Typography, Drawer, IconButton, LoadingButton, TextField, InputAdornment } from '@/Helper/MUIImports'

// Third Party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Store Imports
import { addItem, editItem } from '@/redux-store/Category/Action'

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
  itemName: string
  description: string
  price: string
  category: any
  addon: any
  image: any
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

const AddEditItem = (props: ModelProps) => {
  // Props
  const { open, row, setOpen } = props

  // Hooks
  const dispatch = useDispatch()
  const categoryData = useSelector((state: any) => state.category.category)
  const loading = useSelector((state: any) => state.category.loading)
  const addonsData = useSelector((state: any) => state.addons.addons)

  const values: Value = {
    itemName: '',
    description: '',
    price: '',
    category: null,
    addon: [],
    image: null
  }

  const schema = yup.object().shape({
    itemName: yup.string().required(ErrorConstants.NAME_ERROR),
    description: yup.string().required(ErrorConstants.DESCRIPTION_ERROR),
    price: yup.string().required(ErrorConstants.PRICE_ERROR),
    category: yup.mixed().required(ErrorConstants.SELECT_CATEGORY_ERROR)
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      const payload = {
        image: value?.image,
        category_id: value?.category?._id,
        name: value?.itemName,
        description: value?.description,
        price: Number(value?.price),
        addons: value?.addon?.map((item: any) => item?._id),
      }
      Object.keys(row)?.length > 0
        ? dispatch(editItem({ ...payload, id: row?._id, }))
        : dispatch(addItem({ ...payload })
        )
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
    if (row && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('itemName', row?.name)
      formik.setFieldValue('description', row?.description)
      formik.setFieldValue('price', row?.price ? row?.price : '')
      formik.setFieldValue('category', row?.category_id ? categoryData?.find((item: any) => item?._id === row?.category_id) : null)
      formik.setFieldValue('addon', row?.addons ? row?.addons : [])
      formik.setFieldValue('image', row?.image ? row?.image : null)
    }
  }, [row])

  const handleClose = () => {
    formik.resetForm()
    setOpen({ open: false, row: {} })
  }

  return (
    <>
      <Drawer
        onClose={handleClose}
        open={open}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
      >
        <Header>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
            {Object.keys(row)?.length > 0 ? 'Edit' : 'Add'} Item
          </Typography>
          <IconButton onClick={handleClose} sx={{ fontSize: 25 }}>
            <Icon icon={'ic:round-close'} />
          </IconButton>
        </Header>
        <Box sx={{ p: 4, overflow: 'auto' }}>
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
              mb: 6
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
                  src={formik.values.image instanceof Blob
                    ? URL.createObjectURL(formik.values.image)
                    : `${UrlHelper.imgPath}${formik.values.image}`}
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
                <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1.2rem' }}>Upload Item Image</Typography>
              </>
            )}
          </LoadingButton>
          <CsAutocomplete
            sx={{ mb: 6 }}
            label='Select Category'
            placeholder='Select Category'
            options={categoryData ? categoryData : []}
            isOptionEqualToValue={(option: any, value: any) => option._id === value._id}
            multiple={false}
            getOptionLabel={(option: any) => option?.name || ''}
            value={formik.values.category}
            onChange={(e: any, value: any) => formik.setFieldValue('category', value)}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 4 }}>
            <TextField
              fullWidth
              label={'Item Name'}
              placeholder={'Enter Item Name'}
              name='itemName'
              value={formik.values.itemName}
              onChange={formik.handleChange}
              error={formik.touched.itemName && Boolean(formik.errors.itemName)}
              helperText={formik.touched.itemName && formik.errors.itemName}
              inputProps={{ maxLength: 80 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography>{formik.values.itemName?.length} / 80</Typography>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              label={'Item Price'}
              placeholder={'Enter Item Price'}
              name='price'
              value={formik.values.price}
              onChange={(e: any) => formik.setFieldValue('price', AppUtils.parseNumber(e.target.value))}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Box>
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
          <CsAutocomplete
            sx={{ mb: 4 }}
            label='Select Addon'
            placeholder='Select Addon'
            options={addonsData ? addonsData : []}
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
            variant='contained'
            onClick={() => formik.handleSubmit()}
            loading={loading}
            loadingPosition='start'
            startIcon={loading ? <>&nbsp;</> : <></>}
          >
            Save
          </LoadingButton>
          <LoadingButton
            size='large'
            variant='outlined'
            disabled={loading}
            onClick={handleClose}
          >
            Cancel
          </LoadingButton>
        </Footer>
      </Drawer>
    </>
  )
}

export default AddEditItem
