// React Imports
import { useEffect } from 'react'

// MUI Imports
import type { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Box, Typography, Drawer, IconButton, LoadingButton, Checkbox, FormControlLabel, TextField, InputAdornment, Tooltip } from '@/Helper/MUIImports'

// Third Party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Store Imoprts
import { addChoice, editChoice } from '@/redux-store/Addons/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import AppUtils from '@/Helper/AppUtils'

interface Value {
  choiceName: string
  price: string
  isSelected: boolean
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

const AddEditChoice = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // Hooks
  const addonData = useSelector((state: any) => state.addons.addons)
  const isLoading = useSelector((state: any) => state.addons.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading) {
      handleClose()
    }
  }, [isLoading])

  useEffect(() => {
    if (Object?.keys(row)?.length > 0) {
      formik.setFieldValue('choiceName', row?.name)
      formik.setFieldValue('addon', row?.addon_id ? addonData?.find((item: any) => item?._id === row?.addon_id) : null)
      formik.setFieldValue('price', row?.price)
      formik.setFieldValue('isSelected', row?.is_pre_selected)
    }
  }, [row])

  const values: Value = { choiceName: '', isSelected: false, price: '', addon: null }

  const schema = yup.object().shape({
    choiceName: yup.string().required(ErrorConstants.NAME_ERROR),
    price: yup.string().required(ErrorConstants.PRICE_ERROR),
    addon: yup.mixed().required(ErrorConstants.SELECT_ADDON_ERROR)
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      const payload = {
        addon_id: value?.addon?._id,
        name: value?.choiceName,
        price: Number(value?.price),
        is_pre_selected: value?.isSelected
      }
      Object.keys(row)?.length > 0
        ? dispatch(editChoice({ ...payload, id: row?._id, }))
        : dispatch(addChoice(payload))

    }
  })

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
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 350 } } }}
    >
      <Header>
        <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Choice
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 4, overflow: 'auto' }}>
        <CsAutocomplete
          sx={{ mb: 4 }}
          label='Select Addon'
          placeholder='Select Addon'
          options={addonData ?? []}
          multiple={false}
          getOptionLabel={(option: any) => option?.name || ''}
          value={formik.values.addon}
          onChange={(e: any, value: any) => formik.setFieldValue('addon', value)}
          error={formik.touched.addon && Boolean(formik.errors.addon)}
          helperText={formik.touched.addon && formik.errors.addon}
          isOptionEqualToValue={(option: any, value: any) => option._id === value._id}
        />
        <TextField
          sx={{ mb: 4 }}
          fullWidth
          label={'Choice Name'}
          placeholder='Enter Choice Name'
          name='choiceName'
          value={formik.values.choiceName}
          onChange={formik.handleChange}
          error={formik.touched.choiceName && Boolean(formik.errors.choiceName)}
          helperText={formik.touched.choiceName && formik.errors.choiceName}
          inputProps={{ maxLength: 80 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Typography>{formik.values.choiceName?.length} / 80</Typography>
              </InputAdornment>
            )
          }}
        />
        <TextField
          sx={{ mb: 4 }}
          fullWidth
          label={'Price'}
          placeholder='Enter Price'
          name='price'
          value={formik.values.price}
          onChange={(e: any) => formik.setFieldValue('price', AppUtils.parseNumber(e.target.value))}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.isSelected}
              onChange={() => formik.setFieldValue('isSelected', !formik.values.isSelected)}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Pre-selcet</Typography>
              <Tooltip
                title='This item will appear as pre-selected in the menu. E.g.: The majority of your customers tend to choose this item. You can "Pre-select" it as the default choice.'
                arrow
              >
                <IconButton size='small' sx={{ ml: 2 }}>
                  <Icon icon={'akar-icons:info'} />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
      </Box>
      <Footer>
        <LoadingButton
          size='large'
          sx={{ mt: { xs: 2.5, sm: 0 } }}
          variant='contained'
          loading={isLoading}
          loadingPosition='start'
          startIcon={isLoading ? <>&nbsp;</> : <></>}
          onClick={() => formik.handleSubmit()}
        >
          Save
        </LoadingButton>
        <LoadingButton
          size='large'
          sx={{ mb: { xs: 2.5, sm: 0 } }}
          variant='outlined'
          disabled={isLoading}
          onClick={handleClose}
        >
          Cancel
        </LoadingButton>
      </Footer>
    </Drawer>
  )
}

export default AddEditChoice
