'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, Card, Typography, TextField, InputAdornment, IconButton, Avatar, Tooltip } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDropzone } from 'react-dropzone'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { changeEmailRequest, forgotPassword, removeProfileImage, updateProfile } from '@/redux-store/Auth/Action'
import { auth_data, is_loading } from '@/redux-store/Auth'
import { fetchAuthUser } from '@/redux-store/Auth'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import UrlHelper from '@/Helper/Url'
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Value {
  firstName: string
  lastName: string
  email: string
  profileImage: any
}

const MyProfileView = () => {

  // State
  const [oldImngPath, setOldImgPath] = useState<string>('')

  // Hooks
  const authData = useSelector(auth_data)
  const isLoading = useSelector(is_loading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(authData) && Object?.keys(authData)?.length > 0) {
      formik.setFieldValue('firstName', authData?.first_name ? authData?.first_name : '')
      formik.setFieldValue('lastName', authData?.last_name ? authData?.last_name : '')
      formik.setFieldValue('email', authData?.email ? authData?.email : '')
      formik.setFieldValue('profileImage', authData?.profile_image ? authData?.profile_image : null)
      setOldImgPath(authData?.profile_image ? authData?.profile_image : '')
    }
  }, [authData])

  const initialValue: Value = { firstName: '', lastName: '', profileImage: null, email: '' }

  const schema = yup.object().shape({
    firstName: yup.string().required(ErrorConstants.FIRST_NAME_ERROR),
    lastName: yup.string().required(ErrorConstants.LAST_NAME_ERROR),
  })

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: async (value: Value) => {
      if (AppUtils.checkValue(oldImngPath) && !AppUtils.checkValue(value?.profileImage)) {
        await removeProfileImage({ user_id: authData?._id, file_path: oldImngPath }, dispatch)
        setOldImgPath('')
      }

      const res = await updateProfile({
        first_name: value.firstName,
        last_name: value.lastName,
        profile_image: value.profileImage,
        user_id: authData?._id
      }, dispatch)

      res?.success && res?.statusCode === 200 && dispatch(fetchAuthUser({ ...res?.data }))
    }
  })

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: Constants.IMAGE_SIZE,
    accept: Constants.IMAGE_TYPE,
    onDrop: (acceptedFiles: any) => acceptedFiles.forEach((file: File) => formik.setFieldValue('profileImage', file))
  })

  return (
    <Card sx={{ width: '40rem', height: '100%', mx: 'auto' }}>
      <Box
        sx={{
          p: 4,
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>My Profile</Typography>
        <LoadingButton
          variant='contained'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<Icon icon="material-symbols:save" fontSize='5.5rem' />}
          onClick={() => formik.handleSubmit()}
        >
          Save
        </LoadingButton>
      </Box>
      <Box sx={{ p: 4, height: '100%', overflow: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, mb: 6, mx: 'auto' }}>
            <Avatar
              variant='rounded'
              src={
                formik.values.profileImage
                  ? formik.values.profileImage instanceof Blob
                    ? URL.createObjectURL(formik.values.profileImage)
                    : `${UrlHelper.imgPath}${formik.values.profileImage}`
                  : '/images/avatars/1.png'
              }
              sx={{ width: 100, height: 100 }}
            />
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <LoadingButton {...getRootProps()} variant='contained'>
                  <input {...getInputProps()} />
                  Upload Photo
                </LoadingButton>
                <LoadingButton
                  color='error'
                  variant='outlined'
                  disabled={!AppUtils.checkValue(formik.values.profileImage)}
                  onClick={() => formik.setFieldValue('profileImage', null)}
                >
                  Reset
                </LoadingButton>
              </Box>
              <Typography>Allowed JPG, JPEG or PNG</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <TextField
            sx={{ width: '100%', mb: 4 }}
            fullWidth
            label={'First Name'}
            placeholder='Enter First Name'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'uil:user'} />
                </InputAdornment>
              )
            }}
          />
          <TextField
            sx={{ width: '100%', mb: 4 }}
            fullWidth
            label={'Last Name'}
            placeholder='Enter Last Name'
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'uil:user'} />
                </InputAdornment>
              )
            }}
          />
          <TextField
            sx={{ width: '100%', mb: 4 }}
            fullWidth
            value={formik.values.email}
            label='Email'
            disabled={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'line-md:email-twotone'} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip title='Send request to change email' arrow>
                    <IconButton
                      color='primary'
                      sx={{ color: theme => `${theme.palette.primary.main} !important` }}
                      onClick={() => changeEmailRequest({ user_id: authData?._id }, dispatch)}
                      disabled={isLoading}
                    >
                      <Box component={Icon} icon={'mingcute:send-line'} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
          <TextField
            sx={{ width: '100%', mb: 4 }}
            fullWidth
            type={'password'}
            value={'123456789'}
            label='Password'
            disabled={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'ph:password-fill'} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip title='Send request to change password' arrow>
                    <IconButton
                      color='primary'
                      sx={{ color: theme => `${theme.palette.primary.main} !important` }}
                      onClick={() => forgotPassword({ email: formik.values.email,type:'change-password'}, dispatch)}
                      disabled={isLoading}
                    >
                      <Box component={Icon} icon={'mingcute:send-line'} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
    </Card>
  )
}

export default MyProfileView
