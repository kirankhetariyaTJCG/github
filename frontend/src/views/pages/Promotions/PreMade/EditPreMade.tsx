// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'

// Custom Imports
import ChangeImage from '../../KickStarter/FirstPromos/ChangeImage'

// Store Imports
import { editPreMade } from '@/redux-store/PreMade'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  borderBottom: '0.0625rem solid rgba(74, 74, 81, 0.3)'
}))

const Footer = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(3, 4),
  borderTop: `0.0625rem solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '1rem'
}))

interface Value {
  headline: string
  desc: string
  image: any
  coupon_code: string
}

const EditPreMade = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // State
  const [isChange, setIsChange] = useState<boolean>(false)

  // Hooks
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    formik.resetForm()
    setIsChange(false)
  }

  const initialValues: Value = {
    headline: '',
    desc: '',
    image: null,
    coupon_code: ''
  }

  const schema = yup.object().shape({
    headline: yup.string().required(ErrorConstants.HEADLINE_ERROR)
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (value: Value) => {
      dispatch(editPreMade({ _id: row?._id, ...value }))
      handleClose()
    }
  })

  useEffect(() => {
    if (Object.keys(row)?.length > 0) {
      formik.setFieldValue('headline', row?.headline)
      formik.setFieldValue('desc', row?.desc)
      formik.setFieldValue('image', row?.image)
      formik.setFieldValue('coupon_code', row?.coupon_code)
    }
  }, [row])

  return (
    <>
      <Drawer
        onClose={handleClose}
        open={open}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 800 } } }}
      >
        <Header>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Edit Promo</Typography>
          <IconButton onClick={handleClose} sx={{ fontSize: 25 }}>
            <Icon icon={'ic:round-close'} />
          </IconButton>
        </Header>
        <Box sx={{ p: 4, overflow: 'auto', height: '100%' }}>
          <Box sx={{ height: '100%', width: '100%', display: 'flex', gap: 4 }}>
            <Box
              sx={{
                width: '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '15rem',
                  backgroundImage: `url(${!AppUtils.checkValue(formik.values.image)
                    ? 'https://www.fbgcdn.com/pictures/551c0022-549a-4a19-af9c-03eb95b09c99.jpg'
                    : formik.values.image instanceof Blob
                      ? URL.createObjectURL(formik.values.image)
                      : formik.values.image
                    })`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ p: 4 }}>
                  <Typography
                    sx={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', mb: 2, wordWrap: 'break-word' }}
                  >
                    {formik.values.headline}
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 500, wordWrap: 'break-word' }}>
                    {formik.values.desc}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    py: 1,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    left: 0
                  }}
                >
                  <Icon icon={'icon-park-outline:up-c'} fontSize={15} color='#fff' />
                  <Typography sx={{ ml: 1, fontWeight: 500, fontSize: '0.8rem', color: '#fff' }}>
                    Learn more (Deal applied automatically)
                  </Typography>
                </Box>
              </Box>
              <LoadingButton
                fullWidth
                size='large'
                sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, mt: 6 }}
                onClick={() => setIsChange(true)}
              >
                Change Picture
              </LoadingButton>
            </Box>
            <Box sx={{ width: '50%', height: '100%' }}>
              <TextField
                fullWidth
                sx={{ mb: 6 }}
                label={'Headline'}
                placeholder='Enter Headline'
                name='headline'
                value={formik.values.headline}
                onChange={formik.handleChange}
                error={formik.touched.headline && Boolean(formik.errors.headline)}
                helperText={formik.touched.headline && formik.errors.headline}
                inputProps={{ maxLength: 35 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Typography>{formik.values.headline?.length ?? 0} / 35</Typography>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                sx={{ mb: 6 }}
                multiline
                minRows={3}
                label={'Description'}
                placeholder='Enter Description'
                name='desc'
                value={formik.values.desc}
                onChange={formik.handleChange}
                error={formik.touched.desc && Boolean(formik.errors.desc)}
                helperText={formik.touched.desc && formik.errors.desc}
                inputProps={{ maxLength: 100 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Typography>{formik.values.desc?.length ?? 0} / 100</Typography>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Box>
        </Box>
        <Footer>
          <LoadingButton size='large' variant='contained' onClick={() => formik.handleSubmit()}>
            Save
          </LoadingButton>
          <LoadingButton
            size='large'
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={handleClose}
          >
            Close
          </LoadingButton>
        </Footer>
      </Drawer>

      {isChange && (
        <ChangeImage
          open={isChange}
          setOpen={setIsChange}
          setImage={(img: any) => formik.setFieldValue('image', img)}
        />
      )}
    </>
  )
}

export default EditPreMade
