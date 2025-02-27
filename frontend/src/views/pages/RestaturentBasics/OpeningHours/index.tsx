'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, FormControlLabel, Typography, Card, Divider, Checkbox, useMediaQuery, Tooltip, IconButton } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import Holiday from './Holiday'
import PauseSerivce from './PauseService'
import CsHours from './CsHours'
import Alert from './Alert'

// Store Imports
import { getRestaurantServiceSchedules, manageRestaurantServiceSchedules } from '@/redux-store/RestaurantsServiceSchedules/Action'
import { setServices } from '@/redux-store/RestaurantsServiceSchedules'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Hours {
  start_time: string | null;
  end_time: string | null;
}

interface WeekDay {
  day: number;
  is_selected: boolean;
  hours: Hours[];
}

interface SpecificHour {
  services: number
  is_same_as_opening_hours: boolean
  name: string
  icon: string
  _id: string
}

export const weekDays: WeekDay[] = [
  { day: 0, is_selected: true, hours: [{ start_time: null, end_time: null }] },
  { day: 1, is_selected: true, hours: [{ start_time: null, end_time: null }] },
  { day: 2, is_selected: true, hours: [{ start_time: null, end_time: null }] },
  { day: 3, is_selected: true, hours: [{ start_time: null, end_time: null }] },
  { day: 4, is_selected: true, hours: [{ start_time: null, end_time: null }] },
  { day: 5, is_selected: true, hours: [{ start_time: null, end_time: null }] },
  { day: 6, is_selected: true, hours: [{ start_time: null, end_time: null }] },
]

export const specificHours: SpecificHour[] = [
  { services: 0, is_same_as_opening_hours: false, name: 'Opening Hours', icon: 'mdi:store-clock-outline', _id: AppUtils.randomId() },
  { services: 1, is_same_as_opening_hours: false, name: 'Pickup service', icon: 'mdi:scooter-outline', _id: AppUtils.randomId() },
  { services: 2, is_same_as_opening_hours: false, name: 'Delivery service', icon: 'hugeicons:delivery-truck-02', _id: AppUtils.randomId() },
  { services: 3, is_same_as_opening_hours: false, name: 'Table reservation', icon: 'lucide-lab:chairs-table-platter', _id: AppUtils.randomId() },
  { services: 4, is_same_as_opening_hours: false, name: 'On Premise', icon: 'mdi:table-chair', _id: AppUtils.randomId() },
  { services: 5, is_same_as_opening_hours: false, name: 'Exceptions', icon: 'mdi:shop-delete-outline', _id: AppUtils.randomId() },
]

const OpeningHoursView = () => {
  // State
  const [activeValue, setActiveValue] = useState<number>(0)
  const [isSameHours, setIsSameHours] = useState<boolean>(false)
  const [isFormShow, setIsFormShow] = useState<{ type: string, show: boolean }>({
    type: "ADD",
    show: false
  });
  const [isSave, setIsSave] = useState<{ open: boolean, value: number | null }>({ open: false, value: null })
  const [weekDays, setWeekDays] = useState<any[]>([])

  // Media Query
  const md = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  // Hooks
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const serviceScheduleData = useSelector((state: any) => state.service_schedules.serviceSchedules)
  const loading = useSelector((state: any) => state.service_schedules.loading)

  useEffect(() => {
    if (restaurant?._id) {
      dispatch(getRestaurantServiceSchedules({
        data: { restaurant_id: restaurant._id },
        old_schedule_data: serviceScheduleData
      }))
    }
  }, [restaurant])

  useEffect(() => {
    if (serviceScheduleData && serviceScheduleData[0]?.hours) {
      const updatedServiceScheduleData = serviceScheduleData.map((item: any) => item?.is_same_as_opening_hours
        ? { ...item, hours: serviceScheduleData[0]?.hours, } : item)
      dispatch(setServices(updatedServiceScheduleData))
    }
  }, [serviceScheduleData[0]?.hours])

  useEffect(() => {

    if (isSameHours) {
      setIsSameHours(false)
      return
    }
    setWeekDays(serviceScheduleData[Number(activeValue)]?.hours)
  }, [activeValue, serviceScheduleData])

  useEffect(() => {
    !loading && setIsSave({ open: false, value: null })
  }, [loading])

  const handleSave = (type: number) => {
    dispatch(manageRestaurantServiceSchedules
      ({
        data: {
          restaurant_id: restaurant?._id,
          services: type,
          hours: weekDays,
          is_same_as_opening_hours: serviceScheduleData[Number(activeValue)]?.is_same_as_opening_hours
        },
        old_schedule_data: serviceScheduleData
      }))
  }

  const handleSameHours = (e: any) => {
    setIsSameHours(e.target.checked)
    const updatedServiceScheduleData = serviceScheduleData?.map((item: any, index: number) =>
      index === Number(activeValue)
        ? { ...item, is_same_as_opening_hours: e.target.checked }
        : item
    )

    setWeekDays(e.target.checked ? serviceScheduleData[0]?.hours : serviceScheduleData[Number(activeValue)]?.hours)
    dispatch(setServices(updatedServiceScheduleData));
  }

  const handleActiveValue = (item: any, index: number) => {
    const areHoursSame = (currentHours: any[], newHours: any[]) => {
      return JSON.stringify(currentHours) === JSON.stringify(newHours);
    };
    if (!areHoursSame(weekDays, serviceScheduleData[Number(activeValue)]?.hours)) {
      setIsSave({ open: true, value: item?.services })
    } else {
      setActiveValue(item?.services);
      setWeekDays(serviceScheduleData[index]?.hours);
    }
  }

  const handleDelete = () => {
    handleSave(serviceScheduleData[Number(activeValue)]?.services)
    setActiveValue(Number(isSave?.value))
  }

  return (
    <>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>When are you open?</Typography>
        </Box>
        <Divider />
        <Box sx={{ overflow: 'auto', height: { xs: 'calc(100vh - 10rem)', sm: 'calc(100vh - 9.3rem)' } }}>
          <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
            <Box sx={{ width: '23%', py: 4, pr: 4 }}>
              {Array.isArray(specificHours) &&
                specificHours?.length > 0 &&
                specificHours?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                        borderLeft: theme => (index === activeValue ? `3px solid ${theme.palette.primary.main}` : 'none'),
                      }}
                    >
                      <Box
                        sx={{
                          py: 2,
                          pl: index === activeValue ? '13px' : '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          cursor: 'pointer',
                          width: '100%',
                          borderTopRightRadius: '8px',
                          borderBottomRightRadius: '8px'
                        }}
                        onClick={() => handleActiveValue(item, index)}
                      >
                        <Box
                          component={Icon}
                          icon={item?.icon}
                          sx={{
                            color: theme => (index === activeValue ? theme.palette.primary.main : theme.palette.text.primary),
                            fontSize: '1.25rem'
                          }}
                        />
                        <Typography
                          sx={{
                            color: theme => (index === activeValue ? theme.palette.primary.main : theme.palette.text.primary),
                            width: 'max-content'
                          }}
                        >
                          {item?.name}
                        </Typography>
                        {item?.name === "Exceptions" && (
                          <Tooltip
                            title={
                              <>
                                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                                  Use <b>special days</b> for times when the restaurant functions on a different schedule than usual.
                                </Typography>
                                <Typography variant="body2">
                                  Use <b>pause services</b> to stop one or more services right away.
                                </Typography>
                              </>
                            }
                            arrow
                            placement="top"
                            slotProps={{
                              tooltip: {
                                sx: {
                                  color: "white",
                                  backgroundColor: "white",
                                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                                  p: 4,
                                  '& .MuiTooltip-arrow': { color: "white" },
                                },
                              },
                            }}
                          >
                            <IconButton sx={{ p: 0 }}>
                              <Box
                                component={Icon}
                                icon="mdi:information-outline"
                                sx={{
                                  color: theme => (index === activeValue ? theme.palette.primary.main : theme.palette.text.primary),
                                  fontSize: '1.25rem'
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  )
                })}
            </Box>
            {md && <Divider orientation='vertical' />}
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
                <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
                  {specificHours[Number(activeValue)].name}
                </Typography>
                <Box>
                  {Number(activeValue) > 0 && Number(activeValue) <= 4 && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ p: '0.3rem' }}
                          checked={serviceScheduleData[Number(activeValue)]?.is_same_as_opening_hours}
                          onChange={handleSameHours}
                        />
                      }
                      label="Same as Opening Hours"
                    />
                  )}
                  {(specificHours[Number(activeValue)].name === "Exceptions") ? <LoadingButton variant='contained' size='small'
                    disabled={Boolean(isFormShow.show)}
                    onClick={() => setIsFormShow({ type: "ADD", show: true })}
                  >
                    Add Holdiay / Pause Services
                  </LoadingButton> :
                    <LoadingButton
                      variant='contained'
                      size='small'
                      onClick={() => handleSave(serviceScheduleData[Number(activeValue)]?.services)}
                      loading={loading}
                      loadingPosition='start'
                      startIcon={<Icon icon={'material-symbols:save-rounded'} />}
                    >
                      Save
                    </LoadingButton>}
                </Box>
              </Box>
              <Box sx={{ width: '100%', height: 'calc(100% - 3.5rem)', overflow: 'auto', pt: 4, px: 4 }}>
                {
                  Number(activeValue) <= 4
                    ? <CsHours
                      disabled={serviceScheduleData[Number(activeValue)]?.is_same_as_opening_hours}
                      weekDays={weekDays}
                      setWeekDays={setWeekDays}

                    />
                    : Number(activeValue) === 5
                      ? <Holiday isFormShow={isFormShow} setIsFormShow={setIsFormShow} />
                      : Number(activeValue) === 6
                        ? <PauseSerivce />
                        : null
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      <Alert
        open={isSave?.open}
        onClose={() => setIsSave({ open: false, value: null })}
        handleDelete={handleDelete}
        loading={loading}
      />
    </>
  )
}

export default OpeningHoursView
