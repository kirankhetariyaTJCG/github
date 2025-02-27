// React Imports
import { useEffect } from 'react'

// MUI Imports
import {
  Dialog, DialogTitle, DialogContent, DialogActions, LoadingButton, TextField, IconButton, Typography, Box,
  Collapse, FormControlLabel, Checkbox, Switch, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsDatePicker from '@/@core/components/CsDatePicker'

// Store Imports
import { addServiceFees, editServiceFees } from '@/redux-store/ServiceFee/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Value {
  fee_name: string
  charge: string
  charge_type: number
  is_tax: boolean
  apply: any
  apply_value: any
  week_days: any[]
  start_date: any
  end_date: any
  is_cash: boolean
  is_delivery_person: boolean
  is_card_details: boolean
  is_pickup: boolean
  is_premise: boolean
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const AddEditFee = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // Hooks
  const restaurant = useSelector((state: any) => state.restaurant.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
      formik.setFieldValue('fee_name', row?.fee_name ?? '')
      formik.setFieldValue('charge', row?.charge ?? 0)
      formik.setFieldValue('charge_type', row?.charge_type ?? 1)
      formik.setFieldValue('apply', row?.apply ?? 1)
      formik.setFieldValue('apply_value', row?.apply_value ?? 1)
      formik.setFieldValue('end_date', row?.end_date ?? '')
      formik.setFieldValue('start_date', row?.start_date ?? '')
      formik.setFieldValue('is_card_details', row?.is_card_details)
      formik.setFieldValue('is_cash', row?.is_cash)
      formik.setFieldValue('is_pickup', row?.is_pickup)
      formik.setFieldValue('is_delivery_person', row?.is_delivery_person)
      formik.setFieldValue('is_premise', row?.is_premise)
      formik.setFieldValue('is_tax', row?.is_tax)
      formik.setFieldValue('week_days', row?.week_days ?? [])
    }
  }, [row])

  const initialValues: Value = {
    fee_name: '',
    charge: '',
    charge_type: 1,
    apply: 1,
    apply_value: 1,
    end_date: null,
    start_date: null,
    is_card_details: false,
    is_cash: false,
    is_delivery_person: false,
    is_pickup: false,
    is_premise: false,
    is_tax: false,
    week_days: []
  }

  const schema = yup.object().shape({
    fee_name: yup.string().required(ErrorConstants.NAME_ERROR),
    charge: yup.string().required(ErrorConstants.SERVICE_CHARGE_ERROR)
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      const payload = {
        ...value,
        restaurant_id: restaurant?._id,
        start_date: moment(value?.start_date).valueOf(),
        end_date: moment(value?.end_date).valueOf()
      }
      Object.keys(row)?.length
        ? dispatch(editServiceFees({ ...payload, id: row?._id }))
        : dispatch(addServiceFees(payload))
      handleClose()
    }
  })

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
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          px: 4,
          py: 3
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          {Object?.keys(row)?.length > 0 ? 'Edit' : 'Add'} Fee
        </Typography>
        <IconButton onClick={() => setOpen({ open: false, row: {} })}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '40rem' } }}>
        <TextField
          sx={{ width: '100%', mb: 6 }}
          fullWidth
          label={'Service Fee'}
          placeholder='Enter Service Fee'
          name='fee_name'
          value={formik.values.fee_name}
          onChange={formik.handleChange}
          error={formik.touched.fee_name && Boolean(formik.errors.fee_name)}
          helperText={formik.touched.fee_name && formik.errors.fee_name}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, gap: 4 }}>
          <TextField
            fullWidth
            label={'Service Fee Charge'}
            placeholder='Enter Service Charge'
            name='charge'
            value={formik.values.charge}
            onChange={formik.handleChange}
            error={formik.touched.charge && Boolean(formik.errors.charge)}
            helperText={formik.touched.charge && formik.errors.charge}
          />
          <FormControl sx={{ width: { xs: '100%', sm: '50%' } }}>
            <InputLabel>Charge Type</InputLabel>
            <Select
              label='Charge Type'
              name='charge_type'
              value={formik.values.charge_type}
              onChange={(e: any) => formik.setFieldValue('charge_type', e.target.value)}
              error={formik.touched.charge_type && Boolean(formik.errors.charge_type)}
              MenuProps={{ style: { maxHeight: 250 } }}
            >
              <MenuItem value={1}>%</MenuItem>
              <MenuItem value={2}>$</MenuItem>
            </Select>
            {formik.touched.charge_type && Boolean(formik.errors.charge_type) && (
              <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                {formik.touched.charge_type && formik.errors.charge_type}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 500 }}>Subject to tax</Typography>
          <Switch
            checked={formik.values.is_tax}
            onChange={(e: any) => formik.setFieldValue('is_tax', e.target.checked)}
          />
        </Box>
        <Typography sx={{ mb: 2, fontWeight: 700 }}>Apply To:</Typography>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Select
            name='apply'
            value={formik.values.apply}
            onChange={(e: any) => formik.setFieldValue('apply', e.target.value)}
            error={formik.touched.apply && Boolean(formik.errors.apply)}
          >
            <MenuItem value={1}>Shopping cart value (sub-total)</MenuItem>
            <MenuItem value={2}>Total value of the order placed</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Select
            name='apply_value'
            value={formik.values.apply_value}
            onChange={(e: any) => formik.setFieldValue('apply_value', e.target.value)}
            error={formik.touched.apply_value && Boolean(formik.errors.apply_value)}
          >
            <MenuItem value={1}>All orders</MenuItem>
            <MenuItem value={2}>Orders with fulfillment on selected days</MenuItem>
            <MenuItem value={3}>Orders paid with selected payment methods</MenuItem>
            <MenuItem value={4}>Orders of selected type</MenuItem>
          </Select>
        </FormControl>
        <Collapse in={formik.values.apply_value === 2}>
          <Typography sx={{ fontWeight: 500, mt: 4 }}>These days of the week...</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            {Array.isArray(weekDays) &&
              weekDays?.length > 0 &&
              weekDays?.map((day: string, index: number) => {
                return (
                  <FormControlLabel
                    key={index}
                    sx={{ p: 2, m: 0 }}
                    control={
                      <Checkbox
                        checked={formik.values.week_days?.includes(day)}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "week_days", e.target.checked
                            ? [...formik.values.week_days, day]
                            : formik.values.week_days.filter((d) => d !== day)
                          )
                        }
                      />
                    }
                    label={day}
                  />
                )
              })}
          </Box>
          <Typography sx={{ fontWeight: 500, mb: 2 }}>These calendar dates...</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <CsDatePicker
              size='medium'
              label={'Select Start Date'}
              placeholderText='Select Start Date'
              name='start_date'
              selected={formik.values.start_date}
              onChange={(date: any) => formik.setFieldValue('start_date', date)}
              error={formik.touched.start_date && Boolean(formik.errors.start_date)}
              helperText={formik.touched.start_date && formik.errors.start_date}
            />
            <CsDatePicker
              size='medium'
              label={'Select End Date'}
              placeholderText='Select End Date'
              name='end_date'
              selected={formik.values.end_date}
              onChange={(date: any) => formik.setFieldValue('end_date', date)}
              error={formik.touched.end_date && Boolean(formik.errors.end_date)}
              helperText={formik.touched.end_date && formik.errors.end_date}
            />
          </Box>
        </Collapse>
        <Collapse in={formik.values.apply_value === 3}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_cash}
                  onChange={() => formik.setFieldValue('is_cash', !formik.values.is_cash)}
                />
              }
              label={'Cash'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_delivery_person}
                  onChange={() => formik.setFieldValue('is_delivery_person', !formik.values.is_delivery_person)}
                />
              }
              label={'Card to delivery person or at pickup counter'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_card_details}
                  onChange={() => formik.setFieldValue('is_card_details', !formik.values.is_card_details)}
                />
              }
              label={'Card to delivery person or at pickup counter'}
            />
          </Box>
        </Collapse>
        <Collapse in={formik.values.apply_value === 4}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_pickup}
                  onChange={() => formik.setFieldValue('is_pickup', !formik.values.is_pickup)}
                />
              }
              label={'Pick-up'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_premise}
                  onChange={() => formik.setFieldValue('is_premise', !formik.values.is_premise)}
                />
              }
              label={'On premise'}
            />
          </Box>
        </Collapse>
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          pt: '1rem !important',
          justifyContent: 'space-between'
        }}
      >
        <LoadingButton
          size='large'
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={handleClose}
        >
          Cancel
        </LoadingButton>
        <LoadingButton size='large' variant='contained' onClick={() => formik.handleSubmit()}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddEditFee
