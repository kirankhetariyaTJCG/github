// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Collapse from '@mui/material/Collapse'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'

// Custom Imports
import CsSelect from '@/@core/components/CsSelect'

interface Values {
  service_type: number
  services: any[]
  hours: string
  minutes: string
  is_full_day: boolean
  message: string
}

const options = [
  { label: '0', value: '0' },
  { label: '15', value: '15' },
  { label: '30', value: '30' },
  { label: '45', value: '45' }
]

const hours = [
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' }
]

const PauseSerivce = () => {
  const values: Values = {
    service_type: 1,
    services: [
      { label: 'Opening hours', checked: false },
      { label: 'Pickup service', checked: false },
      { label: 'Delivery service', checked: false },
      { label: 'Table reservation', checked: false },
      { label: 'On premise', checked: false }
    ],
    hours: '6',
    minutes: '0',
    is_full_day: false,
    message: ''
  }

  const formik = useFormik({ initialValues: values, onSubmit: (value: Values) => console.log('Value --->', value) })

  return (
    <Box
      sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}
    >
      <Box>
        <RadioGroup
          value={formik.values.service_type}
          onChange={(e: any) => formik.setFieldValue('service_type', Number(e.target.value))}
          row
        >
          <FormControlLabel value={1} control={<Radio />} label='All services' />
          <FormControlLabel value={2} control={<Radio />} label='Specific services' />
        </RadioGroup>
        <Box sx={{ display: 'flex' }}>
          <Collapse in={formik.values.service_type === 2}>
            {Array.isArray(formik.values.services) &&
              formik.values.services?.length > 0 &&
              formik.values.services?.map((item: any, index: number) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={item?.checked}
                        onChange={() =>
                          formik.setFieldValue(
                            'services',
                            formik.values.services?.map((val: any, i: number) =>
                              i === index ? { ...val, checked: !item?.checked } : { ...val }
                            )
                          )
                        }
                      />
                    }
                    label={item?.label}
                  />
                )
              })}
          </Collapse>
        </Box>
        <Typography sx={{ fontWeight: 600, my: 3 }}>Pause for</Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Hours</InputLabel>
              <Select
                disabled={formik.values.is_full_day}
                label='Hours'
                name='hours'
                value={formik.values.hours}
                onChange={(e: any) => formik.setFieldValue('hours', e.target.value)}
                error={formik.touched.hours && Boolean(formik.errors.hours)}
                MenuProps={{ style: { maxHeight: 250 } }}
              >
                {Array.isArray(hours) &&
                  hours?.length > 0 &&
                  hours?.map((item: any, index: number) => {
                    return (
                      <MenuItem key={index} value={item?.value}>
                        {item?.label}
                      </MenuItem>
                    )
                  })}
              </Select>
              {formik.touched.hours && Boolean(formik.errors.hours) && (
                <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                  {formik.touched.hours && formik.errors.hours}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Minutes</InputLabel>
              <Select
                disabled={formik.values.is_full_day}
                label='Minutes'
                name='minutes'
                value={formik.values.minutes}
                onChange={(e: any) => formik.setFieldValue('minutes', e.target.value)}
                error={formik.touched.minutes && Boolean(formik.errors.minutes)}
                MenuProps={{ style: { maxHeight: 250 } }}
              >
                {Array.isArray(options) &&
                  options?.length > 0 &&
                  options?.map((item: any, index: number) => {
                    return (
                      <MenuItem key={index} value={item?.value}>
                        {item?.label}
                      </MenuItem>
                    )
                  })}
              </Select>
              {formik.touched.minutes && Boolean(formik.errors.minutes) && (
                <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                  {formik.touched.minutes && formik.errors.minutes}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_full_day}
                  onChange={() => formik.setFieldValue('is_full_day', !formik.values.is_full_day)}
                />
              }
              label='Rest of the day'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label='Notification message (optional)'
              name='message'
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              inputProps={{ maxLength: 200 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography>{formik.values.message?.length} / 200</Typography>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', borderTop: theme => `1px solid ${theme.palette.divider}` }}>
        <LoadingButton variant='contained' size='large' sx={{ mt: 4 }} onClick={() => formik.handleSubmit()}>
          Save
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default PauseSerivce
