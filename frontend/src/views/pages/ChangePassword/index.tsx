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
import {changePassword } from '@/redux-store/Auth/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import Storage from '@/Helper/Storage'
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

type FormData = {
  oldPassword:string
  newPassword: string
  confirmNewPassword: string
}

const ChangePasswordView = () => {
  // States
  const [isPass, setIsPass] = useState<boolean>(false)
  const [isConfirm, setIsConfirm] = useState<boolean>(false)
  const [isOldPasswordHide,setIsOldPasswordHide] = useState<boolean>(false)

  // Hooks
  const { token } = useParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoading } = useSelector((state: any) => state.auth)

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required(ErrorConstants.OLD_PASSWORD),
    newPassword: yup
      .string()
      .min(8, ErrorConstants.MINIMUM_PASSWORD_ERROR)
      .matches(Constants.PASSWORD_REGEX, ErrorConstants.STRONG_PASSWORD_ERROR)
      .required(ErrorConstants.PASSWORD_ERROR),
      confirmNewPassword:yup
      .string()
      .min(8, `Confirm ${ErrorConstants.MINIMUM_PASSWORD_ERROR}`)
      .oneOf([yup.ref('newPassword')], ErrorConstants.MATCH_PASSWORD_ERROR)
      .required(`Confirm ${ErrorConstants.PASSWORD_ERROR}`)
  })

  const initialValues: FormData = {
    oldPassword:'',
    newPassword: '',
    confirmNewPassword: ''

  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values: FormData) => {
      const resetPasswordData = {
        current_password:values.oldPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmNewPassword
      }
      const res = await changePassword({ token: token, ...resetPasswordData }, dispatch)
      if (res?.success && res?.statusCode === 200)
        {
        const data = Storage.get<any>(Constants.REMEMBER_ME)
        if (AppUtils.checkValue(data)) {
          Storage.set(Constants.REMEMBER_ME, { ...data, password: values?.confirmNewPassword })
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
          Change Password
        </Typography>
        <Typography sx={{ mb: 4, fontWeight: 500 }}>
          Your new password must be different from previously used passwords
        </Typography>
        <Box component={'form'} noValidate onSubmit={formik.handleSubmit}>
        <TextField
            autoFocus
            sx={{ mb: 6 }}
            fullWidth
            label='Old Password'
            placeholder='Enter Old Password'
            type={isOldPasswordHide ? 'text' : 'password'}
            name='oldPassword'
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setIsOldPasswordHide(!isOldPasswordHide)} sx={{ fontSize: 25 }}>
                    <Icon icon={isOldPasswordHide ? 'mdi:eye-off-outline' : 'ph:eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            autoFocus
            sx={{ mb: 6 }}
            fullWidth
            label='New Password'
            placeholder='Enter New Password'
            type={isPass ? 'text' : 'password'}
            name='newPassword'
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
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
            label='Confirm New Password'
            placeholder='Enter Confirm New Password'
            type={isConfirm ? 'text' : 'password'}
            name='confirmNewPassword'
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
            helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
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
        src={'/images/pages/auth-v2-mask-4-light'}
        sx={{ width: '100%', height: 'auto', position: 'absolute', bottom: '1rem', zIndex: '1', display: { xs: 'none', sm: 'block' } }}
      />
    </Box>
  )
}

export default ChangePasswordView
