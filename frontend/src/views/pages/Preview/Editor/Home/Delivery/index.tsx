// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import { Box, Grid, LoadingButton, Typography, TextField } from '@/Helper/MUIImports'

// Third Party Imports
import { Circle, Polygon } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsMap from '@/@core/components/CsMap'

// Store Imports
import { editSection } from '@/redux-store/Website'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Delivery = ({ section, onCancel }: { section: any, onCancel: () => void }) => {

  // State
  const [data, setData] = useState<{ title: string, description: string }>({ title: '', description: '' })
  const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 22.5937, lng: 80.9629 })

  // Hooks
  const deliveryZones = useSelector((state: any) => state.delivery.deliveryZones)
  const website = useSelector((state: any) => state.website.website)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      setData({ title: section?.title, description: section?.description })
      if (AppUtils.checkValue(website?.restautant_location)) {
        setCenter({ lat: JSON.parse(website?.restautant_location)?.lat, lng: JSON.parse(website?.restautant_location)?.long })
      }
    }
  }, [section])

  const getShape = (item: any, key: string) => {
    if (AppUtils.checkValue(item?.shape_json)) {
      return JSON.parse(item.shape_json)[key]
    }
  }

  const handleSave = () => {
    dispatch(editSection({ id: section?.id, ...data }))
    handleClose()
  }

  const handleClose = () => {
    setData({ title: '', description: '' })
    onCancel()
  }

  const mapOptions: google.maps.MapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      gestureHandling: 'cooperative'
    }),
    []
  )

  return (
    <>
      <Box
        sx={{
          border: theme => `1px solid ${theme.palette.info.light}`,
          borderRadius: '8px',
          py: 2,
          px: 4,
          mb: 4,
          bgcolor: theme => theme.palette.info.lightOpacity,
          fontSize: '0.9rem'
        }}
      >
        This information is automatically retrieved from the <b>"Setup"</b> section in the web admin panel.
      </Box>
      <TextField
        sx={{ mb: 4 }}
        fullWidth
        value={data?.title}
        label='Title'
        placeholder='Enter Section Title'
        onChange={e => setData({ ...data, title: e.target.value })}
      />
      <TextField
        fullWidth
        value={data?.description}
        label='Description'
        placeholder='Enter Section Description'
        onChange={e => setData({ ...data, description: e.target.value })}
        multiline
        minRows={3}
      />
      <Grid container spacing={4} sx={{ mt: 0, mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ width: '100%', height: '20rem', borderRadius: '8px', overflow: 'hidden' }}>
            <CsMap
              zoom={12}
              options={mapOptions}
              centerCords={center}
              MapContent={
                <>
                  {Array.isArray(deliveryZones) && deliveryZones?.length > 0 &&
                    deliveryZones
                      .filter((zone: any) => zone?.is_active)
                      .map((zone: any, index: number) =>
                        zone?.zone_type === 1 ? (
                          <Circle
                            key={index}
                            center={getShape(zone, 'center')}
                            radius={getShape(zone, 'radius')}
                            options={{
                              fillColor: zone?.color,
                              fillOpacity: 0.2,
                              strokeColor: zone?.color,
                              strokeWeight: 2,
                            }}
                          />
                        ) : (
                          <Polygon
                            key={index}
                            path={getShape(zone, 'path')}
                            options={{
                              fillColor: zone?.color,
                              fillOpacity: 0.3,
                              strokeColor: zone?.color,
                              strokeOpacity: 1,
                              strokeWeight: 2,
                            }}
                          />
                        )
                      )}

                </>
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {Array.isArray(deliveryZones) &&
            deliveryZones?.length > 0 &&
            deliveryZones.filter((zone: any) => zone?.is_active)
              .map((zone: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      pl: 3,
                      gap: 2,
                      border: theme => `2px solid ${theme.palette.divider}`,
                      borderRadius: '8px',
                      mb: 4,
                      display: 'flex'
                    }}
                  >
                    <Box sx={{ height: '1.5rem', width: '1.5rem', borderRadius: '4px', bgcolor: zone?.color, mt: 1 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 600, width: '6rem' }}>{zone?.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.8rem' }}>Min - ${zone?.minimum_order}/-</Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.8rem' }}>Fee - ${zone?.delivery_fee}/-</Typography>
                      </Box>
                    </Box>
                  </Box>
                )
              })}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pt: 4,
          gap: 3,
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <LoadingButton
          variant='outlined'
          size='large'
          onClick={handleClose}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          variant='contained'
          size='large'
          onClick={handleSave}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  )
}

export default Delivery
