// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, FormControlLabel, Checkbox } from '@/Helper/MUIImports'

// Custom Imports
import CsDatePicker from '@/@core/components/CsDatePicker'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { Step3Values } from './AddEditPromo'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface ModelProps {
  open: boolean
  setOpen: (state: { open: boolean; row: any, type: keyof Step3Values }) => void
  row?: any
}

const weekNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const DaysTime = (props: ModelProps & { handleSave: (data: { days: string[], start_time: any, end_time: any }) => void }) => {
  // Props
  const { open, setOpen, handleSave, row } = props

  // State
  const [days, setDays] = useState<any[]>(weekNames)
  const [startTime, setStartTime] = useState<Date | null>(new Date())
  const [endTime, setEndTime] = useState<Date | null>(new Date())

  // Hooks
  useEffect(() => {
    if (open) {
      if (Object?.keys(row)?.length > 0) {
        setDays(row?.days ? row?.days : weekNames)
        setStartTime(row?.start_time ? row?.start_time : new Date())
        setEndTime(row?.end_time ? row?.end_time : new Date())
      } else {
        setDays(weekNames)
        setStartTime(new Date())
        setEndTime(new Date())
      }
    }
  }, [open])

  const handleCheckboxChange = (week: string) => {
    setDays((prevDays) =>
      prevDays.includes(week)
        ? prevDays.filter((day) => day !== week)
        : [...prevDays, week]
    )
  };

  const handleClose = () => {
    setOpen({ open: false, row: {}, type: 'fulfillment_days' })
    setEndTime(null)
    setStartTime(null)
  }

  return (
    <>
      <Dialog open={open} sx={{ '& .MuiPaper-root': { overflow: 'unset' } }}>
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
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
            Days
          </Typography>
          <IconButton sx={{ fontSize: 25 }} onClick={handleClose}>
            <Icon icon={'ic:round-close'} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
          <Box>
            {Array.isArray(weekNames) && weekNames.length > 0 &&
              weekNames.map((week, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={days.includes(week)}
                      onChange={() => handleCheckboxChange(week)}
                    />
                  }
                  label={week}
                />
              ))
            }
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 4 }}>
            <CsDatePicker
              placeholderText='Start Time'
              showTimeSelect
              showTimeSelectOnly
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="HH:mm"
              selected={startTime}
              onChange={(date: any) => setStartTime(date)}
            />
            <CsDatePicker
              placeholderText='End Time'
              showTimeSelect
              showTimeSelectOnly
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="HH:mm"
              selected={endTime}
              onChange={(date: any) => setEndTime(date)}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            pt: '1rem !important',
            p: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <LoadingButton
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={handleClose}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant='contained'
            disabled={(!AppUtils.checkValue(startTime) && !AppUtils.checkValue(endTime)) || days?.length === 0}
            onClick={() => {
              if (AppUtils.checkValue(startTime) && AppUtils.checkValue(endTime) && days?.length > 0) {
                handleSave({ days: days, start_time: startTime, end_time: endTime })
                handleClose()
              }
            }}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DaysTime
