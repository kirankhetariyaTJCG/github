'use client'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import { Card, LoadingButton, Typography, TextField, InputAdornment, IconButton, Box } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { resetPassword } from '@/redux-store/Auth/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import Storage from '@/Helper/Storage'
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

type FormData = {
  password: string
  confirmPassword: string
}

const ResetPasswordView = () => {
  // States
  const [isPass, setIsPass] = useState<boolean>(false)
  const [isConfirm, setIsConfirm] = useState<boolean>(false)

  // Hooks
  const { token } = useParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoading } = useSelector((state: any) => state.auth)

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, ErrorConstants.MINIMUM_PASSWORD_ERROR)
      .matches(Constants.PASSWORD_REGEX, ErrorConstants.STRONG_PASSWORD_ERROR)
      .required(ErrorConstants.PASSWORD_ERROR),
    confirmPassword: yup
      .string()
      .min(8, `Confirm ${ErrorConstants.MINIMUM_PASSWORD_ERROR}`)
      .oneOf([yup.ref('password')], ErrorConstants.MATCH_PASSWORD_ERROR)
      .required(`Confirm ${ErrorConstants.PASSWORD_ERROR}`)
  })

  const initialValues: FormData = {
    password: '',
    confirmPassword: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values: FormData) => {
      const resetPasswordData = {
        password: values.password,
        confirm_password: values.confirmPassword
      }
      const res = await resetPassword({ token: token, ...resetPasswordData }, dispatch)
      if (res?.success && res?.statusCode === 200) {
        const data = Storage.get<any>(Constants.REMEMBER_ME)
        if (AppUtils.checkValue(data)) {
          Storage.set(Constants.REMEMBER_ME, { ...data, password: values?.confirmPassword })
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
          Reset Password
        </Typography>
        <Typography sx={{ mb: 4, fontWeight: 500 }}>
          Your new password must be different from previously used passwords
        </Typography>
        <Box component={'form'} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            sx={{ mb: 6 }}
            fullWidth
            label='Password'
            placeholder='Enter Password'
            type={isPass ? 'text' : 'password'}
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setIsPass(!isPass)} sx={{ fontSize: 25 }}>
                    <Icon icon={isPass ? 'mdi:eye-off-outline' : 'ph:eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            sx={{ mb: 6 }}
            label='Confirm Password'
            placeholder='Enter Confirm Password'
            type={isConfirm ? 'text' : 'password'}
            name='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setIsConfirm(!isConfirm)} sx={{ fontSize: 25 }}>
                    <Icon icon={isConfirm ? 'mdi:eye-off-outline' : 'ph:eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isLoading}>
            Send New Password
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

export default ResetPasswordView
