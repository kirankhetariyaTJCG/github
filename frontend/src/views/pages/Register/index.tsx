'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, Card, Typography, Divider, TextField, InputAdornment, IconButton } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { registerUser } from '@/redux-store/Auth/Action'
import { fetchAuthUser } from '@/redux-store/Auth'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import Storage from '@/Helper/Storage'
import Constants from '@/Helper/Constants'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

type FormData = {
  restaurantName: string
  firstName: string
  lastName: string
  email: string
  password: string
  accountType: number
}

const schema = yup.object().shape({
  restaurantName: yup.string().required(ErrorConstants.RESTAURANT_NAME_ERROR).min(2, ErrorConstants.MINIMUM_RESTAURANT_NAME_ERROR).max(50, ErrorConstants.MAXIMUM_RESTAURANT_NAME_ERROR),
  firstName: yup.string().required(ErrorConstants.FIRST_NAME_ERROR).min(3, ErrorConstants.MINIMUM_FIRST_NAME_ERROR).max(50, ErrorConstants.MAXIMUM_FIRST_NAME_ERROR),
  lastName: yup.string().required(ErrorConstants.LAST_NAME_ERROR).min(3, ErrorConstants.MINIMUM_LAST_NAME_ERROR).max(50, ErrorConstants.MAXIMUM_LAST_NAME_ERROR),
  email: yup.string().required(ErrorConstants.EMAIL_ERROR).email(ErrorConstants.VALID_EMAIL_ERROR),
  password: yup.string().required(ErrorConstants.PASSWORD_ERROR).min(8, ErrorConstants.MINIMUM_PASSWORD_ERROR)
})

const initialValues: FormData = {
  restaurantName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  accountType: 1
}

type registrationSteps = {
  userInformation: number,
  userRoleInformation: number
}

const registrationSteps: registrationSteps = {
  userInformation: 1,
  userRoleInformation: 2
}

const Register = () => {

  // States
  const [isShow, setIsShow] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)

  // Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: any) => state.auth)

  useEffect(() => {
    Storage.remove(Constants.CONFIG_DATA)
    Storage.removeCookie(Constants.LOGGED_IN)
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values: FormData) => {
      if (step === registrationSteps.userInformation) {
        setStep(step + 1)
      } else {
        const res = await registerUser({
          restaurant_name: values.restaurantName,
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          role: values.accountType === 1 ? "manager" : "reseller",
          user_type: values.accountType
        }, dispatch)

        if (res?.success && res?.statusCode === 201) {
          Storage.set(Constants.CONFIG_DATA, {
            refreshToken: res?.data?.refreshToken,
            user_id: res?.data?.user?._id,
            restaurant_id: res?.data?.restaurant?._id,
            accessToken: res?.data?.accessToken,
            tokenIssueTime: new Date().getTime()
          })
          Storage.setCookie(Constants.LOGGED_IN, true)
          dispatch(
            fetchAuthUser({
              ...values,
              user_id: res?.data?.user?._id,
              restaurant_id: res?.data?.restaurant?._id
            })
          )
          router.push('/setup/restaurant/details')
          formik.resetForm()
        }
      }
    }
  })

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh' }}>
      <Card sx={{ p: 4, width: { xs: '100%', sm: '550px' }, position: 'relative', zIndex: 2 }}>
        <Typography
          sx={{
            mb: 3,
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 700,
            color: theme => theme.palette.text.primary
          }}
        >
          Register
        </Typography>
        <Typography variant='h4' sx={{ mb: 5 }}>
          Adventure starts here 🚀
        </Typography>
        {step === registrationSteps.userInformation && (
          <Box component={'form'} noValidate autoComplete='off'>
            <TextField
              fullWidth
              sx={{ mb: 6 }}
              label='Restaurant Name'
              placeholder='Enter Restaurant Name'
              name='restaurantName'
              value={formik.values.restaurantName}
              onChange={formik.handleChange}
              error={formik.touched.restaurantName && Boolean(formik.errors.restaurantName)}
              helperText={formik.touched.restaurantName && formik.errors.restaurantName}
            />
            <TextField
              fullWidth
              sx={{ mb: 6 }}
              label='First Name'
              placeholder='Enter First Name'
              name='firstName'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              sx={{ mb: 6 }}
              label='Last Name'
              placeholder='Enter Last Name'
              name='lastName'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
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
              id='outlined-adornment-password'
              type={isShow ? 'text' : 'password'}
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' sx={{ p: 1 }} onClick={() => setIsShow(show => !show)}>
                      <Icon icon={isShow ? 'mdi:eye-off-outline' : 'ph:eye'} fontSize={30} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
        )}
        {step === registrationSteps.userRoleInformation && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '18rem',
                border: theme =>
                  `2px solid ${formik.values.accountType === 1 ? theme.palette.info.main : theme.palette.divider}`,
                borderRadius: '8px',
                width: '100%',
                textAlign: 'center',
                p: 4,
                '&:hover': { borderColor: theme => theme.palette.info.main, cursor: 'pointer' },
                '&:hover .icon': { transform: 'scale(1.1)' }
              }}
              onClick={() => formik.setFieldValue('accountType', 1)}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: theme => theme.palette.info.lightOpacity,
                  borderRadius: '100%',
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex'
                }}
                className='icon'
              >
                <Box
                  component={Icon}
                  icon={'mdi:user-tie'}
                  sx={{ color: theme => theme.palette.info.main, fontSize: 80 }}
                />
              </Box>
              <Typography
                sx={{ mt: 4, color: theme => theme.palette.text.primary, fontSize: '1.2rem', fontWeight: 600 }}
              >
                Restaurant Manager / Owner
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '18rem',
                border: theme =>
                  `2px solid ${formik.values.accountType === 2 ? theme.palette.info.main : theme.palette.divider}`,
                borderRadius: '8px',
                width: '100%',
                textAlign: 'center',
                p: 4,
                '&:hover': { borderColor: theme => theme.palette.info.main, cursor: 'pointer' },
                '&:hover .icon': { transform: 'scale(1.1)' }
              }}
              onClick={() => formik.setFieldValue('accountType', 2)}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: theme => theme.palette.info.lightOpacity,
                  borderRadius: '100%',
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex'
                }}
                className='icon'
              >
                <Box
                  component={Icon}
                  icon={'pepicons-pencil:handshake-circle'}
                  sx={{ color: theme => theme.palette.info.main, fontSize: 80, transition: 'all 0.2s ease-in-out' }}
                />
              </Box>
              <Typography
                sx={{ mt: 4, color: theme => theme.palette.text.primary, fontSize: '1.2rem', fontWeight: 600 }}
              >
                Partner / Freelancer / Reseller
              </Typography>
            </Box>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {step === registrationSteps.userRoleInformation && (
            <LoadingButton
              fullWidth
              size='large'
              variant='outlined'
              disabled={isLoading}
              sx={{ mt: 4 }}
              onClick={() => setStep(1)}
            >
              Back
            </LoadingButton>
          )}
          <LoadingButton
            fullWidth
            size='large'
            variant='contained'
            loading={isLoading}
            loadingPosition='start'
            startIcon={isLoading ? <>&nbsp;</> : <></>}
            sx={{ mt: 4 }}
            onClick={() => formik.handleSubmit()}
          >
            {step === 2 ? 'Register' : 'Next'}
          </LoadingButton>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Typography>Already have an account?</Typography>
          <Typography
            color={'primary'}
            sx={{ fontWeight: 500, cursor: 'pointer' }}
            onClick={() => router.push('/login')}
          >
            Sign in instead
          </Typography>
        </Box>
      </Card>
      <Box component={'img'}
        src={'/images/pages/auth-v1-mask-2-light.png'}
        sx={{ width: '100%', height: 'auto', position: 'absolute', bottom: '1rem', zIndex: '1', display: { xs: 'none', sm: 'block' } }}
      />
    </Box>
  )
}

export default Register
