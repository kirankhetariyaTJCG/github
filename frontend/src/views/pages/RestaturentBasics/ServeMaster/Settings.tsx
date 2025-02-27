// React Imports
import { useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'
import CsSelect from '@/@core/components/CsSelect'

// Icon Imports
import Icon from '@/@core/components/Icon'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  borderBottom: '0.0625rem solid rgba(74, 74, 81, 0.3)'
}))

const Footer = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(3, 4),
  borderTop: `0.0625rem solid ${theme.palette.divider}`
}))

interface Props {
  open: boolean
  setOpen: (state: { open: boolean; data: any }) => void
  data?: any
}

interface Values {
  pickup: string
  pickup_type: string
  days: string
  delivery: string
  delivery_type: string
  time: string
  advance: string
}

const values: Values = {
  days: '4',
  delivery: '90',
  delivery_type: 'minutes',
  pickup: '1',
  pickup_type: 'hours',
  time: '15 minutes',
  advance: '4'
}

const initialReserveArray=[
  { label: 'Minimum guests:', value: '1', name: 'people' },
  { label: 'Maximum guests:', value: '8', name: 'people' },
  { label: 'Minimum time in advance:', value: '15', name: 'min' },
  { label: 'Maximum time in advance:', value: '8', name: 'days' },
  { label: 'When guests are late, hold table for:', value: '8', name: 'min' }
]

const timeOptions=[
  { label: '15 minutes', value: '15 minutes' },
  { label: '30 minutes', value: '30 minutes' },
  { label: '45 minutes', value: '45 minutes' },
  { label: '1 hour', value: '1 hour' },
  { label: '1.5 hours', value: '1.5 hours' },
  { label: '2 hours', value: '2 hours' },
  { label: '3 hours', value: '3 hours' },
  { label: '4 hours', value: '4 hours' },
  { label: '5 hours', value: '5 hours' },
  { label: '6 hours', value: '6 hourse' }
]
const Settings = (props: Props) => {
  // Props
  const { open, setOpen, data } = props

  // State
  const [reserve, setArr] = useState<any[]>(initialReserveArray);

  const schema = yup.object().shape({
    days: yup.string(),
    delivery: yup.string(),
    delivery_type: yup.string(),
    pickup: yup.string(),
    pickup_type: yup.string(),
    time: yup.string(),
    advance: yup.string()
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Values) => console.log('Value -->', value)
  })

  return (
    <Drawer
      open={open}
      onClose={() => setOpen({ open: false, data: {} })}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 350 } } }}
    >
      <Header>
        <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>{data?.name}</Typography>
        <IconButton size='small' onClick={() => setOpen({ open: false, data: {} })} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ overflow: 'auto', p: 4 }}>
        {data?.type === 2 && (
          <>
            <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, p: 4, borderRadius: '8px' }}>
              <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                Settings for pickup
              </Typography>
              <Box sx={{ mb: 4, mt: 2 }}>
                <Typography sx={{ mb: 2 }}>Minimum time in advance:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CsTextField
                    sx={{ width: '100%' }}
                    fullWidth
                    name='pickup'
                    value={formik.values.pickup}
                    onChange={formik.handleChange}
                    error={formik.touched.pickup && Boolean(formik.errors.pickup)}
                    helperText={formik.touched.pickup && formik.errors.pickup}
                  />
                  <CsSelect
                    sx={{ width: '100%' }}
                    fullWidth
                    name='pickup_type'
                    value={formik.values.pickup_type}
                    onChange={(e: any) => formik.setFieldValue('pickup_type', e.target.value)}
                    options={[
                      { label: 'Hours', value: 'hours' },
                      { label: 'Minutes', value: 'minutes' },
                      { label: 'Days', value: 'days' }
                    ]}
                    error={formik.touched.pickup_type && Boolean(formik.errors.pickup_type)}
                    helperText={String(formik.errors.pickup_type)}
                  />
                </Box>
              </Box>
              <Box>
                <Typography sx={{ mb: 2 }}>Maximum time in advance:</Typography>
                <CsTextField
                  name='advance'
                  value={formik.values.advance}
                  onChange={formik.handleChange}
                  error={formik.touched.advance && Boolean(formik.errors.advance)}
                  helperText={formik.touched.advance && formik.errors.advance}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography>Days</Typography>
                      </InputAdornment>
                    )
                  }}
                />
                {formik.values.advance === '' && (
                  <Typography sx={{ textAlign: 'center' }}>This means the same day only!</Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, p: 4, borderRadius: '8px', my: 4 }}>
              <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                Settings for delivery
              </Typography>
              <Box sx={{ mb: 4, mt: 2 }}>
                <Typography sx={{ mb: 2 }}>Minimum time in advance:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CsTextField
                    sx={{ width: '100%' }}
                    fullWidth
                    name='delivery'
                    value={formik.values.delivery}
                    onChange={formik.handleChange}
                    error={formik.touched.delivery && Boolean(formik.errors.delivery)}
                    helperText={formik.touched.delivery && formik.errors.delivery}
                  />

                  <CsSelect
                    sx={{ width: '100%' }}
                    fullWidth
                    name='delivery_type'
                    value={formik.values.delivery_type}
                    onChange={(e: any) => formik.setFieldValue('delivery_type', e.target.value)}
                    options={[
                      { label: 'Hours', value: 'hours' },
                      { label: 'Minutes', value: 'minutes' },
                      { label: 'Days', value: 'days' }
                    ]}
                    error={formik.touched.delivery_type && Boolean(formik.errors.delivery_type)}
                    helperText={String(formik.errors.delivery_type)}
                  />
                </Box>
              </Box>
              <Box>
                <Typography sx={{ mb: 2 }}>Maximum time in advance:</Typography>
                <CsTextField
                  name='days'
                  value={formik.values.days}
                  onChange={formik.handleChange}
                  error={formik.touched.days && Boolean(formik.errors.days)}
                  helperText={formik.touched.days && formik.errors.days}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography>Days</Typography>
                      </InputAdornment>
                    )
                  }}
                />
                {formik.values.days === '' && (
                  <Typography sx={{ textAlign: 'center' }}>This means the same day only!</Typography>
                )}
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography sx={{ mb: 2 }}>Time slot (every):</Typography>
                <CsSelect
                  name='time'
                  value={formik.values.time}
                  onChange={(e: any) => formik.setFieldValue('time', e.target.value)}
                  options={timeOptions}
                  MenuProps={{ style: { maxHeight: 250 } }}
                  error={formik.touched.time && Boolean(formik.errors.time)}
                  helperText={String(formik.errors.time)}
                />
              </Box>
            </Box>
            <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, p: 4, borderRadius: '8px' }}>
              <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                Other
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography>Hide “as soon as possible” (allow only scheduled orders)</Typography>
                <Switch />
              </Box>
            </Box>
          </>
        )}
        {data?.type === 1 && (
          <Box sx={{ p: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
            <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
              Settings
            </Typography>
            <Box sx={{ mt: 2 }}>
              {Array.isArray(reserve) &&
                reserve?.length > 0 &&
                reserve?.map((item: any, index: number) => {
                  return (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography sx={{ mb: 2 }}>{item?.label}</Typography>
                      <CsTextField
                        fullWidth
                        sx={{ width: '100%' }}
                        value={item?.value}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, '')
                          setArr(
                            reserve?.map((val: any, i: number) =>
                              i === index ? { ...val, value: e.target.value } : { ...val }
                            )
                          )
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Typography>{item?.name}</Typography>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                  )
                })}
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2 }}>
              <Typography>Allow guests to pre-order their food when booking a table</Typography>
              <Switch />
            </Box>
          </Box>
        )}
      </Box>
      <Footer>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          <LoadingButton size='large' variant='contained' sx={{ mr: 2.5 }} onClick={() => formik.handleSubmit()}>
            Save
          </LoadingButton>
          <LoadingButton
            size='large'
            variant='outlined'
            sx={{ ml: 2.5 }}
            color='secondary'
            onClick={() => formik.handleSubmit()}
          >
            Cancel
          </LoadingButton>
        </Box>
      </Footer>
    </Drawer>
  )
}

export default Settings
