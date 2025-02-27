'use client'

//React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import {
  Box, Card, LoadingButton, FormHelperText, Divider, Typography,
  TextField, InputAdornment, FormControl, Select, MenuItem, InputLabel
} from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import CustomBackdrop from '@/@core/components/CsBackdropLoader'
import CategoryList from './CategoryList'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import AppUtils from '@/Helper/AppUtils'

interface Value {
  taxType: string
  taxLabel: string
  taxDelivery: string
}

const TaxationView = () => {
  // State
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })

  // Hooks
  const { restaurant, initialLoading } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  const values: Value = { taxType: '', taxLabel: '', taxDelivery: '' }

  const schema = yup.object().shape({
    taxType: yup.string().required(ErrorConstants.SALES_TAX_ERROR),
    taxLabel: yup.string().required(ErrorConstants.TAX_NAME_ERROR),
    taxDelivery: yup.string().required(ErrorConstants.DELIVERY_FEE_ERROR),
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      dispatch(editRestaurantDetail({
        data: {
          id: restaurant?._id,
          sales_tax_type: value?.taxType,
          sales_tax_label: value?.taxLabel,
          sales_tax_delivery: value?.taxDelivery
        },
        old_restaurant_data: restaurant
      }))
    }
  })

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      formik.setFieldValue('taxType', restaurant?.sales_tax_type ?? 1)
      formik.setFieldValue('taxLabel', restaurant?.sales_tax_label ?? '')
      formik.setFieldValue('taxDelivery', restaurant?.sales_tax_delivery ?? '')
    }
  }, [restaurant])

  return (
    <>
      <CustomBackdrop open={initialLoading} />
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            px: 4,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Taxation</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 2, sm: 4 },
              flexDirection: { xs: 'column', sm: 'row' },
              mt: { xs: 2, sm: 0 }
            }}
          >
            <LoadingButton
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              onClick={() => setIsAdd({ open: true, row: {} })}
            >
              Add Tax Category
            </LoadingButton>
            <LoadingButton
              variant='contained'
              sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
              onClick={() => formik.handleSubmit()}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            p: 4
          }}
        >
          <Box sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel>Sales Tax</InputLabel>
              <Select
                label='Sales Tax'
                name='taxType'
                value={formik.values.taxType}
                onChange={formik.handleChange}
                error={formik.touched.taxType && Boolean(formik.errors.taxType)}
              >
                <MenuItem value={1}>Prices include all taxes</MenuItem>
                <MenuItem value={2}>Taxes apply to menu prices</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.taxType && Boolean(formik.errors.taxType) && (
              <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                {formik.touched.taxType && formik.errors.taxType}
              </FormHelperText>
            )}
          </Box>
          <TextField
            fullWidth
            label={'Name of the tax'}
            placeholder='Enter Tax Name'
            name='taxLabel'
            value={formik.values.taxLabel}
            onChange={formik.handleChange}
            error={formik.touched.taxLabel && Boolean(formik.errors.taxLabel)}
            helperText={formik.touched.taxLabel && formik.errors.taxLabel}
          />
          <TextField
            fullWidth
            label={'Taxation for delivery fee'}
            placeholder='Enter tax for delivery fee'
            name='taxDelivery'
            value={formik.values.taxDelivery}
            onChange={formik.handleChange}
            error={formik.touched.taxDelivery && Boolean(formik.errors.taxDelivery)}
            helperText={formik.touched.taxDelivery && formik.errors.taxDelivery}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Icon icon={'akar-icons:percentage'} />
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Divider>Tax Categories</Divider>
        <Box sx={{ p: 4, height: 'calc(100vh - 17rem)', overflow: 'auto' }}>
          <CategoryList isAdd={isAdd} setIsAdd={setIsAdd} />
        </Box>
      </Card>
    </>
  )
}

export default TaxationView
