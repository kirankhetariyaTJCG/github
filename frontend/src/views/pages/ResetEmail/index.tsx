'use client'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import { Box, Card, LoadingButton, TextField, Typography, CardContent } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { resetEmail } from '@/redux-store/Auth/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import Storage from '@/Helper/Storage'
import Constants from '@/Helper/Constants'
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

type FormData = {
  newEmail: string
}

const ResetEmailView = () => {
  // Hooks
  const { token } = useParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoading } = useSelector((state: any) => state.auth)

  const schema = yup.object().shape({
    newEmail: yup.string().required(ErrorConstants.EMAIL_ERROR).email(ErrorConstants.VALID_EMAIL_ERROR)
  })

  const initialValues: FormData = {
    newEmail: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values: FormData) => {
      const res = await resetEmail({ token: token, new_email: values?.newEmail }, dispatch)
      if (res?.success && res?.statusCode === 200) {
        const data = Storage.get<any>(Constants.REMEMBER_ME)
        if (AppUtils.checkValue(data)) {
          Storage.set(Constants.REMEMBER_ME, { ...data, email: values?.newEmail })
        }
        formik.resetForm()
        router.push('/login')
      }
    }
  })

  const handleBackLogin = () => {
    formik.resetForm()
    router.push('/login')
  }

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh' }}>
      <Card sx={{ p: 4, width: { xs: '100%', sm: '460px' }, position: 'relative', zIndex: 2 }}>
        <Typography
          sx={{
            mb: 3,
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 700,
            color: theme => theme.palette.text.primary
          }}
        >
          Reset Email
        </Typography>
        <Typography sx={{ mb: 4, fontWeight: 500 }}>
          Please ensure the new email address is different from any previously used addresses.
        </Typography>
        <Box component={'form'} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            sx={{ mb: 6 }}
            fullWidth
            label='Email'
            placeholder='Enter Email'
            name='newEmail'
            value={formik.values.newEmail}
            onChange={formik.handleChange}
            error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
            helperText={formik.touched.newEmail && formik.errors.newEmail}
          />
          <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isLoading}>
            Send New Email
          </LoadingButton>
          <LoadingButton
            fullWidth
            size='large'
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, mt: 4 }}
            startIcon={<Icon icon={'akar-icons:arrow-back'} />}
            disabled={isLoading}
            onClick={handleBackLogin}
          >
            Back to Login
          </LoadingButton>
        </Box>
      </Card>
      <Box
        component={'img'}
        src={'/images/pages/auth-v1-mask-3-light.png'}
        sx={{ width: '100%', height: 'auto', position: 'absolute', bottom: '1rem', zIndex: '1', display: { xs: 'none', sm: 'block' } }}
      />
    </Box>
  )
}

export default ResetEmailView
