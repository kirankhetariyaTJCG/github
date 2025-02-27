// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import PlaceAutocomplete from '@/@core/components/PlaceAutocomplete'
import CsMobileNo from '@/@core/components/CsMobileNo'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Values {
  company_name: string
  name: string
  mobile_no: string
  address: string
  vat_id: string
  email: string
}

const BillingAddress = () => {
  // States
  const [stdCode, setStdCode] = useState<{ value: string; label: string }>({ value: '91', label: '+91' })

  const values: Values = { company_name: '', name: '', mobile_no: '', address: '', vat_id: '', email: '' }

  const schema = yup.object().shape({
    company_name: yup.string().required(ErrorConstants.COMPANY_NAME_ERROR),
    name: yup.string().required(ErrorConstants.NAME_ERROR),
    mobile_no: yup.string().required(ErrorConstants.MOBILE_NO_ERROR),
    address: yup.string().required(ErrorConstants.ADDRESS_ERROR),
    email: yup.string().required(ErrorConstants.EMAIL_ERROR).email(ErrorConstants.VALID_EMAIL_ERROR)
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Values) => console.log('Values _.', value)
  })

  return (
    <Box sx={{ m: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          justifyContent: 'space-between',
          p: 2,
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '1.125rem', pl: 2 }}>Billing Address</Typography>
        <LoadingButton variant='contained'>Save</LoadingButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, p: 4, width: '100%' }}>
        <Box sx={{ width: '50%' }}>
          <TextField
            fullWidth
            label='Company Name'
            placeholder='Enter Company Name'
            name='company_name'
            value={formik.values.company_name}
            onChange={formik.handleChange}
            error={formik.touched.company_name && Boolean(formik.errors.company_name)}
            helperText={formik.touched.company_name && formik.errors.company_name}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'mingcute:building-5-line'} />
                </InputAdornment>
              )
            }}
          />
          <TextField
            sx={{ my: 6 }}
            fullWidth
            label='Name'
            placeholder='Enter Name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'uil:user'} />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            label='Billing Email'
            placeholder='Enter Billing Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'mdi:email-outline'} />
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <CsMobileNo
            sx={{ width: '100%' }}
            fullWidth
            label={'Restaturent Phone No'}
            name='mobile_no'
            placeholder={'Enter Restaturent Phone No'}
            value={formik.values.mobile_no}
            onChange={formik.handleChange}
            error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
            helperText={formik.touched.mobile_no && formik.errors.mobile_no}
            stdcode={stdCode}
            stdCodeChange={(val: { value: string; label: string; country_code_initials: string }) => {
              formik.setFieldValue('country_code', val?.value)
              setStdCode(val)
            }}
          />
          <PlaceAutocomplete
            sx={{ my: 6 }}
            label='Address'
            placeholder='Enter Address...'
            value={formik.values.address}
            onChange={(value: any, latLng?: { lat: number; lng: number }) => {
              formik.setFieldValue('address', value)
            }}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'mingcute:location-2-line'} />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            label='Vat ID'
            placeholder='Enter Vat ID'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'solar:user-id-outline'} />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default BillingAddress
