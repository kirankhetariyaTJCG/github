// React Imports
import { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react'

// MUI Imports
import { Box, IconButton, Typography, Tooltip } from '@/Helper/MUIImports'

// Third Party Imports
import { GoogleMap, Marker, InfoWindow, Polygon, Circle, DrawingManager } from '@react-google-maps/api'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { updateZoneArr } from '@/redux-store/Delivery'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const DeliveryMap = props => {
  // Props
  const { setIsAdvance } = props

  // Hooks
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const deliveryZones = useSelector(state => state.delivery.deliveryZones)
  const reloadKey = useSelector(state => state.delivery.reloadKey)
  const { restaurant } = useSelector((state) => state.restaurant)
  const dispatch = useDispatch()
  const polygonRef = useRef(null)

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?.latitude) && AppUtils.checkValue(restaurant?.longitude)) {
      setCenter({ lat: restaurant?.latitude, lng: restaurant?.longitude })
    }
  }, [restaurant])

  // State
  const [center, setCenter] = useState({ lat: 19.189943, lng: 72.838208 })
  const [circleData, setCircleData] = useState({ center: center, radius: 500 })
  const [tooltipPosition, setTooltipPosition] = useState(null)

  const updateZone = (data, item) => {
    const payload = {
      ...JSON.parse(item?.shape_json),
      ...data
    }
    dispatch(updateZoneArr({ _id: item?._id, shape_json: JSON.stringify(payload) }))
  }

  const onCircleComplete = useCallback(
    (circle, id) => {
      const handleRadiusChanged = () => {
        const newRadius = circle.getRadius()
        setCircleData(prevData => ({ ...prevData, radius: newRadius }))
        updateZone({ radius: newRadius }, id)
        setTooltipPosition(circle.getCenter().toJSON())
      }
      circle.addListener('radius_changed', handleRadiusChanged)
    },
    [dispatch]
  )

  const onPolygonComplete = useCallback(
    (polygon, id) => {
      const handlePathChanged = () => {
        updateZone({
          path: polygon
            .getPath()
            .getArray()
            .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))
        }, id)
      }
      polygon.getPath().addListener('insert_at', handlePathChanged)
      polygon.getPath().addListener('remove_at', handlePathChanged)
      polygon.getPath().addListener('set_at', handlePathChanged)
    },
    [dispatch]
  )

  const getShape = (item, key) => {
    if (AppUtils.checkValue(item?.shape_json)) {
      return JSON.parse(item.shape_json)[key]
    }
  }

  const handleMouseUp = (item) => {
    if (polygonRef.current) {
      const path = polygonRef.current.getPath();
      const updatedPaths = [];

      path.forEach((point) => {
        updatedPaths.push({ lat: point.lat(), lng: point.lng() });
      });

      updateZone({ path: updatedPaths }, item)
    } else {
      console.error("Polygon instance is not available");
    }
  };

  const loadPolygon = (polygon, item) => {
    polygonRef.current = polygon
    onPolygonComplete(polygon, item)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          py: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Where do you deliver?</Typography>
        <Tooltip title='Advanced Settings' arrow>
          <IconButton
            color='primary'
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={() => setIsAdvance(true)}
          >
            <Icon icon={'tdesign:location-setting'} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ width: '100%', height: { xs: 'calc(100% - 7rem)', sm: 'calc(100% - 3.5rem)' } }}>
        <GoogleMap key={reloadKey} center={center} zoom={13} mapContainerStyle={containerStyle}>
          {Array.isArray(deliveryZones) &&
            deliveryZones?.length > 0 &&
            deliveryZones?.map((item, index) => {
              return (
                <Box key={index}>
                  {item?.zone_type === 1 && (
                    <Circle
                      center={getShape(item, 'center')}
                      radius={getShape(item, 'radius')}
                      options={{
                        fillColor: item?.color,
                        fillOpacity: 0.2,
                        strokeColor: item?.color,
                        strokeWeight: item?.isHover ? 5 : 2,
                        visible: item?.is_active
                      }}
                      onLoad={circle => onCircleComplete(circle, item)}
                      editable={item?.editable}
                      draggable={item?.editable}
                      onDragEnd={event => {
                        updateZone({ center: { lat: event.latLng.lat(), lng: event.latLng.lng() } }, item)
                      }}
                    />
                  )}
                  {item?.zone_type === 2 && (
                    <>
                      <Polygon
                        path={getShape(item, 'path')}
                        options={{
                          fillColor: item?.color,
                          fillOpacity: 0.3,
                          strokeColor: item?.color,
                          strokeOpacity: 1,
                          strokeWeight: item?.isHover ? 5 : 2,
                          editable: item?.editable,
                          draggable: item?.editable,
                          clickable: false,
                          geodesic: false,
                          visible: item?.is_active
                        }}
                        editable={item?.editable}
                        draggable={item?.editable}
                        onLoad={polygon => loadPolygon(polygon, item)}
                        onMouseUp={() => handleMouseUp(item)}
                      />
                      {item?.isDraw && (
                        <DrawingManager
                          onPolygonComplete={polygon => {
                            updateZone({
                              path: polygon
                                .getPath()
                                .getArray()
                                .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))
                            }, item)
                          }}
                          options={{
                            drawingMode: google.maps.drawing.OverlayType.POLYGON,
                            drawingControl: false,
                            polygonOptions: {
                              fillColor: item?.color,
                              fillOpacity: 0.3,
                              strokeColor: item?.color,
                              strokeOpacity: 1,
                              strokeWeight: 2,
                              editable: item?.editable,
                              draggable: false,
                              clickable: false
                            }
                          }}
                        />
                      )}
                    </>
                  )}
                </Box>
              )
            })}
          <Marker position={center} />
          {tooltipPosition && (
            <InfoWindow position={tooltipPosition} onCloseClick={() => setTooltipPosition(null)} options={{}}>
              <Box>
                <Typography variant='body2' sx={{ color: '#000' }}>
                  {(circleData.radius / 1609.34).toFixed(2)} Miles
                </Typography>
                <Typography variant='body2' sx={{ color: '#000' }}>
                  {(circleData.radius / 1000).toFixed(2)} Kilometers
                </Typography>
              </Box>
            </InfoWindow>
          )}
        </GoogleMap>
      </Box>
    </>
  )
}

export default memo(DeliveryMap)
