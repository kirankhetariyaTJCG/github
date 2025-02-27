// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'
import {
  Box, LoadingButton, Typography, Card, IconButton, Drawer, TextField, RadioGroup, Radio, Collapse, FormControlLabel, Select, FormHelperText, Checkbox,
  FormControl,
  InputLabel,
  MenuItem
} from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import QRCode from 'react-qr-code'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
import SubTypeRanges from './SubTypeRanges'

// Store Imports
import { addQrFlyer, editQrFlyer } from '@/redux-store/QrFlyers/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import UrlHelper from '@/Helper/Url'

interface Ranges {
  min: number,
  max: number,
  prefix: string,
  is_char: boolean
}

interface Value {
  name: string
  titleType: any
  deliveryType: number
  customerName: string
  instruction: string
  subtypeRanges: Ranges[]
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

const AddEditQr = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // State
  const [isForm, setIsForm] = useState<boolean>(false)
  const [editRange, setEditRange] = useState<{ open: boolean, row: any }>({ open: false, row: {} })

  // Hooks
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const loading = useSelector((state: any) => state.qr_code.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    !loading && handleClose()
  }, [loading])

  const serviceTypes = [
    'Dine in',
    'Seat delivery',
    'Sunbeds',
    'Room service',
    'Suite delivery',
    'Other',
    'Pickup & consume here',
  ]

  const initialValues: Value = {
    name: '',
    titleType: null,
    deliveryType: 1,
    customerName: '',
    instruction: '',
    subtypeRanges: []
  }

  const schema = yup.object().shape({
    deliveryType: yup.number(),
    name: yup.string().test((val: any, context: any) => {
      if (isForm && !AppUtils.checkValue(val)) {
        return context.createError({ message: ErrorConstants.NAME_ERROR })
      } else return true
    }),
    titleType: yup
      .mixed()
      .nullable()
      .test((val: any, context: any) => {
        if (isForm && !AppUtils.checkValue(val)) {
          return context.createError({ message: ErrorConstants.TYPE_ERROR })
        } else return true
      }),
    customerName: yup.string().test((val: any, context: any) => {
      const service = context.parent.titleType
      if (service?.value === 6 && !AppUtils.checkValue(val)) {
        return context.createError({ message: ErrorConstants.NAME_ERROR })
      } else return true
    }),
    instruction: yup.string().test((val: any, context: any) => {
      const service = context.parent.titleType
      if (service?.value === 7 && isForm && !AppUtils.checkValue(val)) {
        return context.createError({ message: ErrorConstants.INSTRUNCTION_ERROR })
      } else return true
    }),
    subtypeRanges: yup.array()
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      const payload = {
        name: value?.name,
        title_type: value?.titleType,
        restaurant_id: restaurant?._id,
        dine_in_subtype_ranges: value?.deliveryType === 1
          ? [{ is_char: false, max: 0, min: 1, prefix: "" }]
          : value?.subtypeRanges?.map(({ _id, ...rest }: any) => rest),
        customer_name: value?.customerName,
        template_type: value?.deliveryType,
      }
      if (isForm) {
        Object.keys(row)?.length > 0
          ? dispatch(editQrFlyer({ ...payload, id: row?._id, is_qr_code: null }))
          : dispatch(addQrFlyer(payload))
      } else {
        setIsForm(true)
      }
    }
  })

  useEffect(() => {
    if (Object.keys(row)?.length > 0) {
      formik.setFieldValue('name', row?.name)
      formik.setFieldValue('deliveryType', row?.template_type)
      formik.setFieldValue('titleType', row?.title_type)
      formik.setFieldValue('customerName', row?.customer_name ?? '')
      if (row?.template_type === 1) {
        formik.setFieldValue('subtypeRanges', [])
      } else {
        formik.setFieldValue(
          'subtypeRanges',
          row?.dine_in_subtype_ranges?.map((item: any) => ({
            ...item,
            _id: AppUtils.randomId()
          })) || []
        )
      }
      formik.setFieldValue('instruction', row?.instruction ?? '')
      setIsForm(true)
    }
  }, [row])

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    formik.resetForm()
    setIsForm(false)
  }

  const handleSaveRange = (range: any) => {
    Object?.keys(editRange?.row)?.length > 0
      ? formik.setFieldValue('subtypeRanges', formik.values.subtypeRanges?.map((item: any) => item?._id === editRange?.row?._id ? { ...item, ...range } : item))
      : formik.setFieldValue('subtypeRanges', [...formik.values.subtypeRanges, { ...range, _id: AppUtils.randomId() }])
    setEditRange({ open: false, row: {} })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 800 } } }}
    >
      <Header>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          {AppUtils.checkValue(formik.values.titleType)
            ? `Customize QR code - ${formik.values.titleType.title}`
            : 'Qr Code'}
        </Typography>
        <IconButton onClick={handleClose} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </Header>
      <Box sx={{ p: 4, overflow: 'auto', height: '100%' }}>
        {!isForm && (
          <Box
            sx={{
              textAlign: 'center',
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <Box component={'img'} src='/images/KickStarter/Checkout.png' sx={{ width: 'auto', height: '23rem' }} />
            <Typography sx={{ fontWeight: 500, mt: 4 }}>
              The checkout will be customized to require specific details, like table number or room number.
            </Typography>
          </Box>
        )}
        {isForm && (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', gap: 4 }}>
            <Box sx={{ width: '50%' }}>
              <Card
                sx={{ p: 10, bgcolor: theme => theme.palette.primary.darkOpacity, width: 'max-content', mx: 'auto' }}
              >
                <QRCode
                  id='QR-Code'
                  value={UrlHelper.menuLink.replace('{id}', restaurant?._id)}
                  bgColor={'rgba(255, 87, 51, 0.1)'}
                  fgColor={'#000'}
                  size={150}
                />
              </Card>
            </Box>
            <Box sx={{ width: '50%' }}>
              <TextField
                sx={{ mb: 6 }}
                fullWidth
                label='QR Code Name'
                placeholder='Enter QR Code Name'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel>Select Service Type</InputLabel>
                <Select
                  label='Select Service Type'
                  name='titleType'
                  value={formik.values.titleType}
                  onChange={(e: any) => formik.setFieldValue('titleType', e.target.value)}
                  error={formik.touched.titleType && Boolean(formik.errors.titleType)}
                  MenuProps={{ style: { maxHeight: 250 } }}
                >
                  {Array.isArray(serviceTypes) &&
                    serviceTypes?.length > 0 &&
                    serviceTypes?.map((item: any, index: number) => {
                      return (
                        <MenuItem key={index} value={index + 1}>
                          {item}
                        </MenuItem>
                      )
                    })}
                </Select>
                {formik.touched.titleType && Boolean(formik.errors.titleType) && (
                  <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                    {String(formik.errors.titleType)}
                  </FormHelperText>
                )}
              </FormControl>
              {formik.values.titleType?.value !== 7 && (
                <>
                  {formik.values.titleType?.value === 6 && (
                    <TextField
                      sx={{ my: 4 }}
                      fullWidth
                      label='Customer Name'
                      placeholder='Enter Customer Name'
                      name='customerName'
                      value={formik.values.customerName}
                      onChange={formik.handleChange}
                      error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                      helperText={formik.touched.customerName && formik.errors.customerName}
                    />
                  )}
                  <RadioGroup
                    value={formik.values.deliveryType}
                    onChange={(e: any) => formik.setFieldValue('deliveryType', Number(e.target.value))}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label={`Same QR code for all ${formik.values.titleType?.value !== 4 && 'Suites'}`}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label={`Different QR codes ${formik.values.titleType?.value !== 4 && 'for each Suite'}`}
                    />
                  </RadioGroup>
                  <Collapse in={formik.values.deliveryType === 2}>

                    <Box
                      sx={{ mt: 2 }}
                    >
                      {!editRange?.open &&
                        <>
                          {Array.isArray(formik.values.subtypeRanges) && formik.values.subtypeRanges?.length > 0 &&
                            formik.values.subtypeRanges?.map((item: any, index: number) => {
                              return (
                                <Box
                                  key={index}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: 2,
                                    py: 1,
                                    mb: 2,
                                    border: theme => `2px solid ${theme.palette.divider}`,
                                    borderRadius: '8px'
                                  }}
                                >
                                  <Typography>{item?.prefix} {item?.min} - {item?.max}</Typography>
                                  <Box>
                                    <IconButton color='info' onClick={() => setEditRange({ open: true, row: item })}>
                                      <Icon icon={'bxs:edit'} />
                                    </IconButton>
                                    <IconButton color='error' onClick={() => formik.setFieldValue('subtypeRanges', formik.values.subtypeRanges?.filter((val: any) => val?._id !== item._id))}>
                                      <Icon icon={'material-symbols:delete-outline-rounded'} />
                                    </IconButton>
                                  </Box>
                                </Box>
                              )
                            })
                          }
                          <LoadingButton size='small' sx={{ mt: 2 }} onClick={() => setEditRange({ open: true, row: {} })}>
                            Add Values
                          </LoadingButton>
                        </>
                      }
                      {editRange?.open &&
                        <SubTypeRanges
                          row={editRange?.row}
                          handleSave={handleSaveRange}
                        />
                      }
                    </Box>
                  </Collapse>
                </>
              )}
              {formik.values.titleType?.value === 7 && (
                <Box>
                  <Box>
                    <FormControlLabel control={<Checkbox checked={true} />} label='Same QR code for all' />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      label='Instructions where order can be picked up'
                      name='instruction'
                      value={formik.values.instruction}
                      onChange={formik.handleChange}
                      error={formik.touched.instruction && Boolean(formik.errors.instruction)}
                      helperText={formik.touched.instruction && formik.errors.instruction}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
      <Footer>
        <LoadingButton
          size='large'
          disabled={loading}
          sx={{
            bgcolor: theme => theme.palette.primary.lightOpacity,
            width: { xs: '100%', sm: 'auto' },
            mb: { xs: 2.5, sm: 0 }
          }}
          onClick={() => {
            Object.keys(row)?.length > 0 ? handleClose() : isForm ? setIsForm(false) : handleClose()
          }}
        >
          {isForm ? 'Back' : 'Cancel'}
        </LoadingButton>

        <LoadingButton
          size='large'
          variant='contained'
          sx={{ width: { xs: '100%', sm: 'auto' }, ml: '0 !important', mt: { xs: 2.5, sm: 0 } }}
          onClick={() => formik.handleSubmit()}
          loading={loading}
          loadingPosition='start'
          startIcon={loading ? <>&nbsp;</> : <></>}
        >
          {!isForm ? 'Next' : 'Save'}
        </LoadingButton>
      </Footer>
    </Drawer>
  )
}

export default AddEditQr
