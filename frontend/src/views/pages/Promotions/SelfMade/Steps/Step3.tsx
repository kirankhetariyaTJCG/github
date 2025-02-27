// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import {
  Box, Typography, Divider, LoadingButton, FormControlLabel, Radio, RadioGroup, Checkbox, TextField,
  FormHelperText, FormControl, InputLabel, InputAdornment, Collapse, MenuItem, Select, Button, ButtonGroup,
  IconButton,
  Grid
} from '@/Helper/MUIImports'

// Third Party Imports
import { FormikProps } from 'formik'
import { useSelector } from 'react-redux'
import moment from 'moment'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
import CsDatePicker from '@/@core/components/CsDatePicker'
import DaysTime from '../DaysTime'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { Step3Values } from '../AddEditPromo'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'

const client_type = [
  'Any client, new or returning',
  'Only New Clients',
  'Only Returning Clients'
]

const mark_promo_as = ['Not Exclusive', 'Exclusive', 'Mater Promo Deal']

const display_time = [
  'Always show to eligible clients',
  'Limited showtime',
  'Hide from menu (redeem with coupon code)'
]

const order_time = ['Any Time', 'Now (As soon as possible)', 'Order For Later']

const selected_payment_method = [
  { label: 'Cash', value: 1 },
  { label: 'Card to delivery person or at pickup counter', value: 2 },
  { label: "Call me back and I'll tell you my card details", value: 3 }
]

export const zones = [
  { label: 'Pickup', value: 'pickup' },
  { label: 'On Premise', value: 'on_premise' },
  { label: 'Delivery', value: 'delivery' },
]

const Step3 = (props: { formik: FormikProps<Step3Values> }) => {
  // Props
  const { formik } = props

  // State
  const [options, setOptions] = useState<any[]>(zones)
  const [isDays, setIsDays] = useState<{ open: boolean, row: any, type: keyof Step3Values }>({ open: false, row: {}, type: 'fulfillment_days' })

  // Hooks
  const deliveryZones = useSelector((state: any) => state.delivery.deliveryZones)

  useEffect(() => {
    if (AppUtils.checkValue(deliveryZones) && deliveryZones?.length === 0) {
      setOptions(options?.filter((item) => item?.value !== 'delivery'))
    }
  }, [deliveryZones])

  const formatDays = (days: string[]) => {
    const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    days.sort((a, b) => orderedDays.indexOf(a) - orderedDays.indexOf(b));

    let ranges: string[] = [];
    let currentRange: string[] = [days[0]];

    for (let i = 1; i < days.length; i++) {
      const prevIndex = orderedDays.indexOf(days[i - 1]);
      const currIndex = orderedDays.indexOf(days[i]);

      if (currIndex === prevIndex + 1) {
        currentRange.push(days[i]);
      } else {
        // Push the current range if it's a break in the sequence
        if (currentRange.length > 1) {
          ranges.push(`${currentRange[0]}-${currentRange[currentRange.length - 1]}`);
        } else {
          ranges.push(currentRange[0]);
        }
        currentRange = [days[i]]; // Start a new range
      }
    }

    // Push the last range
    if (currentRange.length > 1) {
      ranges.push(`${currentRange[0]}-${currentRange[currentRange.length - 1]}`);
    } else {
      ranges.push(currentRange[0]);
    }

    return ranges.join(', ');
  };

  const displayDays = (day: any, index: number, type: keyof Step3Values) => {
    return (
      <Grid
        container
        key={index}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          mb: 4,
          borderRadius: '8px',
          border: theme => `1px solid ${theme.palette.divider}`
        }}>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'start' }}>
          <Typography sx={{ wordBreak: 'break-word', fontSize: '0.8rem' }}>{formatDays(day?.days.map((d: any) => d.slice(0, 3)))}</Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '0.8rem' }}>
            {moment(day?.start_time).format('HH:mm')} - {moment(day?.end_time).format('HH:mm')}
          </Typography>

        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton sx={{ p: 1, fontSize: 18 }} onClick={() => setIsDays({ open: true, row: day, type: type })}>
            <Icon icon={'bx:edit'} />
          </IconButton>
          <IconButton sx={{ p: 1, fontSize: 18 }} onClick={() => formik.setFieldValue(type, formik.values.display_time_days?.filter((item: any) => item?._id !== day?._id))}>
            <Icon icon={'mi:delete'} />
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <Box>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <InputLabel>Client Type</InputLabel>
          <Select
            label='Client Type'
            name='client_type'
            value={formik.values.client_type}
            onChange={(e: any) => formik.setFieldValue('client_type', e.target.value)}
            error={formik.touched.client_type && Boolean(formik.errors.client_type)}
            MenuProps={{ style: { maxHeight: 250 } }}
          >
            {Array.isArray(client_type) &&
              client_type?.length > 0 &&
              client_type?.map((item: any, index: number) => {
                return (
                  <MenuItem key={index} value={index + 1}>
                    {item}
                  </MenuItem>
                )
              })}
          </Select>
          {formik.touched.client_type && Boolean(formik.errors.client_type) && (
            <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
              {formik.touched.client_type && formik.errors.client_type}
            </FormHelperText>
          )}
        </FormControl>
        <Divider sx={{ mb: 4 }} />
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Order Type</Typography>
          <RadioGroup
            value={formik.values.order_type}
            onChange={(e: any) => formik.setFieldValue('order_type', Number(e.target.value))}
            sx={{ mb: 4 }}
          >
            <FormControlLabel value={1} control={<Radio />} label='Any Type' />
            <FormControlLabel value={2} control={<Radio />} label='Custom Selection' />
            <Collapse in={formik.values.order_type === 2}>
              <CsAutocomplete
                sx={{ mt: 2 }}
                options={options}
                isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
                multiple={true}
                getOptionLabel={(option: any) => option?.label || ''}
                value={formik.values.custom_selection}
                onChange={(e: any, value: any) => formik.setFieldValue('custom_selection', value)}
                label={'Custom Selection'}
                error={formik.touched.custom_selection && Boolean(formik.errors.custom_selection)}
                helperText={formik.touched.custom_selection && formik.errors.custom_selection}
              />
              <Collapse in={formik.values.custom_selection.some((option: any) => option.value === 'delivery')}>
                <FormControlLabel
                  sx={{ mt: 2 }}
                  control={<Checkbox
                    checked={formik.values.is_selected_delivery_zone}
                    onChange={e => {
                      formik.setFieldValue('is_selected_delivery_zone', e.target.checked)
                      formik.setFieldValue('selected_delivery_zones',
                        formik.values.selected_delivery_zones?.map(item => { return { ...item, checked: e.target.checked } }))
                    }}
                  />
                  }
                  label='Only for selected delivery zones'
                />
                <Collapse in={formik.values.is_selected_delivery_zone} sx={{ pl: 6 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {Array.isArray(deliveryZones) &&
                      deliveryZones?.length > 0 &&
                      deliveryZones?.map((zone, index: number) => {
                        const isChecked = formik.values.selected_delivery_zones.includes(zone?._id)
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={isChecked}
                                onChange={() => {
                                  formik.setFieldValue('selected_delivery_zones',
                                    isChecked
                                      ? formik.values.eligible_payment_methods.filter((value) => value !== zone?._id)
                                      : [...formik.values.eligible_payment_methods, zone?._id]
                                  )
                                }}
                              />
                            }
                            label={zone?.label}
                          />
                        )
                      })
                    }
                  </Box>
                </Collapse>
              </Collapse>
            </Collapse>
          </RadioGroup>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.selected_payment_method}
                onChange={() => {
                  formik.setFieldValue('selected_payment_method', !formik.values.selected_payment_method)
                }}
              />
            }
            label={'Only for selected payment methods'}
          />
          <Collapse in={formik.values.selected_payment_method} sx={{ ml: 4 }}>
            <Box>
              {Array.isArray(selected_payment_method) && selected_payment_method.length > 0 &&
                selected_payment_method.map((method, index: number) => {
                  const isChecked = formik.values.eligible_payment_methods.includes(method.value)

                  return (
                    <Box key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked}
                            onChange={() => {
                              formik.setFieldValue('eligible_payment_methods',
                                isChecked
                                  ? formik.values.eligible_payment_methods.filter((value) => value !== method.value)
                                  : [...formik.values.eligible_payment_methods, method.value]
                              )
                            }}
                          />
                        }
                        label={method?.label}
                      />
                    </Box>
                  );
                })
              }
            </Box>
          </Collapse>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.once_per_client}
                onChange={() => formik.setFieldValue('once_per_client', !formik.values.once_per_client)}
              />
            }
            label='Only once per client'
          />
        </Box>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <InputLabel>Mark Promo as</InputLabel>
          <Select
            label='Mark Promo as'
            name='mark_promo_as'
            value={formik.values.mark_promo_as}
            onChange={(e: any) => formik.setFieldValue('mark_promo_as', Number(e.target.value))}
            error={formik.touched.mark_promo_as && Boolean(formik.errors.mark_promo_as)}
            MenuProps={{ style: { maxHeight: 250 } }}
          >
            {Array.isArray(mark_promo_as) &&
              mark_promo_as?.length > 0 &&
              mark_promo_as?.map((item: any, index: number) => {
                return (
                  <MenuItem key={index} value={index + 1}>
                    {item}
                  </MenuItem>
                )
              })}
          </Select>
          {formik.touched.mark_promo_as && Boolean(formik.errors.mark_promo_as) && (
            <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
              {formik.touched.mark_promo_as && formik.errors.mark_promo_as}
            </FormHelperText>
          )}
        </FormControl>
        <Box>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel>Display Time</InputLabel>
            <Select
              label='Display Time'
              name='display_time'
              value={formik.values.display_time}
              onChange={(e: any) => formik.setFieldValue('display_time', Number(e.target.value))}
              error={formik.touched.display_time && Boolean(formik.errors.display_time)}
              MenuProps={{ style: { maxHeight: 250 } }}
            >
              {Array.isArray(display_time) &&
                display_time?.length > 0 &&
                display_time?.map((item: any, index: number) => {
                  return (
                    <MenuItem key={index} value={index + 1}>
                      {item}
                    </MenuItem>
                  )
                })}
            </Select>
            {formik.touched.display_time && Boolean(formik.errors.display_time) && (
              <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                {formik.touched.display_time && formik.errors.display_time}
              </FormHelperText>
            )}
          </FormControl>
          <Collapse in={formik.values.display_time === 2}>
            <ButtonGroup fullWidth>
              <Button
                variant={formik.values.limited_type === 1 ? 'contained' : 'outlined'}
                onClick={() => formik.setFieldValue('limited_type', 1)}
              >
                Days & Time
              </Button>
              <Button
                variant={formik.values.limited_type === 2 ? 'contained' : 'outlined'}
                onClick={() => formik.setFieldValue('limited_type', 2)}
              >
                Available Time
              </Button>
            </ButtonGroup>
            <Collapse in={formik.values.limited_type === 1}>
              <Box sx={{ mt: 2 }}>
                {Array.isArray(formik.values.display_time_days) && formik.values.display_time_days?.length > 0 &&
                  formik.values.display_time_days?.map((day, index) => displayDays(day, index, 'display_time_days'))
                }
              </Box>
              <LoadingButton
                sx={{ my: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setIsDays({ open: true, row: {}, type: 'display_time_days' })}
              >
                Add Days & Time
              </LoadingButton>
            </Collapse>
            <Collapse in={formik.values.limited_type === 2}>
              <CsDatePicker
                sx={{ my: 4 }}
                label={'Select Start Date'}
                placeholderText='Select Start Date'
                name='start_date'
                selected={formik.values.start_date}
                onChange={(date: any) => formik.setFieldValue('start_date', date)}
                error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                helperText={formik.touched.start_date && formik.errors.start_date}
              />
              <CsDatePicker
                sx={{ mb: 4 }}
                label={'Select End Date'}
                placeholderText='Select End date'
                minDate={formik.values.start_date}
                name='end_date'
                selected={formik.values.end_date}
                onChange={(date: any) => formik.setFieldValue('end_date', date)}
                error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                helperText={formik.touched.end_date && formik.errors.end_date}
              />
            </Collapse>
          </Collapse>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.is_coupon}
                onChange={() => formik.setFieldValue('is_coupon', !formik.values.is_coupon)}
              />
            }
            label='Use custom coupon code'
          />
          <Collapse in={formik.values.is_coupon}>
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label={'Custom Coupon Code'}
              placeholder='Enter Custom Coupon Code'
              name='custom_coupon'
              value={formik.values.custom_coupon}
              onChange={formik.handleChange}
              error={formik.touched.custom_coupon && Boolean(formik.errors.custom_coupon)}
              helperText={formik.touched.custom_coupon && formik.errors.custom_coupon}
              inputProps={{ maxLength: 20 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography>{formik.values.custom_coupon?.length}/20</Typography>
                  </InputAdornment>
                )
              }}
            />
          </Collapse>
        </Box>
        <Box>
          <Divider sx={{ mt: 2, fontWeight: 500, mb: 0 }}>Advanced Settings</Divider>
          <Box sx={{ mt: 2, mb: 4 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_stock_limit}
                  onChange={e => {
                    formik.setFieldValue('is_stock_limit', e.target.checked)
                    !e.target.checked && formik.setFieldValue('limited_stock', 0)
                  }}
                />
              }
              label='Limited Stock'
            />
            <Collapse in={formik.values.is_stock_limit}>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label={'Stock Limit'}
                  placeholder='Enter Stock Limit'
                  name='limited_stock'
                  value={formik.values.limited_stock}
                  onChange={e => formik.setFieldValue('limited_stock', Number(e.target.value.replace(Constants.NO_REGEX, '')))}
                  error={formik.touched.limited_stock && Boolean(formik.errors.limited_stock)}
                  helperText={formik.touched.limited_stock && formik.errors.limited_stock}
                />
              </Box>
            </Collapse>
          </Box>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel>Order Time</InputLabel>
            <Select
              label='Order Time'
              name='order_time'
              value={formik.values.order_time}
              onChange={(e: any) => formik.setFieldValue('order_time', e.target.value)}
              error={formik.touched.order_time && Boolean(formik.errors.order_time)}
              MenuProps={{ style: { maxHeight: 250 } }}
            >
              {Array.isArray(order_time) &&
                order_time?.length > 0 &&
                order_time?.map((item: any, index: number) => {
                  return (
                    <MenuItem key={index} value={Number(index + 1)}>
                      {item}
                    </MenuItem>
                  )
                })}
            </Select>
            {formik.touched.order_time && Boolean(formik.errors.order_time) && (
              <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                {formik.touched.order_time && formik.errors.order_time}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel>Fulfillment Time</InputLabel>
            <Select
              label='Fulfillment Time'
              name='fulfillment_time'
              value={formik.values.fulfillment_time}
              onChange={(e: any) => formik.setFieldValue('fulfillment_time', Number(e.target.value))}
              error={formik.touched.fulfillment_time && Boolean(formik.errors.fulfillment_time)}
              MenuProps={{ style: { maxHeight: 250 } }}
            >
              <MenuItem value={1}>Any Time</MenuItem>
              <MenuItem value={2}>Custom Selection</MenuItem>
            </Select>
            {formik.touched.fulfillment_time && Boolean(formik.errors.fulfillment_time) && (
              <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                {formik.touched.fulfillment_time && formik.errors.fulfillment_time}
              </FormHelperText>
            )}
          </FormControl>
          <Collapse in={formik.values.fulfillment_time === 2}>
            <ButtonGroup fullWidth>
              <Button
                variant={formik.values.fulfillment_limited_type === 1 ? 'contained' : 'outlined'}
                onClick={() => formik.setFieldValue('fulfillment_limited_type', 1)}
              >
                Days & Time
              </Button>
              <Button
                variant={formik.values.fulfillment_limited_type === 2 ? 'contained' : 'outlined'}
                onClick={() => formik.setFieldValue('fulfillment_limited_type', 2)}
              >
                Available Time
              </Button>
            </ButtonGroup>
            <Collapse in={formik.values.fulfillment_limited_type === 1}>
              <Box sx={{ mt: 2 }}>
                {Array.isArray(formik.values.fulfillment_days) && formik.values.fulfillment_days?.length > 0 &&
                  formik.values.fulfillment_days?.map((day, index: number) => displayDays(day, index, 'fulfillment_days'))
                }
              </Box>
              <LoadingButton
                sx={{ my: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setIsDays({ open: true, row: {}, type: 'fulfillment_days' })}
              >
                Add Days & Time
              </LoadingButton>
            </Collapse>
            <Collapse in={formik.values.fulfillment_limited_type === 2}>
              <CsDatePicker
                sx={{ my: 4 }}
                label={'Select Start Date'}
                name='start_date'
                placeholderText='Select Start Date'
                selected={formik.values.start_date}
                onChange={(date: any) => formik.setFieldValue('start_date', date)}
                error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                helperText={formik.touched.start_date && formik.errors.start_date}
              />
              <CsDatePicker
                sx={{ mb: 4 }}
                label={'Select End Date'}
                placeholderText='Select End Date'
                minDate={formik.values.end_date}
                name='end_date'
                selected={formik.values.end_date}
                onChange={(date: any) => formik.setFieldValue('end_date', date)}
                error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                helperText={formik.touched.end_date && formik.errors.end_date}
              />
            </Collapse>
          </Collapse>
          <Divider sx={{ mb: 4 }} />
          <Box>
            <Typography sx={{ fontWeight: 700 }}>Highlight Promo</Typography>
            <RadioGroup
              value={formik.values.highlight}
              onChange={(e: any) => formik.setFieldValue('highlight', Number(e.target.value))}
              sx={{ mb: 4 }}
            >
              <FormControlLabel value={1} control={<Radio />} label='No Highlight' />
              <FormControlLabel value={2} control={<Radio />} label='Custom selection' />
              <Collapse in={formik.values.highlight === 2}>
                <TextField
                  fullWidth
                  sx={{ mt: 3 }}
                  label={'Cart Value Exceeds'}
                  placeholder='Enter Cart Value Exceeds'
                  name='cart_value'
                  value={formik.values.cart_value}
                  onChange={e => formik.setFieldValue('cart_value', Number(e.target.value.replace(Constants.NO_REGEX, '')))}
                  error={formik.touched.cart_value && Boolean(formik.errors.cart_value)}
                  helperText={formik.touched.cart_value && formik.errors.cart_value}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>USD</InputAdornment>
                  }}
                />
              </Collapse>
            </RadioGroup>
          </Box>
        </Box>
      </Box>

      <DaysTime
        open={isDays?.open}
        setOpen={setIsDays}
        row={isDays?.row}
        handleSave={data => {
          formik.setFieldValue(isDays?.type,
            Object?.keys(isDays?.row)?.length > 0
              ? formik.values[isDays?.type]?.map((item: any) =>
                item?._id === isDays?.row?._id ? { ...item, ...data } : item
              )
              : [...formik.values[isDays?.type], { ...data, _id: AppUtils.randomId() }]
          );
        }}
      />
    </>
  )
}

export default Step3
