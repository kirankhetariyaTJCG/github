// React Imports
import { useEffect } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Store Imports
import { addTaxCategory, editTaxCategory } from '@/redux-store/Payments/Taxtion/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Value {
  name: string
  pickup: string
  delivery: string
  preserve: string
}

interface Props {
  row?: any
  open: boolean
  setOpen: (state: { open: boolean; row: any }) => void
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

const AddEditTaxCategory = (props: Props) => {
  // Props
  const { row, open, setOpen } = props

  // Hooks
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const loading = useSelector((state: any) => state.payments.taxtion.loading)
  const dispatch = useDispatch()

  const values: Value = { name: '', pickup: '', delivery: '', preserve: '' }

  const schema = yup.object().shape({
    name: yup.string()
      .required(ErrorConstants.TAX_CATEGORY_ERROR).max(25, ErrorConstants.MIN_CHAR_ERROR.replace('{value}', '25'))
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (values: Value) => {
      const payload = {
        name: values?.name,
        tax_rate: {
          rate_pickup: Number(values?.pickup),
          rate_delivery: Number(values?.delivery),
          rate_preserve: Number(values?.preserve)
        }
      }
      Object?.keys(row)?.length > 0
        ? dispatch(editTaxCategory({ ...payload, id: row?._id }))
        : dispatch(addTaxCategory({ ...payload, restaurant_id: restaurant?._id, }))
    }
  })

  const handleClose = () => {
    formik.resetForm()
    setOpen({ open: false, row: {} })
  }

  const handleChange = (e: any) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 3)
    formik.handleChange(e)
  }

  const getInputProps = () => ({
    endAdornment: (
      <InputAdornment position="end">
        <Icon icon={'akar-icons:percentage'} />
      </InputAdornment>
    ),
  });

  useEffect(() => {
    if (!loading) {
      handleClose()
    }
  }, [loading])

  useEffect(() => {
    if (row && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('name', row?.name ? row?.name : '')
      formik.setFieldValue('pickup', row?.tax_rate?.rate_pickup ? row?.tax_rate?.rate_pickup : '')
      formik.setFieldValue('delivery', row?.tax_rate?.rate_delivery ? row?.tax_rate?.rate_delivery : '')
      formik.setFieldValue('preserve', row?.tax_rate?.rate_preserve ? row?.tax_rate?.rate_preserve : '')
    }
  }, [row])

  return (
    <>
      <Drawer
        onClose={handleClose}
        open={open}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 350 } } }}
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
            label={'Tax category name'}
            placeholder='Enter category name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, mb: 6 }}>
            <Typography sx={{ fontWeight: 500 }}>Pickup:</Typography>
            <TextField
              sx={{ width: '50%' }}
              name='pickup'
              placeholder='Enter pickup'
              value={formik.values.pickup}
              onChange={handleChange}
              error={formik.touched.pickup && Boolean(formik.errors.pickup)}
              helperText={formik.touched.pickup && formik.errors.pickup}
              InputProps={getInputProps()}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, mb: 6 }}>
            <Typography sx={{ fontWeight: 500 }}>Delivery:</Typography>
            <TextField
              sx={{ width: '50%' }}
              name='delivery'
              placeholder='Enter delivery'
              value={formik.values.delivery}
              onChange={handleChange}
              error={formik.touched.delivery && Boolean(formik.errors.delivery)}
              helperText={formik.touched.delivery && formik.errors.delivery}
              InputProps={getInputProps()}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, mb: 6 }}>
            <Typography sx={{ fontWeight: 500 }}>In Restaurant:</Typography>
            <TextField
              sx={{ width: '50%' }}
              placeholder='Enter in restaurant'
              name='preserve'
              value={formik.values.preserve}
              onChange={handleChange}
              error={formik.touched.preserve && Boolean(formik.errors.preserve)}
              helperText={formik.touched.preserve && formik.errors.preserve}
              InputProps={getInputProps()}
            />
          </Box>
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
            onClick={handleClose}>
            Cancel
          </LoadingButton>
        </Footer>
      </Drawer>
    </>
  )
}

export default AddEditTaxCategory
