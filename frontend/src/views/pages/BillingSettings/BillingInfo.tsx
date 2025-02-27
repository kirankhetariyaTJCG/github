// MUI Imports
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'
import CsSelect from '@/@core/components/CsSelect'
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import countryOptions from '@/Helper/CountryName'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface NameData {
  first_name: string
  last_name: string
  company_name: string
  business_type: string
  mobile_no: string
  country: any
  state: string
  timezone: string
  city: string
  zip_code: string
  street_name: string
  location: string
  registration_no: string
  tax_no: string
  vat_id: string
}

const BillingInfo = () => {
  // Hooks
  const theme = useTheme()

  const schema = yup.object().shape({
    first_name: yup.string().required(ErrorConstants.FIRST_NAME_ERROR),
    last_name: yup.string().required(ErrorConstants.LAST_NAME_ERROR),
    company_name: yup.string().required(ErrorConstants.COMPANY_NAME_ERROR),
    mobile_no: yup.string().required(ErrorConstants.MOBILE_NO_ERROR),
    zip_code: yup.string().required(ErrorConstants.ZIPCODE_ERROR),
    street_name: yup.string().required(ErrorConstants.STREET_NAME_ERROR),
    city: yup.string().required(ErrorConstants.CITY_NAME_ERROR),
    country: yup.string().required(ErrorConstants.COUNTRY_ERROR),
    state: yup.string().required(ErrorConstants.STATE_ERROR),
    timezone: yup.string().required(ErrorConstants.TIMEZONE_ERROR)
  })

  const values: NameData = {
    first_name: '',
    last_name: '',
    company_name: '',
    business_type: 'Purchase as business / company',
    mobile_no: '',
    country: null,
    state: '',
    timezone: '',
    city: '',
    zip_code: '',
    street_name: '',
    location: '',
    registration_no: '',
    tax_no: '',
    vat_id: ''
  }

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (values: NameData) => console.log('Values -->', values)
  })

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <CsSelect
            sx={{ mb: 2 }}
            label='Business Type'
            name='business_type'
            value={formik.values.business_type}
            onChange={(e: any) => formik.setFieldValue('business_type', e.target.value)}
            StartIcon={<Icon icon={'gis:search-country'} fontSize={'1.25rem'} />}
            options={[
              { label: 'Purchase as business / company', value: 'Purchase as business / company' },
              {
                label: 'Purchase as authorized person / freelancer',
                value: 'Purchase as authorized person / freelancer'
              }
            ]}
            error={formik.touched.business_type && Boolean(formik.errors.business_type)}
            helperText={String(formik.errors.business_type)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='Company Name (legal entity)'
            placeholder='Enter Company Name'
            StartIcon={<Icon icon={'lets-icons:shop-light'} fontSize={'1.25rem'} />}
            name='company_name'
            value={formik.values.company_name}
            onChange={formik.handleChange}
            error={formik.touched.company_name && Boolean(formik.errors.company_name)}
            helperText={formik.touched.company_name && formik.errors.company_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='First Name'
            placeholder='Enter First Name'
            StartIcon={<Icon icon={'ci:user-02'} fontSize={'1.25rem'} />}
            name='first_name'
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='Last Name'
            placeholder='Enter last Name'
            StartIcon={<Icon icon={'ci:user-02'} fontSize={'1.25rem'} />}
            name='last_name'
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </Grid>
        <Grid item xs={12}>
          <CsTextField
            fullWidth
            label='Restaurant Mobile No'
            placeholder='Enter Restaurant Mobile No'
            name='mobile_no'
            value={formik.values.mobile_no}
            onChange={(e: any) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10)
              formik.handleChange(e)
            }}
            error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
            helperText={formik.touched.mobile_no && formik.errors.mobile_no}
            StartIcon={<Icon icon={'fluent:call-28-regular'} fontSize={'1.25rem'} />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CsAutocomplete
            options={countryOptions ?? []}
            getOptionLabel={(option: any) => option?.country_name || ''}
            value={formik.values.country}
            onChange={(e: any, value: any) => formik.setFieldValue('country', value)}
            label={'Country'}
            StartIcon={<Icon icon={'subway:world'} fontSize={'1.25rem'} />}
            placeholder='Choose a country'
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country && String(formik.errors.country)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CsSelect
            sx={{ mb: 2 }}
            label='State'
            name='state'
            value={formik.values.state}
            onChange={(e: any) => formik.setFieldValue('state', e.target.value)}
            StartIcon={<Icon icon={'gis:search-country'} fontSize={'1.25rem'} />}
            options={[
              { label: 'Gujarat', value: 10 },
              { label: 'Goa', value: 20 },
              { label: 'Delhi', value: 30 }
            ]}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={String(formik.errors.state)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CsTextField
            fullWidth
            label='City'
            sx={{ mb: 2 }}
            name='city'
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            StartIcon={<Icon icon={'clarity:map-line'} fontSize={'1.25rem'} />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='Address'
            placeholder='Enter Address'
            StartIcon={<Icon icon={'ep:location'} fontSize={'1.25rem'} />}
            name='location'
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='ZIP / Postal Code'
            sx={{ mb: 2 }}
            name='zip_code'
            value={formik.values.zip_code}
            onChange={formik.handleChange}
            error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
            helperText={formik.touched.zip_code && formik.errors.zip_code}
            StartIcon={<Icon icon={'clarity:map-line'} fontSize={'1.25rem'} />}
          />
        </Grid>

        <Grid item xs={12}>
          <CsTextField
            fullWidth
            label='VAT Identification No'
            placeholder='Enter VAT ID'
            sx={{ mb: 2 }}
            name='vat_id'
            value={formik.values.vat_id}
            onChange={formik.handleChange}
            error={formik.touched.vat_id && Boolean(formik.errors.vat_id)}
            helperText={formik.touched.vat_id && formik.errors.vat_id}
            StartIcon={<Icon icon={'solar:user-id-linear'} fontSize={'1.25rem'} />}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip
                    title={
                      <>
                        <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
                          What is a VAT ID number?
                        </Typography>
                        <Typography sx={{ fontWeight: 500, mb: 2, fontSize: '0.8rem' }}>
                          The VAT ID only applies to business customers within the European Union, if you don't have a
                          VAT ID, or if you are a private individual, you may leave this field blank.
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                          Please only enter capital letters and digits, do not include any blanks or other characters.
                          Example: DE123456789
                        </Typography>
                      </>
                    }
                    arrow
                    componentsProps={{
                      arrow: { sx: { color: '#fff' } },
                      tooltip: {
                        sx: {
                          bgcolor: '#fff',
                          boxShadow: theme.shadows[10],
                          p: 4
                        }
                      }
                    }}
                  >
                    <IconButton>
                      <Icon icon={'akar-icons:info'} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            By continuing you agree with{' '}
            <Typography
              component={'span'}
              sx={{
                color: theme => theme.palette.success.main,
                cursor: 'pointer',
                '&:hover': { color: theme => theme.palette.success.dark }
              }}
            >
              restaurant terms and conditions.
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default BillingInfo
