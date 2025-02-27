// React Imports
import { useEffect, useState } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { UseSelector } from 'react-redux'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

//store Imports
import { editRestaurentData } from '@/redux-store/Restaurant'
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

const Services = () => {
  // State
  const [tabs, setTabs] = useState<any>({
    hasPickup: false,
    hasDelivery: false,
    hasOnPremise: false
  })
  const dispatch = useDispatch();
  const restaurant = useSelector((state: any) => state.restaurant.restaurant);

  const serviceArray = [
    { label: 'Pickup Service', title: 'Do you offer pickup from your location?', key: 'hasPickup' },
    { label: 'Delivery Service', title: 'Do you offer food delivery?', key: 'hasDelivery' },
    { label: 'On Premise', title: 'Do you offer on premise services?', key: 'hasOnPremise' }
  ]

  useEffect(() => {
    if (restaurant) {
      setTabs({
        hasPickup: restaurant.has_pickup || false,
        hasDelivery: restaurant.has_delivery || false,
        hasOnPremise: restaurant.has_on_premise || false
      });
    }
  }, [restaurant]);

  return (
    <Box>
      {Object.keys(tabs).map((key: any, index: number) => {
        return (
          <Box
            key={index}
            sx={{
              border: theme => `2px solid ${theme.palette.divider}`,
              borderRadius: '8px',
              width: '100%',
              mb: 4
            }}
          >
            <Box sx={{ p: 3, borderBottom: theme => `2px solid ${theme.palette.divider}` }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{serviceArray[index]?.label}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 4 }}>
              <Typography sx={{ fontWeight: 500 }}>{serviceArray[index]?.title}</Typography>
              <Switch
                checked={tabs[serviceArray[index].key]}
                onChange={(e: any) => {
                  const updatedKey = serviceArray[index].key;
                  const updatedValue = e.target.checked;
                  const data = { ...tabs, [updatedKey]: updatedValue };


                  const payload = {
                    [updatedKey === 'hasPickup' ? 'has_pickup' :
                      updatedKey === 'hasDelivery' ? 'has_delivery' :
                        'has_on_premise']: updatedValue
                  };

                  dispatch(editRestaurantDetail({
                    data: {
                      id: restaurant?._id,
                      ...payload
                    },
                    old_restaurant_data: restaurant
                  }));
                  dispatch(editRestaurentData({ data: payload, isServe: true }));

                  setTabs(data);
                }}
              />
              {/* <Switch
                checked={tabs[serviceArray[index].key]}
                onChange={(e: any) => {
                  const data = { ...tabs, [serviceArray[index].key]: e.target.checked }
                  const payload = {
                    has_pickup: data.hasPickup,
                    has_delivery: data.hasDelivery,
                    has_on_premise: data.hasOnPremise
                  };
                  dispatch(editServeMaster({id: restaurant._id,...payload }))
                  dispatch(editRestaurentData({ data: payload, isServe: true }))
                  setTabs(data)
                }}
              /> */}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default Services
