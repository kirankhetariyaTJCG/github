// React Imports
import { useEffect } from 'react'

// MUI Imports
import type { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Box, Typography, Drawer, IconButton, LoadingButton, Checkbox, FormControlLabel, TextField, InputAdornment, Button, ButtonGroup, Collapse, Tooltip } from '@/Helper/MUIImports'

// Third Party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// Store Imports
import { addAddon, editAddon } from '@/redux-store/Addons/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Value {
  addonName: string
  choiceType: number
  minimum: number
  maximum: number
  multiple: boolean
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

const AddEditAddon = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // Hooks
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const isLoading = useSelector((state: any) => state.addons.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading) {
      handleClose()
    }
  }, [isLoading])

  useEffect(() => {
    if (Object?.keys(row)?.length > 0) {
      formik.setFieldValue('addonName', row?.name)
      formik.setFieldValue('minimum', row?.force_min)
      formik.setFieldValue('maximum', row?.force_max)
      formik.setFieldValue('multiple', row?.allow_quantity)
      formik.setFieldValue('choiceType', row?.is_optional ? 1 : 2)
    }
  }, [row])

  const values: Value = { addonName: '', choiceType: 1, minimum: 1, maximum: 1, multiple: false }

  const schema = yup.object().shape({
    addonName: yup.string().required(ErrorConstants.NAME_ERROR),
    minimum: yup.string().test((value: any, context: any) => {
      const type = context.parent.choiceType
      if (type === 2 && !AppUtils.checkValue(value)) {
        return context.createError({ message: ErrorConstants.MINIMUM_ERROR })
      } else return true
    }),
    maximum: yup.string().test((value: any, context: any) => {
      const type = context.parent.choiceType
      if (type === 2 && !AppUtils.checkValue(value)) {
        return context.createError({ message: ErrorConstants.MAXIMUM_ERROR })
      } else return true
    })
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      const data = {
        name: value?.addonName,
        menu_id: restaurant?.menu_id,
        is_optional: value?.choiceType === 1,
        allow_quantity: value?.multiple,
        force_min: Number(value?.minimum),
        force_max: Number(value?.maximum)
      }
      Object?.keys(row)?.length > 0
        ? dispatch(editAddon({ ...data, id: row?._id }))
        : dispatch(addAddon({ ...data }))
    }
  })

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    formik.resetForm()
  }

  const getInputProps = (title: string) => ({
    endAdornment: (
      <InputAdornment position='end'>
        <Tooltip title={title} arrow>
          <IconButton><Icon icon={'akar-icons:info'} /></IconButton>
        </Tooltip>
      </InputAdornment>
    ),
  });

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
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Addon
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 4, overflow: 'auto' }}>
        <TextField
          sx={{ mb: 4 }}
          fullWidth
          label={'Addon Name'}
          placeholder='Enter Addon Name'
          name='addonName'
          value={formik.values.addonName}
          onChange={formik.handleChange}
          error={formik.touched.addonName && Boolean(formik.errors.addonName)}
          helperText={formik.touched.addonName && formik.errors.addonName}
          inputProps={{ maxLength: 80 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Typography>{formik.values.addonName?.length} / 80</Typography>
              </InputAdornment>
            )
          }}
        />

        <ButtonGroup fullWidth sx={{ border: theme => `1px solid ${theme.palette.divider}`, mb: 2 }}>
          <Button
            sx={{ border: 'none !important' }}
            color='primary'
            variant={formik.values.choiceType === 1 ? 'contained' : 'outlined'}
            onClick={() => formik.setFieldValue('choiceType', 1)}
          >
            Optional
          </Button>
          <Button
            sx={{ border: 'none !important' }}
            color='primary'
            variant={formik.values.choiceType === 2 ? 'contained' : 'outlined'}
            onClick={() => formik.setFieldValue('choiceType', 2)}
          >
            Mandatory
          </Button>
        </ButtonGroup>
        <Collapse in={formik.values.choiceType === 2 || formik.values.maximum > 1 || formik.values.minimum > 1}>
          <Box sx={{ mb: 2, mt: 4 }}>
            <TextField
              sx={{ mb: 6 }}
              fullWidth
              label={'Force Minimum'}
              placeholder={'Enter Force Minimum Value'}
              name='minimum'
              value={formik.values.minimum}
              onChange={(e: any) => formik.setFieldValue('minimum', AppUtils.parseNumber(e.target.value))}
              error={formik.touched.minimum && Boolean(formik.errors.minimum)}
              helperText={formik.touched.minimum && formik.errors.minimum}
              InputProps={getInputProps('This forces your customer to select a certain minimum number of choices. E.g.: If you set this to 2 then your customer must select at least 2 items.')}
            />
            <TextField
              fullWidth
              name='maximum'
              label={'Force Maximum'}
              placeholder={'Enter Force Maximum Value'}
              value={formik.values.maximum}
              onChange={(e: any) => formik.setFieldValue('maximum', AppUtils.parseNumber(e.target.value))}
              error={formik.touched.maximum && Boolean(formik.errors.maximum)}
              helperText={formik.touched.maximum && formik.errors.maximum}
              InputProps={getInputProps('The maximum number of choices your customer can add. If you prefer not to set any limitation you can set it to 0. E.g.: If you set this to 4 then your customer can not select more than 4 choices.')}
            />
          </Box>
        </Collapse>
        <Collapse in={formik.values.choiceType === 1 || formik.values.minimum > 1 || formik.values.maximum > 1}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.multiple}
                  onChange={() => formik.setFieldValue('multiple', !formik.values.multiple)}
                />
              }
              label='Allow adding same choice multiple times'
            />
            <Tooltip
              title='If active, a client can select the same choice more than once. E.g.: You have a list of toppings and you want to allow a client to select multiple times the same topping.'
              arrow
              placement='left'
            >
              <IconButton>
                <Icon icon={'akar-icons:info'} />
              </IconButton>
            </Tooltip>
          </Box>
        </Collapse>
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

export default AddEditAddon
