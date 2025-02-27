'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, Typography, Switch, Card, LoadingButton, Divider, Grid } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import CustomBackdrop from '@/@core/components/CsBackdropLoader'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

const MethodsNames = ['Cash', 'Card', 'Card Details']

const paymentMethods = ['CASH', 'CARD', 'CARD_DETAILS']

const MethodsView = () => {

  // Hooks
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (restaurant) {
      setMethods([
        {
          name: 'Delivery',
          key: 'delivery_payment_methods',
          options: restaurant?.delivery_payment_methods || [],
        },
        {
          name: 'Pickup',
          key: 'pickup_payment_methods',
          options: restaurant?.pickup_payment_methods || [],
        },
        {
          name: 'On Premise',
          key: 'dine_in_payment_methods',
          options: restaurant?.dine_in_payment_methods || [],
        },
      ])
    }
  }, [restaurant])

  // State
  const [methods, setMethods] = useState([
    {
      name: 'Delivery',
      key: 'delivery_payment_methods',
      options: restaurant?.delivery_payment_methods || [],
    },
    {
      name: 'Pickup',
      key: 'pickup_payment_methods',
      options: restaurant?.pickup_payment_methods || [],
    },
    {
      name: 'On Premise',
      key: 'dine_in_payment_methods',
      options: restaurant?.dine_in_payment_methods || [],
    },
  ])

  const handleSave = () => {
    const updatedData = methods.reduce((acc: any, method: any) => {
      acc[method.key] = method.options
      return acc
    }, {})

    dispatch(editRestaurantDetail({
      data: { ...updatedData, id: restaurant?._id },
      old_restaurant_data: restaurant
    }))
  }

  const handleMethodChange = (key: any, updatedOptions: any) => {
    setMethods(prevMethods =>
      prevMethods.map(method =>
        method.key === key ? { ...method, options: updatedOptions } : method
      )
    )
  }

  const Switches = ({ options, onChange }: any) => {

    const handleToggle = (method: any) => {
      const updatedOptions = options.includes(method)
        ? options.filter((item: any) => item !== method)
        : [...options, method]

      onChange(updatedOptions)
    }

    return (
      <Box>
        {paymentMethods.map((method, index: number) => (
          <Box
            key={method}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography sx={{ fontWeight: 500 }}>{MethodsNames[index]}</Typography>
            <Switch
              size='medium'
              checked={options.includes(method)}
              onChange={() => handleToggle(method)}
            />
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <>
      <CustomBackdrop open={loading} />
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Payment methods</Typography>
          <LoadingButton
            variant='contained'
            sx={{
              mt: { xs: 2, sm: 0 },
              width: { xs: '100%', sm: 'auto' }
            }}
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </Box>
        <Divider />
        <Box sx={{ p: 4, overflow: 'auto', height: 'calc(100vh - 10rem)' }}>
          <Grid container columnSpacing={4} sx={{ width: '100%', m: 0 }}>
            {Array.isArray(methods) && methods?.length > 0 &&
              methods?.map((method, index) => {
                return (
                  <Grid key={index} item xs={12} sm={4}>
                    <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
                      <Typography sx={{ fontWeight: '700 !important', px: 4, py: 2 }}>{method?.name}</Typography>
                      <Divider />
                      <Box sx={{ p: 4 }}>
                        <Switches
                          options={method?.options}
                          onChange={(updatedOptions: any) => handleMethodChange(method?.key, updatedOptions)}
                        />
                      </Box>
                    </Box>
                  </Grid>
                )
              })
            }

          </Grid>
        </Box>
      </Card>
    </>
  )
}

export default MethodsView
