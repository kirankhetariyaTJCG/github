// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, Typography, Divider } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'
import { Circle, Polygon } from '@react-google-maps/api'

// Custom Imports
import CsMap from '@/@core/components/CsMap'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Delivery = ({ section }: { section: any }) => {

  // State
  const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 22.5937, lng: 80.9629 })

  // Hooks
  const colorData = useSelector((state: any) => state.website.website.color)
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const website = useSelector((state: any) => state.website.website)
  const deliveryZones = useSelector((state: any) => state.delivery.deliveryZones)

  useEffect(() => {
    if (AppUtils.checkValue(website?.restautant_location)) {
      setCenter({ lat: JSON.parse(website?.restautant_location)?.lat, lng: JSON.parse(website?.restautant_location)?.long })
    }
  }, [website])

  const getShape = (item: any, key: string) => {
    if (AppUtils.checkValue(item?.shape_json)) {
      return JSON.parse(item.shape_json)[key]
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        height: 'auto',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        mb: 16
      }}
    >
      <Box sx={{ width: { xs: '100%', md: '50%' }, height: { xs: '25rem', md: 'auto' }, minHeight: '20rem' }}>
        <CsMap
          zoom={13}
          centerCords={center}
          MapContent={
            <>
              {Array.isArray(deliveryZones) && deliveryZones?.length > 0 &&
                deliveryZones.map((zone: any, index: number) =>
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
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          p: { xs: 4, md: 8 },
          bgcolor: colorData?.main,
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#fff',
              ...AppUtils.getFontFamily(fontType)
            }}
          >
            {section?.title ? section?.title : 'Takeaway Food & Delivery'}
          </Typography>
          <Divider sx={{ bgcolor: '#fff', width: '8rem' }} />
        </Box>
        <Typography sx={{ fontSize: '1rem', color: '#fff', fontWeight: 500, ...AppUtils.getFontFamily(fontType), mb: 4 }}>
          {section?.description
            ? section?.description
            : `Prepare to fall in love at first bite—our menu is the stuff of legends! But don’t just take our word for it; come and experience the magic yourself.`}
        </Typography>
        <Box sx={{ mt: { xs: 4, md: 0 } }}>
          <Typography sx={{ fontWeight: 600, color: '#fff', fontSize: '1.2rem' }}>Delivery Fee</Typography>
          {Array.isArray(deliveryZones) &&
            deliveryZones?.length > 0 &&
            deliveryZones.map((zone: any, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderRadius: '8px'
                  }}
                >
                  <Box
                    sx={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      bgcolor: zone?.color,
                      border: `1px solid ${colorData?.light}`
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      sx={{ fontWeight: 500, color: '#fff', width: { sm: '7rem' }, ...AppUtils.getFontFamily(fontType) }}
                    >
                      {zone?.name},
                    </Typography>
                    <Typography sx={{ fontWeight: 400, color: '#fff', ...AppUtils.getFontFamily(fontType) }}>
                      Min - ${zone?.minimum_order}/-
                    </Typography>
                    <Typography sx={{ fontWeight: 400, color: '#fff', ...AppUtils.getFontFamily(fontType) }}>
                      Fee - ${zone?.delivery_fee}/-
                    </Typography>
                  </Box>
                </Box>
              )
            })}
        </Box>
      </Box>
    </Box>
  )
}

export default Delivery
