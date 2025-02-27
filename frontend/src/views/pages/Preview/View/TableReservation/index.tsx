// React Imports
import { useEffect, useState } from "react"

// MUI Imports
import { Box, Typography, LoadingButton, Divider, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from "react-redux"
import { Circle, Polygon } from '@react-google-maps/api'

// Custom Imports
import CsMap from "@/@core/components/CsMap"

// Icon Imports
import Icon from "@/@core/components/Icon"

// Helper Imports
import AppUtils from "@/Helper/AppUtils"

const TableReservation = () => {

    // State
    const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 22.5937, lng: 80.9629 })

    // Hooks
    const colorData = useSelector((state: any) => state.website.website.color)
    const fontType = useSelector((state: any) => state.website.website.fonts)
    const deliveryZones = useSelector((state: any) => state.delivery.deliveryZones)
    const website = useSelector((state: any) => state.website.website)

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
        <Container maxWidth='lg' sx={{ textAlign: 'center', mb: 16 }}>
            <Box component={Icon}
                icon={'lucide-lab:chairs-table-parasol'}
                sx={{ color: colorData?.main, fontSize: 45, mb: 4 }} />
            <Typography variant="h1"
                sx={{
                    fontSize: { xs: '1.5rem', md: '2.875rem' },
                    fontWeight: 600,
                    color: colorData?.main,
                    ...AppUtils.getFontFamily(fontType)
                }}>
                Our location
            </Typography>
            <Divider sx={{ bgcolor: colorData?.main, width: '6rem', mx: 'auto', my: 8 }} />
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#4D4D4D', ...AppUtils.getFontFamily(fontType) }}>
                Our restaurant is located in a nice area in Amsterdam, and we made sure you’ll fall in love with our dishes. Have some tasty bites and refreshing drinks and be sure to tell others where to find us as well!
            </Typography>
            <Box sx={{ width: '100%', height: '35rem', my: 8 }}>
                <Box sx={{ borderRadius: '1rem', height: '100%', width: '100%', overflow: 'hidden' }}>
                    <CsMap
                        zoom={12}
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
            </Box>
            <Typography variant="h1" sx={{
                fontSize: { xs: '1.5rem', md: '2.875rem' },
                fontWeight: 600,
                color: colorData?.main,
                ...AppUtils.getFontFamily(fontType)
            }}>
                Book a table at Pizzaholic in Amsterdam
            </Typography>
            <Divider sx={{ bgcolor: colorData?.main, width: '6rem', mx: 'auto', my: 8 }} />
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#4D4D4D', ...AppUtils.getFontFamily(fontType) }}>
                You can easily make a table reservation at Pizzaholic online. Simply select the size of your party and the date – your booking confirmation will be confirmed in real-time.
            </Typography>
            <Typography sx={{ my: 4, fontSize: '1.1rem', fontWeight: 500, color: '#4D4D4D', ...AppUtils.getFontFamily(fontType) }}>
                Already know what you’d like to order? We can prepare it in advance so that your food waits for you, not the other way around.
            </Typography>
            <LoadingButton
                size='large'
                variant='outlined'
                sx={{
                    borderColor: `${colorData?.main} !important`,
                    color: `${colorData?.main} !important`,
                    py: 4,
                    ...AppUtils.getFontFamily(fontType)
                }}>
                Table Reservation
            </LoadingButton>
        </Container>
    )
}

export default TableReservation