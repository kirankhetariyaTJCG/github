// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, LoadingButton, IconButton, Switch, Checkbox, Typography, FormControlLabel, Radio, RadioGroup, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { DialogProps } from '@/types'

const defaultSelectionArr = [
  { label: 'Town or City Area *', isChecked: true, isMandatory: true, key: 'city' },
  { label: 'Street name & Number *', isChecked: true, isMandatory: true, key: 'street' },
  { label: 'Postcode/Zipcode *', isChecked: true, isMandatory: true, key: 'zipcode' },
]

const customSelectionArr = [
  { label: 'Town or City Area *', isChecked: true, isMandatory: true, key: 'city' },
  { label: 'Street name & Number *', isChecked: true, isMandatory: true, key: 'street' },
  { label: 'Postcode/Zipcode *', isChecked: true, isMandatory: true, key: 'zipcode' },
  { label: 'Neighbourhood', isChecked: false, isMandatory: false, key: 'neighbourhood' },
  { label: 'Block/Building', isChecked: false, isMandatory: false, key: 'block' },
  { label: 'Intercom', isChecked: false, isMandatory: false, key: 'intercom' },
  { label: 'Floor', isChecked: false, isMandatory: false, key: 'floor' },
  { label: 'Apartment', isChecked: false, isMandatory: false, key: 'apartment' },
  { label: 'Where to Park', isChecked: false, isMandatory: false, key: 'more_address' }
]

const AdvanceSettings = (props: DialogProps) => {
  // Props
  const { setOpen, open } = props

  // State
  const [value, setValue] = useState<number>(1)
  const [customArr, setCustomArr] = useState<any[]>(customSelectionArr)
  const [outsideDelivery, setOutsideDelivery] = useState<boolean>(false)

  // Hooks
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    setOutsideDelivery(restaurant?.is_delivery_outside_disabled)

    if (restaurant?.extended_address?.length > 0) {
      const updatedSelectionArr = customSelectionArr.map((item) => ({
        ...item,
        isChecked: restaurant?.extended_address?.includes(item.key) || item.isChecked,
        isMandatory: restaurant?.extended_address_mandatory?.includes(item.key) || item.isMandatory,
      }));
      setValue(2)
      setCustomArr(updatedSelectionArr)
    }
  }, [restaurant])

  const handleSave = () => {
    const data: any = {
      id: restaurant._id,
      is_delivery_outside_disabled: outsideDelivery,
      extended_address: [],
      extended_address_mandatory: [],
    };

    if (value === 2) {
      const updatedArray = customArr
      data.extended_address = customArr.filter((item) => item.isChecked).map((item) => item.key);
      data.extended_address_mandatory = updatedArray.filter((item) => item.isMandatory && item.isChecked).map((item) => item.key);
    }
    dispatch(editRestaurantDetail({ data, old_restaurant_data: restaurant }));
    handleClose()
  }

  const handleChangeCheckbox = (item: any, index: number) => {
    const updatedSelectionArr = customArr?.map((val: any, i: number) => {
      if (i < 3) {
        return { ...val, isChecked: true }
      }
      return i === index ? { ...val, isChecked: !item?.isChecked } : { ...val }
    })

    setCustomArr(updatedSelectionArr)
  }

  const handleClose = () => {
    setValue(1)
    setCustomArr(customSelectionArr)
    setOutsideDelivery(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} maxWidth='md' onClose={handleClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
          px: 4,
          py: 3
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Advance Settings</Typography>
        <IconButton onClick={handleClose}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '40rem' } }}>
        <Typography>
          Adjust your clients ordering experience by using customizable delivery settings that meet your needs.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px', mb: 4 }}>
            <Typography sx={{ fontWeight: 700, p: 3, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
              Orders outside delivery area
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 4 }}>
              <Typography>Do you want to accept orders outside your delivery area?</Typography>
              <Switch size='medium' checked={outsideDelivery} onChange={() => setOutsideDelivery(!outsideDelivery)} />
            </Box>
          </Box>
          <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px', mb: 4 }}>
            <Box
              sx={{
                p: 3,
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>Delivery address form</Typography>
              <IconButton
                color='primary'
                size='small'
                sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              >
                <Icon icon={'lucide:list-restart'} />
              </IconButton>
            </Box>
            <Box sx={{ p: 4 }}>
              <RadioGroup value={value} onChange={(e: any) => setValue(Number(e.target.value))}>
                <FormControlLabel value={1} control={<Radio />} label='Default (best selection for most)' />
                <Collapse in={value === 1} sx={{ my: 2 }}>
                  {
                    defaultSelectionArr.map((item: any, index: number) => {
                      if (item?.isMandatory) {
                        return (
                          <Box
                            key={index}
                            sx={{
                              px: 4,
                              py: 1,
                              border: theme => `1px solid ${theme.palette.divider}`,
                              borderRadius: '6px',
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <FormControlLabel
                              control={<Checkbox checked disabled />}
                              label={item?.label}
                              disableTypography
                            />
                            {!item?.isMandatory && item?.isChecked && (
                              <FormControlLabel control={<Switch />} label={'Mandatory'} labelPlacement='start' />
                            )}
                          </Box>
                        )
                      }
                    })}
                </Collapse>
                <FormControlLabel value={2} control={<Radio />} label='Custom Selection' />
                <Collapse in={value === 2} sx={{ my: 2 }}>
                  {Array.isArray(customArr) &&
                    customArr?.length > 0 &&
                    customArr?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            px: 4,
                            py: 1,
                            border: theme => `1px solid ${theme.palette.divider}`,
                            borderRadius: '6px',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={item?.isChecked}
                                onChange={() => handleChangeCheckbox(item, index)}
                              />
                            }
                            label={item?.label}
                          />
                          {index > 2 && item?.isChecked && (
                            <FormControlLabel control={
                              <Switch checked={item?.isMandatory}
                                onChange={() => {
                                  setCustomArr(
                                    customArr?.map((val: any, i: number) =>
                                      i === index ? { ...val, isMandatory: !item?.isMandatory } : { ...val }
                                    )
                                  )
                                }} />}
                              label={'Mandatory'} labelPlacement='start'
                            />
                          )}
                        </Box>
                      )
                    })}
                </Collapse>
              </RadioGroup>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ borderTop: theme => `1px solid ${theme.palette.divider}`, pt: '1rem !important' }}>
        <LoadingButton
          variant='contained'
          onClick={() => handleSave()}
          loading={loading}
          loadingPosition='start'
          startIcon={loading ? <>&nbsp;&nbsp;</> : <></>}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AdvanceSettings
