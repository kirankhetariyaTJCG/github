'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import {
  Box, Card, LoadingButton, Typography, IconButton, FormControl, InputLabel, MenuItem, Select, Collapse, Switch, TextField,
  InputAdornment
} from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import SetupDialog from './SetupDialog'

// Store Imports
import { editRestaurantDetail, getStripeDetails } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const providers = [
  { label: 'No Provider / Later', value: '1' },
  { label: 'Stripe', value: '2' },
  { label: 'Pay Pal', value: '3' },
]

const PaymentView = () => {
  // State
  const [step, setStep] = useState<number>(1)
  const [provider, setProvider] = useState<string>('1')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isView, setIsView] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<{ web_key: boolean, id: boolean, app_key: boolean }>({ web_key: false, id: false, app_key: false })
  const [stripe, setStripe] = useState<{ web_key: string, id: string, app_key: string }>({ web_key: '', id: '', app_key: '' })
  const cards = ['Visa.svg', 'Mastercard.svg', 'Amex.svg', 'Discover.svg']

  // Hooks
  const dispatch = useDispatch()
  const restaurant = useSelector((state: any) => state.restaurant.restaurant)
  const loading = useSelector((state: any) => state.restaurant.loading)

  const getData = async () => {
    const res = await getStripeDetails({ id: restaurant?._id }, dispatch)
    if (res?.success
      && res?.statusCode === 200
      && AppUtils.checkValue(res?.data?.web_key)
      && AppUtils.checkValue(res?.data?.web_account_id)
      && AppUtils.checkValue(res?.data?.app_key)) {
      setIsView(true)
      setStep(2)
      setProvider('2')
      setStripe({ web_key: AppUtils.decodeKey(res?.data?.web_key), id: res?.data?.web_account_id, app_key: AppUtils.decodeKey(res?.data?.app_key) })
    }
  }

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      getData()
    }
  }, [restaurant])

  const handleSave = () => {
    if (step === 1) {
      setStep(step + 1)
    } else {
      dispatch(editRestaurantDetail({
        data: {
          stripe_key: stripe?.web_key,
          stripe_frontend_key: stripe?.app_key,
          stripe_accountId: stripe?.id,
          id: restaurant?._id
        },
        old_restaurant_data: restaurant
      }))
    }
  }

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ width: '35rem' }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {step > 1 && (
                <IconButton
                  color='primary'
                  sx={{ mr: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                  onClick={() => setStep(step - 1)}
                >
                  <Icon icon={'ion:arrow-back-outline'} />
                </IconButton>
              )}
              <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Online Payment</Typography>
            </Box>
            <LoadingButton
              variant='contained'
              sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
              onClick={handleSave}
              loading={loading}
              loadingPosition='start'
              startIcon={<Icon icon={'material-symbols:save-rounded'} />}
            >
              {step === 1 ? "Next" : 'Save'}
            </LoadingButton>
          </Box>
          <Box sx={{ p: 6, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
            {step === 1 &&
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: { xs: 'end', sm: 'center' },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column-reverse', sm: 'row' }
                  }}
                >
                  <Typography>Accept online payments, including credit cards.?</Typography>
                  <Switch checked={isView} onChange={() => setIsView(!isView)} />
                </Box>
                <Collapse in={isView}>
                  <Box sx={{ mt: 4, p: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px', mb: 4 }}>
                    <Typography sx={{ fontWeight: 700 }}>Debit / Credit cards:</Typography>
                    <Box sx={{ my: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {Array.isArray(cards) &&
                        cards?.length > 0 &&
                        cards?.map((item: string, index: number) => {
                          return (
                            <Box
                              component={'img'}
                              key={index}
                              src={`/images/Setup/${item}`}
                              sx={{ width: '5rem', height: '5rem', mt: { xs: 4, sm: 0 } }}
                            />
                          )
                        })}
                    </Box>
                  </Box>
                </Collapse>
              </>
            }
            {step === 2 &&
              <>
                <Typography sx={{ fontWeight: 500 }}>
                  To receive online payments you need a merchant account. Like a bank account where client payments accumulate.
                </Typography>
                <Box sx={{ p: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px', mt: 4 }}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <InputLabel>Provider</InputLabel>
                    <Select
                      label='Provider'
                      value={provider}
                      onChange={(e: any) => setProvider(e.target.value)}
                      MenuProps={{ style: { maxHeight: 250 } }}
                    >
                      {Array.isArray(providers) &&
                        providers?.length > 0 &&
                        providers?.map((item: any, index: number) => {
                          return (
                            <MenuItem key={index} value={item?.value}>
                              {item?.label}
                            </MenuItem>
                          )
                        })}
                    </Select>
                  </FormControl>
                  <Collapse in={provider === '2'}>
                    <TextField
                      sx={{ mb: 4 }}
                      fullWidth
                      type={isShow?.web_key ? 'text' : 'password'}
                      label='Stripe Backend Key'
                      placeholder='Enter Stripe Backend Key'
                      value={stripe?.web_key}
                      onChange={(e: any) => setStripe({ ...stripe, web_key: e.target.value })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton onClick={() => setIsShow({ ...isShow, web_key: !isShow?.web_key })}>
                              <Icon icon={isShow?.web_key ? 'ph:eye' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      sx={{ mb: 4 }}
                      fullWidth
                      type={isShow?.app_key ? 'text' : 'password'}
                      label='Stripe Frontend Key'
                      placeholder='Enter Stripe Frontend Key'
                      value={stripe?.app_key}
                      onChange={(e: any) => setStripe({ ...stripe, app_key: e.target.value })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton onClick={() => setIsShow({ ...isShow, app_key: !isShow?.app_key })}>
                              <Icon icon={isShow?.app_key ? 'ph:eye' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      sx={{ mb: 4 }}
                      fullWidth
                      type={isShow?.id ? 'text' : 'password'}
                      label='Stripe Account ID'
                      placeholder='Enter Stripe Account ID'
                      value={stripe?.id}
                      onChange={(e: any) => setStripe({ ...stripe, id: e.target.value })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton onClick={() => setIsShow({ ...isShow, id: !isShow?.id })}>
                              <Icon icon={isShow?.id ? 'ph:eye' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Collapse>
                  <LoadingButton sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }} onClick={() => setIsOpen(true)}>
                    I don’t have an account
                  </LoadingButton>
                </Box>
              </>
            }
          </Box>
        </Card>
      </Box>
      <SetupDialog open={isOpen} setOpen={setIsOpen} />

    </>
  )
}

export default PaymentView
