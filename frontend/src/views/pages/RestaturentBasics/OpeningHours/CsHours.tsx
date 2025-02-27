// MUI Imports
import { Box, Grid, IconButton, FormControlLabel, Checkbox, Typography, Tooltip } from '@/Helper/MUIImports'

// Custom Imports
import CsDatePicker from '@/@core/components/CsDatePicker'

// Third Party Imports
import moment from 'moment'

// Iocn Imports
import Icon from '@/@core/components/Icon'

const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const CsHours = (props: any) => {
  // Props
  const { weekDays, disabled, setWeekDays } = props

  const Closed = () => {
    return (
      <Grid
        item
        xs={12}
        sx={{
          textAlign: 'center',
          p: 3,
          bgcolor: theme => theme.palette.secondary.darkerOpacity,
          borderRadius: '0.375rem',
          userSelect: 'none'
        }}
      >
        <Typography sx={{ fontWeight: 600, color: theme => disabled ? theme.palette.text.disabled : theme.palette.text.primary }}>Closed</Typography>
      </Grid>
    )
  }

  const handleOpenCloseChange = (day: any, dayIndex: number) => {
    if (disabled) return;

    let hours = weekDays?.map((val: any, i: number) =>
      i === dayIndex
        ? {
          ...val,
          is_selected: !day?.is_selected,
          hours: day?.is_selected
            ? [{ start_time: null, end_time: null }]
            : val?.hours
        }
        : { ...val }
    );

    setWeekDays(hours);
  };


  const handleTimeChange = (date: any, dayIndex: number, timeIndex: number, key: 'start_time' | 'end_time') => {
    if (disabled) return
    const hours = weekDays?.map((val: any, i: number) =>
      i === dayIndex
        ? {
          ...val,
          hours: val?.hours.map((s: any, idx: number) =>
            idx === timeIndex ? { ...s, [key]: moment(date).valueOf() } : s
          )
        }
        : val
    )
    setWeekDays(hours)
  }

  const handleRemoveSlot = (dayIndex: number, timeIndex: number) => {
    const updatedWeekDays = weekDays?.map((item: any, index: number) => {
      if (index === dayIndex) {
        return {
          ...item,
          hours: item.hours?.filter((_: any, i: number) => i !== timeIndex)
        };
      }
      return item;
    });

    setWeekDays(updatedWeekDays)
  }

  const addTimeSlot = (dayIndex: number) => {
    const hours = weekDays?.map((item: any, index: number) => index === dayIndex
      ? { ...item, hours: [...item.hours, { start_time: moment().valueOf(), end_time: moment().add(15, 'minutes').valueOf() }] }
      : item
    )
    !disabled && setWeekDays(hours)
  }

  const copySlots = (dayIndex: number) => {
    const sourceTimeSlots = weekDays[dayIndex].hours
    let hours = weekDays.map((item: any) => ({
      ...item,
      hours: item.is_selected ? sourceTimeSlots : item.hours
    }))
    !disabled && setWeekDays(hours)
  }

  return (
    <Box>
      {Array.isArray(weekDays) &&
        weekDays?.length > 0 &&
        weekDays?.map((day: any, dayIndex: number) => {
          return (
            <Grid container key={dayIndex} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  disabled={disabled}
                  control={
                    <Checkbox checked={day?.is_selected} onChange={() => handleOpenCloseChange(day, dayIndex)} />
                  }
                  label={weekNames[dayIndex]}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                {Array.isArray(day?.hours) &&
                  day?.hours?.length > 0 &&
                  day?.hours?.map((hour: any, timeIndex: number) => {
                    return (
                      <Grid container sx={{ mb: day?.hours?.length > 1 ? 3 : 0 }} key={timeIndex}>
                        {day?.is_selected ? (
                          <>
                            <Grid item xs={12} sm={4.5}>
                              <CsDatePicker
                                disabled={disabled}
                                sx={{ pr: { sm: 4 }, pb: { xs: 4, sm: 0 } }}
                                placeholderText='Opening Time'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption='Time'
                                dateFormat='h:mm aa'
                                selected={hour?.start_time ? moment(hour?.start_time).toDate() : null}
                                onChange={(date: any) => handleTimeChange(date, dayIndex, timeIndex, 'start_time')}
                                InputProps={{ readOnly: true }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4.5}>
                              <CsDatePicker
                                disabled={disabled}
                                placeholderText='Closing Time'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption='Time'
                                dateFormat='h:mm aa'
                                selected={hour?.end_time ? moment(hour?.end_time).toDate() : null}
                                onChange={(date: any) => handleTimeChange(date, dayIndex, timeIndex, 'end_time')}
                                InputProps={{ readOnly: true }}
                                minTime={
                                  hour?.start_time
                                    ? moment(hour?.start_time)
                                      .add(15, 'minutes')
                                      .toDate()
                                    : moment().startOf('day').toDate()
                                }
                                maxTime={moment().endOf('day').toDate()}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={3}
                              sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
                            >
                              {timeIndex > 0 ? (
                                <Tooltip title='Remove this time slot' arrow>
                                  <IconButton
                                    color='error'
                                    onClick={() => handleRemoveSlot(dayIndex, timeIndex)}

                                  >
                                    <Icon icon={'gg:close-o'} />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <>
                                  <Tooltip title='Add Time Slot' arrow>
                                    <IconButton
                                      disabled={disabled}
                                      color='primary'
                                      onClick={() => addTimeSlot(dayIndex)}
                                    >
                                      <Icon icon={'mdi:plus'} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title='Copy this time slot for all days' arrow>
                                    <IconButton
                                      disabled={disabled}
                                      color='info'
                                      onClick={() => copySlots(dayIndex)}
                                    >
                                      <Icon icon={'iconamoon:copy'} />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                            </Grid>
                          </>
                        ) : (
                          <Closed />
                        )}
                      </Grid>
                    )
                  })}
              </Grid>
            </Grid>
          )
        })}
    </Box>
  )
}

export default CsHours
