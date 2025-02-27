'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, Card, Typography, Divider, TextField, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { loginUser } from '@/redux-store/Auth/Action'
import { fetchAuthUser } from '@/redux-store/Auth'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import themeConfig from '@/configs/themeConfig'
import Storage from '@/Helper/Storage'
import Constants from '@/Helper/Constants'
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

type FormData = {
  email: string
  password: string
  remember_me: boolean
}

const schema = yup.object().shape({
  email: yup.string().required(ErrorConstants.EMAIL_ERROR).email(ErrorConstants.VALID_EMAIL_ERROR),
  password: yup.string().required(ErrorConstants.PASSWORD_ERROR).min(8, ErrorConstants.MINIMUM_PASSWORD_ERROR)
})

const initialValues: FormData = {
  email: '',
  password: '',
  remember_me: false
}

const Login = () => {
  // States
  const [isShow, setIsShow] = useState<boolean>(false)

  // Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: any) => state.auth)

  useEffect(() => {
    Storage.remove(Constants.CONFIG_DATA)
    Storage.removeCookie(Constants.LOGGED_IN)
    Storage.removeCookie(Constants.PERMISSIONS)
  }, [])

  useEffect(() => {
    const rememberMe = Storage.get<any>(Constants.REMEMBER_ME)
    if (AppUtils.checkValue(rememberMe) && Object.keys(rememberMe).length > 0) {
      formik.setFieldValue('remember_me', true)
      formik.setFieldValue('email', rememberMe?.email)
      formik.setFieldValue('password', rememberMe?.password)
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values: FormData) => {
      const res = await loginUser({ email: values.email, password: values.password }, dispatch)
      if (res?.success && res?.statusCode === 200) {
        if (values.remember_me) {
          Storage.set(Constants.REMEMBER_ME, values)
        } else {
          Storage.remove(Constants.REMEMBER_ME);
        }
        Storage.set(Constants.CONFIG_DATA, {
          refreshToken: res?.data?.refreshToken,
          user_id: res?.data?.user?._id,
          restaurant_id: res?.data?.restaurant?._id,
          accessToken: res?.data?.accessToken,
          tokenIssueTime: new Date().getTime()
        })
        Storage.setCookie(Constants.LOGGED_IN, true, { expires: 7 })
        Storage.setDefaultCookie(Constants.PERMISSIONS, res?.data?.permissions, { expires: 7 })
        dispatch(
          fetchAuthUser({
            user_id: res?.data?.user?._id,
            restaurant_id: res?.data?.restaurant?._id,
            firstName: res?.data?.user?.first_name,
            lastName: res?.data?.user?.last_name,
            email: res?.data?.user?.email,
            restaurantName: res?.data?.restaurant?.name,
            accountType: res?.data?.restaurant?.accountType
          })
        )
        router.push('/setup/restaurant/details')
        formik.resetForm()
      }
    }
  })

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
          Login
        </Typography>
        <Typography variant='h4' sx={{ mb: 5 }}>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
        <Box component={'form'} noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
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
          <TextField
            fullWidth
            label='Password'
            type={isShow ? 'text' : 'password'}
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setIsShow(show => !show)} sx={{ fontSize: 25 }}>
                    <Icon icon={isShow ? 'mdi:eye-off-outline' : 'ph:eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => formik.setFieldValue('remember_me', !formik.values.remember_me)}
                  checked={formik.values.remember_me}
                />
              }
              label='Remember me'
            />
            <Typography
              color={'primary'}
              sx={{ fontWeight: 500, cursor: 'pointer' }}
              onClick={() => router.push('/forgot-password')}
            >
              Forgot password?
            </Typography>
          </Box>

          <LoadingButton
            fullWidth
            size='large'
            variant='contained'
            type='submit'
            loading={isLoading}
            loadingPosition='start'
            startIcon={isLoading ? <>&nbsp;</> : <></>}
          >
            LOGIN
          </LoadingButton>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Typography>New on our platform?</Typography>
            <Typography
              color={'primary'}
              sx={{ fontWeight: 500, cursor: 'pointer' }}
              onClick={() => router.push('/register')}
            >
              Create an account
            </Typography>
          </Box>
        </Box>

      </Card>
      <Box
        component={'img'}
        src={`/images/pages/auth-v1-mask-1-light.png`}
        sx={{ width: '100%', height: 'auto', position: 'absolute', bottom: '1rem', zIndex: '1', display: { xs: 'none', sm: 'block' } }}
      />
    </Box>
  )
}

export default Login
