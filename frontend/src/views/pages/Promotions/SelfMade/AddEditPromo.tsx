// React Imports
import { useState, useEffect, useMemo } from 'react'

// MUI Imports
import type { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Box, Typography, IconButton, LoadingButton, Drawer, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

// Custom Imports
import ChangeImage from './ChangeImage'
import DealType from './DealType'
import Step1 from './Steps/Step1'
import PromoType from './PromoType'
import Step3, { zones } from './Steps/Step3'

// Store Imports
import { addSelfMade, editSelfMade } from '@/redux-store/SelfMade/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import UrlHelper from '@/Helper/Url'

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

export interface Step2Values {
  max_discount: number
  is_minimum: boolean
  usage_maximum: number
  items: any[]
  other_items: any[]
  items_discount: number
  other_items_discount: number
  expensive_item_discount: number
  cheapest_item_discount: number
  charges: number
  discount_type: number
}

export interface Step3Values {
  client_type: number
  order_type: number
  custom_selection: any
  is_selected_delivery_zone: boolean
  selected_delivery_zones: any[]
  selected_payment_method: boolean
  once_per_client: boolean
  mark_promo_as: number
  display_time: number
  is_coupon: boolean
  custom_coupon: string | null
  order_time: number
  fulfillment_time: number
  highlight: number
  cart_value: number
  limited_type: number
  fulfillment_limited_type: number
  fulfillment_days: any[]
  display_time_days: any[]
  start_date: any
  end_date: any
  is_stock_limit: boolean
  limited_stock: number
  eligible_payment_methods: number[]
}

const AddEditPromo = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // State
  const [isChange, setIsChange] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<any>({})
  const [step, setStep] = useState<number>(1)

  // Hooks
  const loading = useSelector((state: any) => state.self_made.loading)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dealType = useSelector((state: any) => state.self_made.deal_type)
  const dispatch = useDispatch()

  useEffect(() => {
    !loading && handleClose()
  }, [loading])

  useEffect(() => {
    if (Object.keys(row)?.length > 0) {
      setStep(1)
      setActiveItem(dealType?.find((item: any) => item?.type === row?.type))
      // STEP 1
      step1Formik.setFieldValue('name', row?.name ?? '')
      step1Formik.setFieldValue('description', row?.description ?? '')
      step1Formik.setFieldValue('promotion_image', row?.promotion_image ?? null)

      // STEP 2
      step2Formik.setFieldValue('max_discount', row?.max_discount ?? 0)
      step2Formik.setFieldValue('is_minimum', AppUtils.checkValue(row?.usage_maximum) && row?.usage_maximum !== 0)
      step2Formik.setFieldValue('usage_maximum', row?.usage_maximum ?? 0)
      step2Formik.setFieldValue('items', row?.items ? row?.items : [])
      step2Formik.setFieldValue('other_items', row?.other_items ? row?.other_items : [])
      step2Formik.setFieldValue('items_discount', row?.items_discount ? row?.items_discount : 0)
      step2Formik.setFieldValue('other_items_discount', row?.other_items_discount ? row?.other_items_discount : 0)
      step2Formik.setFieldValue('expensive_item_discount', row?.expensive_item_discount ? row?.expensive_item_discount : 0)
      step2Formik.setFieldValue('cheapest_item_discount', row?.cheapest_item_discount ? row?.cheapest_item_discount : 0)
      step2Formik.setFieldValue('charges', row?.charges ? row?.charges : 1)
      step2Formik.setFieldValue('discount_type', row?.discount_type ? row?.discount_type : 1)

      // STEP 3
      step3Formik.setFieldValue('client_type', row?.client_type ?? 1)
      step3Formik.setFieldValue('order_type', row?.order_type ?? 1)
      step3Formik.setFieldValue(
        'custom_selection',
        AppUtils.checkValue(row?.custom_selection) && row?.custom_selection?.length > 0
          ? row.custom_selection.map((_: any, index: number) => ({ label: zones[index]?.label, value: zones[index]?.value }))
          : []
      )
      step3Formik.setFieldValue('selected_payment_method', AppUtils.checkValue(row?.eligible_payment_methods))
      step3Formik.setFieldValue('eligible_payment_methods', row?.eligible_payment_methods ? row?.eligible_payment_methods : [])
      step3Formik.setFieldValue('once_per_client', row?.once_per_client)
      step3Formik.setFieldValue('mark_promo_as', row?.mark_promo_as ? row?.mark_promo_as : 1)
      step3Formik.setFieldValue('display_time', row?.display_time ? row?.display_time : 1)
      step3Formik.setFieldValue('is_coupon', AppUtils.checkValue(row?.custom_coupon))
      step3Formik.setFieldValue('custom_coupon', row?.custom_coupon ? row?.custom_coupon : null)
      step3Formik.setFieldValue('order_time', row?.order_time ? row?.order_time : 1)
      step3Formik.setFieldValue('fulfillment_time', row?.fulfillment_time ? row?.fulfillment_time : 1)
      step3Formik.setFieldValue('highlight', row?.highlight)
      step3Formik.setFieldValue('cart_value', row?.cart_value ? row?.cart_value : 0)
      step3Formik.setFieldValue('start_date', row?.start_date ? moment.unix(row?.start_date).toDate() : null)
      step3Formik.setFieldValue('end_date', row?.end_date ? moment.unix(row?.end_date).toDate() : null)
      step3Formik.setFieldValue('limited_type', AppUtils.checkValue(row?.display_time_days) ? 1 : 2)
      step3Formik.setFieldValue('fulfillment_days', row?.fulfillment_days ? JSON.parse(row?.fulfillment_days) : [])
      step3Formik.setFieldValue('display_time_days', row?.display_time_days ? JSON.parse(row?.display_time_days) : [])
      step3Formik.setFieldValue('is_stock_limit', AppUtils.checkValue(row?.limited_stock))
      step3Formik.setFieldValue('limited_stock', row?.limited_stock ? row?.limited_stock : 0)
      step3Formik.setFieldValue('fulfillment_limited_type', AppUtils.checkValue(row?.fulfillment_days) ? 1 : 2)
    }
  }, [row])

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    setActiveItem({})
    step1Formik.resetForm()
    step2Formik.resetForm()
    step3Formik.resetForm()
    setIsChange(false)
    setStep(1)
  }

  const step1Schema = yup.object().shape({
    name: yup.string().required(ErrorConstants.HEADLINE_ERROR)
  })

  const step2Schema = yup.object().shape({
    max_discount: yup.number().test('validate-max-discount', ErrorConstants.DISCOUNT_ERROR, (val) => {
      const type = activeItem?.type;
      return type !== 1 || AppUtils.checkValue(val);
    }),
    items: yup
      .array()
      .test('validate-items', ErrorConstants.MINIMUM_ITEMS_ERROR, (value) => {
        const type = activeItem?.type;
        return (type !== 2 && type !== 4) || (value && value.length >= 1);
      }),
    other_items: yup
      .array()
      .test('validate-other-items', ErrorConstants.MINIMUM_ITEMS_ERROR, (value) => {
        const type = activeItem?.type;
        return type !== 4 || (value && value.length >= 1);
      }),
  })

  const step1Formik = useFormik({
    initialValues: { name: '', description: '', promotion_image: null },
    validationSchema: step1Schema,
    onSubmit: (values: { name: string; description: string; promotion_image: any }) => {
      setStep(step + 1)
    }
  })

  const step2Values: Step2Values = {
    max_discount: 0,
    is_minimum: false,
    usage_maximum: 0,
    items: [],
    other_items: [],
    items_discount: 0,
    other_items_discount: 0,
    expensive_item_discount: 0,
    cheapest_item_discount: 0,
    charges: 1,
    discount_type: 1,
  }

  const step2Formik = useFormik({
    initialValues: step2Values,
    validationSchema: step2Schema,
    onSubmit: (values: Step2Values) => setStep(step + 1)
  })

  const step3Values: Step3Values = {
    client_type: 1,
    order_type: 1,
    is_selected_delivery_zone: false,
    selected_delivery_zones: [],
    custom_selection: [],
    once_per_client: false,
    mark_promo_as: 1,
    display_time: 1,
    is_coupon: false,
    custom_coupon: null,
    order_time: 1,
    fulfillment_time: 1,
    highlight: 1,
    cart_value: 0,
    limited_type: 1,
    fulfillment_days: [],
    display_time_days: [],
    start_date: null,
    end_date: null,
    is_stock_limit: false,
    limited_stock: 0,
    eligible_payment_methods: [],
    fulfillment_limited_type: 1,
    selected_payment_method: false
  }

  const step3Schema = yup.object().shape({
    is_coupon: yup.boolean(),
    custom_coupon: yup
      .mixed()
      .nullable()
      .test('custom-coupon-validation', ErrorConstants.COUPON_ERROR, function (val: any) {
        const is_coupon = this.parent.is_coupon
        if (is_coupon) {
          if (!val || val.length < 4 || val.length > 20) {
            return this.createError({
              message: 'Coupon code must be between 4 and 20 characters',
            })
          }
        }
        return true
      })
  })

  const step3Formik = useFormik({
    initialValues: step3Values,
    validationSchema: step3Schema,
    onSubmit: (values: Step3Values) => {
      const payload = {
        menu_id: restaurant?.menu_id,
        restaurant_id: restaurant?._id,
        ...step1Formik?.values,
        ...step2Formik?.values,
        custom_coupon: values.custom_coupon,
        type: activeItem?.type,
        client_type: values?.client_type,
        order_type: values.order_type,
        custom_selection: values.custom_selection?.map((item: any) => item?.value),
        is_selected_delivery_zone: values.is_selected_delivery_zone,
        selected_delivery_zones: values.selected_delivery_zones,
        once_per_client: values.once_per_client,
        mark_promo_as: values.mark_promo_as,
        display_time: values.display_time,
        fulfillment_days: JSON.stringify(values.fulfillment_days),
        display_time_days: JSON.stringify(values.display_time_days),
        order_time: values.order_time,
        fulfillment_time: values.fulfillment_time,
        cart_value: values.cart_value,
        eligible_payment_methods: values.eligible_payment_methods,
        highlight: values.highlight,
        start_date: values.start_date ? moment(values.start_date).unix() : null,
        end_date: values.end_date ? moment(values.end_date).unix() : null,
        limited_stock: values.limited_stock
      }
      Object.keys(row)?.length > 0
        ? dispatch(editSelfMade({ ...payload, id: row?._id }))
        : dispatch(addSelfMade(payload))
    }
  })

  const promotionImageUrl = useMemo(() => {
    if (!AppUtils.checkValue(step1Formik.values.promotion_image)) {
      return '/images/Burger.jpg';
    } else if (typeof step1Formik.values.promotion_image == 'string') {
      return `${UrlHelper.imgPath}${step1Formik.values.promotion_image}`
    } else if (step1Formik.values.promotion_image instanceof Blob) {
      return URL.createObjectURL(step1Formik.values.promotion_image);
    }
    return step1Formik.values.promotion_image;
  }, [step1Formik.values.promotion_image]);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      handleClose()
    }
  }

  const handleNext = () => {
    if (step === 1) {
      step1Formik.handleSubmit()
    } else if (step === 2) {
      step2Formik.handleSubmit()
    } else {
      step3Formik.handleSubmit()
    }
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 900 } } }}
      >
        <Header>
          <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>
            {activeItem?.title ? activeItem?.title : 'Select Promotion Type'}
          </Typography>
          <IconButton onClick={handleClose} sx={{ fontSize: 25 }}>
            <Icon icon={'ic:round-close'} />
          </IconButton>
        </Header>
        <Box sx={{ p: 4, overflow: 'auto', height: '100%' }}>
          <Collapse in={Object.keys(row)?.length === 0 && Object?.keys(activeItem)?.length === 0}>
            <DealType
              setActiveItem={setActiveItem}
              setHeadline={(title: string) => step1Formik.setFieldValue('name', title)}
            />
          </Collapse>
          <Collapse in={Object.keys(row)?.length > 0 || Object?.keys(activeItem)?.length > 0}>
            <Box sx={{ height: '100%', width: '100%', display: 'flex', gap: 2 }}>
              <Box sx={{ width: '50%' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '15rem',
                    backgroundImage: `url(${promotionImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ p: 4 }}>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        mb: 2,
                        wordWrap: 'break-word',
                      }}
                    >
                      {step1Formik.values.name}
                    </Typography>
                    <Typography sx={{ color: '#fff', fontWeight: 500, wordWrap: 'break-word' }}>
                      {step1Formik.values.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      py: 1,
                      px: 2,
                      display: 'flex',
                      alignItems: 'center',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <Icon icon={'icon-park-outline:up-c'} fontSize={15} color='#fff' />
                    <Typography sx={{ ml: 1, fontWeight: 500, fontSize: '0.8rem', color: '#fff' }}>
                      Learn more (Deal applied automatically)
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: '50%', overflow: 'auto', height: 'calc(100vh - 10.8rem)', px: 4, pt: 2 }}>
                {step === 1 && <Step1 formik={step1Formik} setIsChange={setIsChange} />}
                {step === 2 && <PromoType promo_type={activeItem?.type} step2Formik={step2Formik} row={row} />}
                {step === 3 && <Step3 formik={step3Formik} />}
              </Box>
            </Box>
          </Collapse>
        </Box>
        {(Object.keys(row)?.length > 0 || Object.keys(activeItem)?.length > 0) &&
          <Footer>
            <LoadingButton
              size='large'
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              disabled={loading}
              onClick={handleBack}
            >
              Back
            </LoadingButton>
            <LoadingButton
              size='large'
              variant='contained'
              loading={loading}
              loadingPosition='start'
              startIcon={loading ? <>&nbsp;</> : <></>}
              onClick={handleNext}
            >
              {step === 3 ? 'Save' : 'Next'}
            </LoadingButton>
          </Footer>
        }
      </Drawer>

      {isChange && (
        <ChangeImage
          open={isChange}
          setOpen={setIsChange}
          setImage={(img: any) => step1Formik.setFieldValue('promotion_image', img)}
        />
      )}
    </>
  )
}

export default AddEditPromo
