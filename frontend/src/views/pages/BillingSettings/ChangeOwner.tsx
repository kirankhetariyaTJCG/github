// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'
import CsMobileNo from '@/@core/components/CsMobileNo'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface NameData {
  first_name: string
  last_name: string
  company_name: string
  mobile_no: string
  email: string
}

const ChangeOwner = () => {
  // State
  const [stdCode, setStdCode] = useState<{ value: string; label: string }>({ value: '91', label: '+91' })

  const schema = yup.object().shape({
    first_name: yup.string().required(ErrorConstants.FIRST_NAME_ERROR),
    last_name: yup.string().required(ErrorConstants.LAST_NAME_ERROR),
    company_name: yup.string().required(ErrorConstants.COMPANY_NAME_ERROR),
    mobile_no: yup.string().required(ErrorConstants.MOBILE_NO_ERROR),
    email: yup.string().required(ErrorConstants.EMAIL_ERROR).email(ErrorConstants.VALID_EMAIL_ERROR)
  })

  const values: NameData = {
    first_name: '',
    last_name: '',
    company_name: '',
    mobile_no: '',
    email: ''
  }

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (values: NameData) => console.log('Values -->', values)
  })

  return (
    <>
      <Typography sx={{ mb: 4 }}>
        As an Authorized Company Contact with the details mentioned in the{' '}
        <span style={{ fontWeight: 'bold' }}> Existing owner</span> section, i request the transfer of the account to
        the Authorized Representative of a 3rd party business, having the contact details mentioned below in the{' '}
        <span style={{ fontWeight: 'bold' }}>New Owner</span> section.
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 700 }}>Existing owner (Assignor):</Typography>
        </Grid>
        <Grid item xs={12}>
          <CsTextField
            fullWidth
            label='Company Name (legal entity)'
            StartIcon={<Icon icon={'lets-icons:shop-light'} fontSize={'1.25rem'} />}
            value={'dsad'}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='First Name'
            StartIcon={<Icon icon={'ci:user-02'} fontSize={'1.25rem'} />}
            value={'Jhon'}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='Last Name'
            StartIcon={<Icon icon={'ci:user-02'} fontSize={'1.25rem'} />}
            value={'Doe'}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='Email'
            StartIcon={<Icon icon={'mdi:email-outline'} fontSize={'1.25rem'} />}
            name='email'
            value={'gogec41620@padvn.com'}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsMobileNo
            sx={{ width: '100%', mb: 6 }}
            fullWidth
            label={'Mobile Number'}
            value={'2255889960'}
            stdcode={{ value: '49', label: '+49' }}
            disabled={true}
            onChange={() => console.log('')}
            stdCodeChange={() => console.log('')}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 700 }}>New Owner (Assignee):</Typography>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='Email'
            placeholder='Enter Email'
            StartIcon={<Icon icon={'mdi:email-outline'} fontSize={'1.25rem'} />}
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CsMobileNo
            sx={{ width: '100%', mb: 6 }}
            fullWidth
            label={'Mobile Number'}
            name='mobile_no'
            placeholder={'Mobile Number'}
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
        </Grid>
      </Grid>
    </>
  )
}

export default ChangeOwner
