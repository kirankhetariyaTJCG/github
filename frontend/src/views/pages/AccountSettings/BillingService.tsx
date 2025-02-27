// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import BillingAddress from './BillingAddress'
import BillingHistory from './BillingHistory'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

type DataType = {
  cardNumber?: string
  name?: string
  expiryDate?: string
  cardCvv?: string
  imgSrc?: string
  imgAlt?: string
  cardStatus?: string
}

// Vars
const data: DataType[] = [
  {
    cardCvv: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: '/images/mastercard.png'
  },
  {
    cardCvv: '681',
    name: 'Mildred Wagner',
    expiryDate: '02/24',
    imgAlt: 'Visa card',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/visa.png'
  },
  {
    cardCvv: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: '/images/mastercard.png'
  },
  {
    cardCvv: '681',
    name: 'Mildred Wagner',
    expiryDate: '02/24',
    imgAlt: 'Visa card',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/visa.png'
  }
]

interface Values {
  name: string
  card_no: string
  expiry_date: string
  cvv: string
  mobile_no: string
}

const PaymentMethod = () => {
  const values: Values = { name: '', card_no: '', expiry_date: '', cvv: '', mobile_no: '' }

  const schema = yup.object().shape({
    name: yup.string().required(ErrorConstants.CARD_HOLDER_ERROR),
    card_no: yup.string().required(ErrorConstants.CARD_NO_ERROR),
    cvv: yup.string().required(ErrorConstants.CVV_ERROR),
    expiry_date: yup.string().required(ErrorConstants.EXPIRY_DATE_ERROR),
    mobile_no: yup.string().required(ErrorConstants.MOBILE_NO_ERROR)
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Values) => console.log('Values _.', value)
  })

  const PaymentMethod = () => {
    return (
      <Box sx={{ m: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px', height: '100%' }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            py: 3,
            pl: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          Payment Method
        </Typography>
        <Grid container spacing={6} sx={{ p: 4 }}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 500, fontSize: '1.1rem' }}>Card Details</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Name'
                  placeholder='Enter Name'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon icon={'lets-icons:user-box'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Card Number'
                  placeholder='Enter Card Number'
                  name='card_no'
                  value={formik.values.card_no}
                  onChange={(e: any) => {
                    formik.setFieldValue(
                      'card_no',
                      e.target.value
                        .replace(/\D/g, '')
                        .slice(0, 16)
                        .replace(/(\d{4})(?=\d)/g, '$1 ')
                    )
                  }}
                  error={formik.touched.card_no && Boolean(formik.errors.card_no)}
                  helperText={formik.touched.card_no && formik.errors.card_no}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon icon={'gg:credit-card'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Expiry Date'
                  placeholder='MM/YY'
                  name='expiry_date'
                  value={formik.values.expiry_date}
                  onChange={(e: any) => {
                    e.target.value = e.target.value.replace(/\D/g, '')

                    if (e.target.value.length > 2) {
                      e.target.value = `${e.target.value.slice(0, 2)}/${e.target.value.slice(2, 4)}`
                    }

                    formik.setFieldValue('expiry_date', e.target.value)
                  }}
                  error={formik.touched.expiry_date && Boolean(formik.errors.expiry_date)}
                  helperText={formik.touched.expiry_date && formik.errors.expiry_date}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon icon={'gg:credit-card'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='CVV'
                  placeholder='Enter CVV Code'
                  sx={{ mb: 4 }}
                  name='cvv'
                  value={formik.values.cvv}
                  onChange={(e: any) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 3)
                    formik.handleChange(e)
                  }}
                  error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                  helperText={formik.touched.cvv && formik.errors.cvv}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon icon={'gg:credit-card'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} className='flex gap-4 flex-wrap'>
                <Button variant='contained' onClick={() => formik.handleSubmit()}>
                  Save Changes
                </Button>
                <Button type='reset' variant='outlined' color='secondary' onClick={() => formik.resetForm()}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 500, fontSize: '1.1rem', pb: 2 }}>My Cards</Typography>
            </Grid>
            <Box sx={{ overflow: 'auto', height: 'calc(100vh - 18.5rem)', pr: 4 }}>
              {Array.isArray(data) &&
                data?.length > 0 &&
                data.map((item: DataType, index: number) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        p: 4,
                        borderRadius: '8px',
                        bgcolor: theme => theme.palette.customColors.bodyBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 4
                      }}
                    >
                      <Box>
                        <Box component={'img'} src={item.imgSrc} alt={item.imgAlt} sx={{ blockSize: '1.5rem' }} />
                        <Box className='flex items-center gap-4'>
                          <Typography className='font-medium' color='text.primary'>
                            {item.name}
                          </Typography>
                          {item.cardStatus ? (
                            <Chip variant='tonal' color={'primary'} label={item.cardStatus} size='small' />
                          ) : null}
                        </Box>
                        <Typography>
                          {item.cardNumber &&
                            item.cardNumber.slice(0, -4).replace(/[0-9]/g, '*') + item.cardNumber.slice(-4)}
                        </Typography>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Button variant='outlined' color='info' size='small'>
                            Edit
                          </Button>
                          <Button variant='outlined' color='error' size='small'>
                            Delete
                          </Button>
                        </Box>
                        <Typography sx={{ mt: 2 }}>Card expires at {item.expiryDate}</Typography>
                      </Box>
                    </Box>
                  )
                })}
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }

  const [value, setValue] = useState<number>(0)
  const arr = [
    {
      label: 'Payment Method',
      icon: 'mdi:account-payment-outline',
      component: <PaymentMethod />
    },
    {
      label: 'Billing Address',
      icon: 'fluent:document-lock-16-regular',
      component: <BillingAddress />
    },
    {
      label: 'Billing History',
      icon: 'mdi:file-clock-outline',
      component: <BillingHistory />
    }
  ]

  return (
    <Box sx={{ overflow: 'auto', height: 'calc(100vh - 9.5rem)' }}>
      <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
        <Box sx={{ width: 'max-content', py: 4, pr: 4, height: '100%' }}>
          {Array.isArray(arr) &&
            arr?.length > 0 &&
            arr?.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                    borderLeft: theme => (index === value ? `3px solid ${theme.palette.primary.main}` : 'none')
                  }}
                >
                  <Box
                    sx={{
                      py: 2,
                      pl: index === value ? '13px' : '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      width: '100%',
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px'
                    }}
                    onClick={() => setValue(index)}
                  >
                    <Box
                      component={Icon}
                      icon={item?.icon}
                      sx={{
                        color: theme => (index === value ? theme.palette.primary.main : theme.palette.text.primary),
                        fontSize: '1.25rem'
                      }}
                    />
                    <Typography
                      sx={{
                        color: theme => (index === value ? theme.palette.primary.main : theme.palette.text.primary),
                        width: 'max-content'
                      }}
                    >
                      {item?.label}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
        </Box>
        <Divider orientation='vertical' />
        <Box sx={{ width: '100%', height: 'calc(100% - 2rem)' }}>{arr[value]?.component}</Box>
      </Box>
    </Box>
  )
}

export default PaymentMethod
