'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import {
  Card, Box, LoadingButton, Accordion, AccordionDetails, AccordionSummary, Typography,
  Divider, TextField, Radio, RadioGroup, Collapse, FormControlLabel, Switch, InputAdornment
} from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Item {
  enabled: boolean
  message: string
  order_type: string
  label: string
}

const initialValues: Item[] = [
  {
    enabled: true,
    order_type: "pickup",
    label: "At the restaurant counter",
    message: "Just mention your order ID or first name."
  },
  {
    enabled: true,
    order_type: "pickup",
    label: "Outside the restaurant",
    message: "Call us when you arrive right outside the entrance at this number: +31 88 126 8702"
  },
  {
    enabled: true,
    order_type: "pickup",
    label: "Curbside pickup",
    message: "A runner will bring the food to your car. Insert car model & color in the comments field. Call +31 88 126 8702 when you arrive."
  },
  {
    enabled: true,
    order_type: "delivery",
    label: "In-person delivery",
    message: "You'll receive a call or doorbell ring when the driver arrives."
  },
  {
    enabled: true,
    order_type: "delivery",
    label: "Meet driver outside",
    message: "You'll receive a call from the driver to meet outside."
  },
  {
    enabled: true,
    order_type: "delivery",
    label: "No-contact / Leave order at my door",
    message: "The driver will place the order outside your door, ring the doorbell 3 times and leave."
  }
]

const FulfillmentView = () => {
  // State
  const [type, setType] = useState<number>(1)
  const [arr, setArr] = useState<Item[]>(initialValues)

  // Hooks
  const router = useRouter()
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object.keys(restaurant)?.length > 0) {
      setType(restaurant?.has_fulfillment_options ? 2 : 1)
      setArr(initialValues)
    }
  }, [restaurant])

  const handleNext = () => {
    const data = {
      id: restaurant?._id,
      has_fulfillment_options: type === 2,
      fulfillment_options: arr
    }
    dispatch(editRestaurantDetail({ data, old_restaurant_data: restaurant }))
    router.push('/online-ordering/order-widget/re-captcha')
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: { xs: '100%', lg: '65%' } }}>
        <Box
          sx={{
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Fulfillment options</Typography>
          <LoadingButton
            variant='contained'
            onClick={handleNext}
            loading={loading}
            loadingPosition='start'
            startIcon={<Icon icon="material-symbols:save" fontSize='5.5rem' />}>
            Save
          </LoadingButton>
        </Box>
        <Box sx={{ p: 6, width: { sm: '40rem' }, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box
              component={Icon}
              icon={'icon-park-twotone:caution'}
              sx={{ fontSize: 85, color: theme => theme.palette.warning.main }}
            />
            <Typography sx={{ fontWeight: 500 }}>
              As part of a higher hygiene standard or just for the well being of your team and clients please consider the
              fulfillment options with minimum physical exposure.
            </Typography>
          </Box>
          <Divider sx={{ my: 4 }} />
          <RadioGroup value={type} onChange={(e: any) => setType(Number(e.target.value))}>
            <FormControlLabel value={1} control={<Radio />} label={'Default (No extra options at checkout)'} />
            <FormControlLabel value={2} control={<Radio />} label={'Minimum exposure options at checkout'} />
          </RadioGroup>
          <Collapse in={type === 2}>
            <Accordion
              sx={{
                mt: 2,
                boxShadow: 'none !important',
                border: theme => `1px solid ${theme.palette.divider}`,
                borderRadius: '6px !important',
                '&:before': { bgcolor: 'transparent' }
              }}
            >
              <AccordionSummary>
                <Typography
                  sx={{ fontWeight: '700 !important', color: theme => `${theme.palette.text.secondary} !important` }}
                >
                  Pickup
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Array.isArray(arr) &&
                  arr?.length > 0 &&
                  arr?.filter((item: any) => item?.order_type === 'pickup')?.map((item: Item, index: number) => {
                    return (
                      <Box key={index} sx={{ mb: 4 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' }
                          }}
                        >
                          <Typography sx={{ fontWeight: 500 }}>{item?.label}</Typography>
                          <Switch
                            size='medium'
                            checked={item?.enabled}
                            onChange={() =>
                              setArr(
                                arr?.map((val: Item, i: number) =>
                                  i === index ? { ...val, checked: !item?.enabled } : { ...val }
                                )
                              )
                            }
                          />
                        </Box>
                        <Collapse in={item?.enabled}>
                          <TextField
                            sx={{ mt: 2 }}
                            multiline
                            fullWidth
                            minRows={3}
                            label='Instructions visible to client'
                            value={item?.message}
                            onChange={(e: any) =>
                              setArr(
                                arr?.map((val: Item, i: number) =>
                                  i === index ? { ...val, message: e.target.value } : { ...val }
                                )
                              )
                            }
                            inputProps={{ maxLength: 200 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <Typography>{item?.message?.length} / 200</Typography>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Collapse>
                      </Box>
                    )
                  })}
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                mt: 2,
                boxShadow: 'none !important',
                border: theme => `1px solid ${theme.palette.divider}`,
                borderRadius: '6px !important',
                '&:before': { bgcolor: 'transparent' }
              }}
            >
              <AccordionSummary>
                <Typography
                  sx={{ fontWeight: '700 !important', color: theme => `${theme.palette.text.secondary} !important` }}
                >
                  Delivery
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Array.isArray(arr) &&
                  arr?.length > 0 &&
                  arr?.filter((item: any) => item?.order_type === 'delivery')?.map((item: Item, index: number) => {
                    return (
                      <Box key={index} sx={{ mb: 4 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' }
                          }}
                        >
                          <Typography sx={{ fontWeight: 500 }}>{item?.label}</Typography>
                          <Switch
                            size='medium'
                            checked={item?.enabled}
                            onChange={() =>
                              setArr(
                                arr?.map((val: Item, i: number) =>
                                  i === index ? { ...val, enabled: !item?.enabled } : { ...val }
                                )
                              )
                            }
                          />
                        </Box>
                        <Collapse in={item?.enabled}>
                          <TextField
                            sx={{ mt: 2 }}
                            multiline
                            fullWidth
                            minRows={3}
                            label='Instructions visible to client'
                            value={item?.message}
                            onChange={(e: any) =>
                              setArr(
                                arr?.map((val: Item, i: number) =>
                                  i === index ? { ...val, message: e.target.value } : { ...val }
                                )
                              )
                            }
                            inputProps={{ maxLength: 200 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <Typography>{item?.message?.length} / 200</Typography>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Collapse>
                      </Box>
                    )
                  })}
              </AccordionDetails>
            </Accordion>
          </Collapse>
        </Box>
      </Card>
    </Box>
  )
}

export default FulfillmentView
