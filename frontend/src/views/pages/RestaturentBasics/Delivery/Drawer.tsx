// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, Typography, LoadingButton, Collapse, Switch, IconButton, Tooltip } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import AddEditZone from './AddEditZone'
import CsDelete from '@/@core/components/CsDelete'

// Store Imports
import { setZoneKey, hoverZone } from '@/redux-store/Delivery'
import { addDeliveryZone, getDeliveryZones, deleteDeliveryZone, editDeliveryZone } from '@/redux-store/Delivery/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Drawer = () => {
  // State
  const [toggleZone, setToggleZone] = useState<string | null>(null)
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })

  // Hooks
  const deliveryZones = useSelector((state: any) => state.delivery.deliveryZones)
  const loading = useSelector((state: any) => state.delivery.loading)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?._id)) {
      dispatch(getDeliveryZones({ restaurant_id: restaurant?._id }))
    }
  }, [restaurant?._id])

  useEffect(() => {
    if (!loading) {
      setIsDelete({ open: false, id: '' })
      setToggleZone(null)
    }
  }, [loading])

  const addZone = () => {
    const lastZone = deliveryZones[deliveryZones.length - 1]?.shape_json;
    const lastRadius = lastZone ? JSON.parse(lastZone)?.radius ?? 0 : 0;
    const newRadius = lastRadius + 500 || 1000;
    const shapeJson = {
      radius: newRadius,
      path: [],
      center: { lat: restaurant?.latitude ?? 19.189943, lng: restaurant?.longitude ?? 72.838208 }
    }
    const payload = {
      color: AppUtils.getRandomColor(),
      delivery_fee: 0,
      minimum_order: 0,
      name: '',
      restaurant_id: restaurant?._id,
      shape_json: JSON.stringify(shapeJson),
      zone_type: 1,
      is_active: true,
    }

    dispatch(addDeliveryZone(payload))
  }

  const handleToggleZone = (id: string) => {
    if (toggleZone === id) {
      setToggleZone(null)
    } else {
      setToggleZone(id)
      dispatch(setZoneKey({ _id: id, value: true, key: 'editable' }))
    }
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: theme => theme.palette.background.paper,
          borderLeft: theme => `1px solid ${theme.palette.divider}`,
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 4,
              py: 2,
              borderBottom: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Delivery status</Typography>
            <Switch checked={true} />
          </Box>
          <Box sx={{ overflow: 'auto', height: 'calc(100vh - 13.5rem)', p: 4 }}>
            {Array.isArray(deliveryZones) && deliveryZones?.length > 0 ? (
              deliveryZones?.map((zone: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      border: theme =>
                        `2px solid ${zone?.is_active ? zone?.color : theme.palette.secondary.light}`,
                      px: 2,
                      py: 2,
                      mb: 2,
                      borderRadius: '8px'
                    }}
                    onMouseOver={() =>
                      toggleZone !== zone?._id && dispatch(hoverZone({ _id: zone?._id, isHover: true }))
                    }
                    onMouseLeave={() =>
                      toggleZone !== zone?._id && dispatch(hoverZone({ _id: zone?._id, isHover: false }))
                    }
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography
                          sx={{
                            ml: 2,
                            fontWeight: 700,
                            color: theme =>
                              zone?.is_active ? theme.palette.text.primary : theme.palette.secondary.light
                          }}
                        >
                          {zone?.name ? zone?.name : `Zone ${index + 1}`}
                          {!zone?.is_active && ' (hidden)'}
                        </Typography>
                      </Box>
                      <Box>
                        <Tooltip title='Delete' arrow>
                          <IconButton
                            onClick={() => setIsDelete({ open: true, id: zone?._id })}
                            sx={{ mr: 1 }}
                          >
                            <Icon icon={'material-symbols:delete-outline'} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={`${zone?.is_active ? 'Hide' : 'Visible'} Zone`} arrow>
                          <IconButton
                            onClick={() => dispatch(editDeliveryZone({ id: zone?._id, is_active: !zone?.is_active }))}
                          >
                            <Icon icon={zone?.is_active ? 'iconamoon:eye-off' : 'iconamoon:eye'} />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size='small'
                          onClick={() => handleToggleZone(zone?._id)}
                        >
                          <Icon
                            icon={'icon-park-outline:down'}
                            style={{
                              transform: toggleZone === zone?._id ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'all 0.2s ease-in-out'
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                    <Collapse in={toggleZone === zone?._id}>
                      {toggleZone === zone?._id && <AddEditZone item={toggleZone === zone?._id ? zone : {}} />}
                    </Collapse>
                  </Box>
                )
              })
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 'calc(100vh - 24rem)',
                  flexDirection: 'column'
                }}
              >
                <Box component={'img'} src='/images/NoZone.svg' sx={{ width: '14rem', height: 'auto' }} />
                <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>No delivery zone available!</Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ width: '100%', px: 4, pt: 4, pb: 2, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
          <LoadingButton
            fullWidth
            loading={loading}
            loadingPosition='start'
            startIcon={loading ? <>&nbsp;</> : <></>}
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, mb: 2 }}
            onClick={addZone}

          >
            Add another zone
          </LoadingButton>
        </Box>
      </Box>

      <CsDelete
        open={isDelete?.open}
        loading={loading}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Zone'
        handleDelete={() => dispatch(deleteDeliveryZone(isDelete?.id))
        }
      />
    </>
  )
}

export default Drawer
