'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { Card, Box, LoadingButton, TextField, Typography } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { forgotPassword } from '@/redux-store/Auth/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

type FormData = {
  email: string
}

const ForgotPasswordView = () => {
  // Hooks
  const dispatch = useDispatch()

  const router = useRouter()
  const { isLoading } = useSelector((state: any) => state.auth)

  const schema = yup.object().shape({
    email: yup.string().required(ErrorConstants.EMAIL_ERROR).email(ErrorConstants.VALID_EMAIL_ERROR)
  })

  const initialValues: FormData = {
    email: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values: FormData) => {
      const res = await forgotPassword({...values,type:'reset-password'}, dispatch)
      if (res?.success && res?.statusCode === 200) {
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
      <Card sx={{ p: 6, width: { xs: '100%', sm: '460px' }, position: 'relative', zIndex: 2 }}>
        <Typography
          sx={{
            mb: 3,
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 700,
            color: theme => theme.palette.text.primary
          }}
        >
          Forgot Password
        </Typography>
        <Typography variant='h4'>Forgot Password 🔒</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Typography className='mbs-1'>
            Enter your email and we&#39;ll send you instructions to reset your password
          </Typography>
          <Box component={'form'} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              sx={{ mb: 6 }}
              label='Email'
              placeholder='Enter Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isLoading}
              loadingPosition='start'
              startIcon={isLoading ? <>&nbsp;</> : <></>}
            >
              Send reset link
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
        </Box>
      </Card>
      <Box
        component={'img'}
        src={'/images/pages/auth-v1-mask-4-light.png'}
        sx={{ width: '100%', height: 'auto', position: 'absolute', bottom: '1rem', zIndex: '1', display: { xs: 'none', sm: 'block' } }}
      />
    </Box>
  )
}

export default ForgotPasswordView
