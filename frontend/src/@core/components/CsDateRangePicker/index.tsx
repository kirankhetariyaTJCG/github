// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Menu, MenuItem } from '@/Helper/MUIImports'

// Third Party Imports
import moment from 'moment'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
import CsDatePicker from '../CsDatePicker'

const options = [
  { label: 'Today', value: 1, startDate: moment().startOf('day'), endDate: moment().endOf('day') },
  {
    label: 'Yesterday',
    value: 2,
    startDate: moment().subtract(1, 'day').startOf('day'),
    endDate: moment().subtract(1, 'day').endOf('day')
  },
  {
    label: 'Last 7 Days',
    value: 3,
    startDate: moment().subtract(6, 'days').startOf('day'),
    endDate: moment().endOf('day')
  },
  {
    label: 'Last 14 Days',
    value: 4,
    startDate: moment().subtract(13, 'days').startOf('day'),
    endDate: moment().endOf('day')
  },
  {
    label: 'Last 28 Days',
    value: 5,
    startDate: moment().subtract(27, 'days').startOf('day'),
    endDate: moment().endOf('day')
  },
  { label: 'Custom Interval', value: 6 }
]

interface DateRangePickerProps {
  value: { label: string; value: number } | null
  setValue: (value: { label: string; value: number } | null) => void
  dateRange: { startDate: Date | null; endDate: Date | null }
  setDateRange: (range: { startDate: Date | null; endDate: Date | null }) => void
  size?: 'small' | 'medium' | 'large'
  customMenuStyles?: object
  customAutocompleteProps?: object
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  setValue,
  dateRange,
  setDateRange,
  size,
  customMenuStyles = {},
  customAutocompleteProps = {}
}) => {
  // State
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const normalizedSize = size === 'large' ? 'medium' : size;

  const handleCustomIntervalClick = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setAnchorEl(event.currentTarget)
    setMenuPosition({
      top: rect.bottom,
      left: rect.left
    })
  }

  const handleDateSelection = (newValue: any) => {
    if (newValue?.value !== 6) {
      setDateRange({ startDate: newValue?.startDate?.toDate() || null, endDate: newValue?.endDate?.toDate() || null })
    }
    setValue(newValue)
  }

  useEffect(() => {
    if (!dateRange.startDate && !dateRange.endDate && value?.value) {
      const selectedOption = options.find(option => option.value === value.value)
      setDateRange({
        startDate: selectedOption?.startDate?.toDate() || null,
        endDate: selectedOption?.endDate?.toDate() || null
      })
    }
  }, [value, dateRange, setDateRange])

  return (
    <>
      <CsAutocomplete
        size={normalizedSize}
        options={options}
        isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
        multiple={false}
        getOptionLabel={(option: any) => option?.label || ''}
        value={
          value?.value === 6
            ? {
              label: `${moment(dateRange.startDate).format('DD/MM/YYYY')} to ${moment(dateRange.endDate).format(
                'DD/MM/YYYY'
              )}`,
              value: 6
            }
            : value
        }
        onChange={(event: any, newValue: any) => {
          if (newValue?.value === 6) {
            handleCustomIntervalClick(event)
          }
          handleDateSelection(newValue)
        }}
        {...customAutocompleteProps}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorReference="anchorPosition"
        anchorPosition={{ top: menuPosition.top, left: menuPosition.left }}
        sx={{
          '& .MuiPaper-root': {
            height: 'auto',
            width: 'auto',
            overflow: 'visible'
          },
          ...customMenuStyles
        }}
      >
        <MenuItem>
          <CsDatePicker
            label="Select Start Date"
            name="start_date"
            placeholderText="Select Start Date"
            selected={dateRange.startDate}
            onChange={(date: Date | null) => setDateRange({ ...dateRange, startDate: date })}
          />
        </MenuItem>
        <MenuItem>
          <CsDatePicker
            label="Select End Date"
            name="end_date"
            placeholderText="Select End Date"
            selected={dateRange.endDate}
            onChange={(date: Date | null) => setDateRange({ ...dateRange, endDate: date })}
          />
        </MenuItem>
      </Menu>
    </>
  )
}

export default DateRangePicker
