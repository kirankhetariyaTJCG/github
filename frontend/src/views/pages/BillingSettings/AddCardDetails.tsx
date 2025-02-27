// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Improts
import CsTextField from '@/@core/components/CsTextField'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Values {
  name: string
  card_no: string
  expiry_date: string
  cvv: string
  mobile_no: string
}

const AddCardDetails = () => {
  // Hooks
  const theme = useTheme()

  const values: Values = { name: '', card_no: '', expiry_date: '', cvv: '', mobile_no: '' }

  const schema = yup.object().shape({
    name: yup.string().required(ErrorConstants.CARD_HOLDER_ERROR),
    card_no: yup.string().required(ErrorConstants.CARD_NO_ERROR),
    cvv: yup.string().required(ErrorConstants.CVV_ERROR),
    expiry_date: yup.string().required(ErrorConstants.EXPIRY_DATE_ERROR),
    mobile_no: yup.string().required(ErrorConstants.MOBILE_NO_ERROR)
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Values) => console.log('Values _.', value)
  })

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, mb: 4 }}>Enter Your Card Details:</Typography>
      <CsTextField
        fullWidth
        label='Name'
        placeholder='Enter Name'
        sx={{ mb: 4 }}
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        StartIcon={<Icon icon={'lets-icons:user-box'} fontSize={'1.25rem'} />}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <CsTextField
            fullWidth
            label='Card Number'
            placeholder='Enter Card Number'
            sx={{ mb: 4 }}
            name='card_no'
            value={formik.values.card_no}
            onChange={(e: any) => {
              formik.setFieldValue(
                'card_no',
                e.target.value
                  .replace(/\D/g, '')
                  .slice(0, 16)
                  .replace(/(\d{4})(?=\d)/g, '$1 ')
              )
            }}
            error={formik.touched.card_no && Boolean(formik.errors.card_no)}
            helperText={formik.touched.card_no && formik.errors.card_no}
            StartIcon={<Icon icon={'gg:credit-card'} fontSize={'1.25rem'} />}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CsTextField
            fullWidth
            label='Expiry Date'
            placeholder='MM/YY'
            sx={{ mb: 4 }}
            name='expiry_date'
            value={formik.values.expiry_date}
            onChange={(e: any) => {
              e.target.value = e.target.value.replace(/\D/g, '')

              if (e.target.value.length > 2) {
                e.target.value = `${e.target.value.slice(0, 2)}/${e.target.value.slice(2, 4)}`
              }

              formik.setFieldValue('expiry_date', e.target.value)
            }}
            error={formik.touched.expiry_date && Boolean(formik.errors.expiry_date)}
            helperText={formik.touched.expiry_date && formik.errors.expiry_date}
            StartIcon={<Icon icon={'gg:credit-card'} fontSize={'1.25rem'} />}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CsTextField
            fullWidth
            label='CVV'
            placeholder='Enter CVV Code'
            sx={{ mb: 4 }}
            name='cvv'
            value={formik.values.cvv}
            onChange={(e: any) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 3)
              formik.handleChange(e)
            }}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
            StartIcon={<Icon icon={'gg:credit-card'} fontSize={'1.25rem'} />}
          />
        </Grid>
      </Grid>
      <CsTextField
        fullWidth
        label='Card Holder Mobile No'
        placeholder='Enter Mobile No'
        name='mobile_no'
        value={formik.values.mobile_no}
        onChange={(e: any) => {
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10)
          formik.handleChange(e)
        }}
        error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
        helperText={formik.touched.mobile_no && formik.errors.mobile_no}
        StartIcon={<Icon icon={'fluent:call-28-regular'} fontSize={'1.25rem'} />}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Tooltip
                title={
                  <>
                    <Typography sx={{ fontSize: '0.8rem', mb: 2 }}>
                      For services which require a recurrent charge we may send you a SMS in case something goes wrong.
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem' }}>
                      This SMS service is free and may help avoid a possible service interruption.
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
                <IconButton sx={{ p: 1 }}>
                  <Icon icon={'akar-icons:info'} />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: 4,
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Box
          component={'img'}
          src='/images/Setup/SSL.svg'
          sx={{ mr: { xs: 0, sm: 2.5 }, width: '6rem', mb: { xs: 2.5, sm: 0 } }}
        />
        <Box
          component={'img'}
          src='/images/Setup/Safe.svg'
          sx={{ ml: { xs: 0, sm: 2.5 }, width: '6rem', mt: { xs: 2.5, sm: 0 } }}
        />
      </Box>
    </Box>
  )
}

export default AddCardDetails
