// React Imports
import { useEffect } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'
import { Box, Typography, Drawer, IconButton, LoadingButton, Checkbox, FormControlLabel, TextField, InputAdornment } from '@/Helper/MUIImports'

// Third Party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Store Imports
import { addSize, editSize } from '@/redux-store/Category/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import AppUtils from '@/Helper/AppUtils'

interface Props {
  setIsAdd: (state: { open: boolean; row: any, item: any }) => void
  isAdd: { open: boolean; row: any, item: any }
}

interface Value {
  name: string
  price: string
  preSelect: boolean
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

const AddEditSize = (props: Props) => {
  // Props
  const { isAdd, setIsAdd } = props

  // Hooks
  const dispatch = useDispatch()
  const addonsData = useSelector((state: any) => state.addons.addons)
  const loading = useSelector((state: any) => state.category.loading)

  const defaulatValues: Value = {
    name: '',
    price: '',
    preSelect: false,
    addon: []
  }

  const schema = yup.object().shape({
    name: yup.string().required(ErrorConstants.NAME_ERROR),
    price: yup.string().required(ErrorConstants.PRICE_ERROR)
  })

  const formik = useFormik({
    initialValues: defaulatValues,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      const payload = {
        item_id: isAdd?.item?._id,
        name: value?.name,
        price: Number(value?.price),
        is_pre_select: value?.preSelect,
        addons: value?.addon?.map((item: any) => item?._id)
      }
      isAdd?.row && Object?.keys(isAdd?.row)?.length > 0
        ? dispatch(editSize({ data: { ...payload, id: isAdd?.row?._id }, category_id: isAdd?.item?.category_id }))
        : dispatch(addSize({ data: payload, category_id: isAdd?.item?.category_id }))

    }
  })

  useEffect(() => {
    if (isAdd?.row && Object?.keys(isAdd?.row)?.length > 0) {
      formik.setFieldValue('name', isAdd?.row?.name)
      formik.setFieldValue('price', isAdd?.row?.price ? isAdd?.row?.price : '')
      formik.setFieldValue('preSelect', isAdd?.row?.is_pre_select ?? false)
      formik.setFieldValue('addon', isAdd?.row?.addons ? isAdd?.row?.addons : [])
    }
  }, [isAdd?.row])

  useEffect(() => {
    if (!loading) {
      handleClose()
    }
  }, [loading])

  const handleClose = () => {
    formik.resetForm()
    setIsAdd({ open: false, row: {}, item: {} })
  }

  return (
    <>
      <Drawer
        onClose={handleClose}
        open={isAdd?.open}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
      >
        <Header>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
            {Object.keys(isAdd?.row)?.length > 0 ? 'Edit' : 'Add'} Size
          </Typography>
          <IconButton onClick={handleClose} sx={{ fontSize: 25 }}>
            <Icon icon={'ic:round-close'} />
          </IconButton>
        </Header>
        <Box sx={{ p: 4, overflow: 'auto' }}>
          <TextField
            sx={{ mb: 6 }}
            fullWidth
            label={'Size Name'}
            placeholder={'Enter Size Name'}
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            inputProps={{ maxLength: 80 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography>{formik.values?.name?.length} / 80</Typography>
                </InputAdornment>
              )
            }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            sx={{ mb: 6 }}
            fullWidth
            label={'Price'}
            placeholder={'Enter Price'}
            name='price'
            value={formik.values.price}
            onChange={(e: any) => formik.setFieldValue('price', AppUtils.parseNumber(e.target.value))}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <CsAutocomplete
            sx={{ width: '100%', mb: 6 }}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.preSelect}
                onChange={() => formik.setFieldValue('preSelect', !formik.values.preSelect)}
              />
            }
            label={'Pre-selcted'}
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
            onClick={() => {
              setIsAdd({ open: false, row: {}, item: {} })
              formik.resetForm()
            }}
          >
            Cancel
          </LoadingButton>
        </Footer>
      </Drawer>
    </>
  )
}

export default AddEditSize
