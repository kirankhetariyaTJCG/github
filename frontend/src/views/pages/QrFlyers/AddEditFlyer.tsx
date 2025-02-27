// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'
import { Box, Drawer, Typography, IconButton, LoadingButton, TextField, InputAdornment } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import html2canvas from 'html2canvas'
import * as yup from 'yup'

// Custom Imports
import Template from './Template'

// Store Imports
import { addQrFlyer, editQrFlyer } from '@/redux-store/QrFlyers/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Value {
  headline: string
  flyerColor: string
}

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

const AddEditFlyer = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // State
  const color = ['#FF5733', 'rgb(127, 189, 57)', 'rgb(250, 114, 104)', 'rgb(102, 108, 255)']
  const initialValues: Value = { headline: 'Want to have the steaming hot food waiting for you?', flyerColor: '#FF5733' }

  // Hooks
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const loading = useSelector((state: any) => state.qr_code.is_loading)
  const dispatch = useDispatch()
  const templateRef = useRef<HTMLDivElement>(null)


  const schema = yup.object().shape({
    headline: yup.string().test((val: any, context: any) => {
      if (!AppUtils.checkValue(val)) {
        return context.createError({ message: ErrorConstants.HEADLINE_ERROR })
      } else return true
    })
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (value: Value) => {
      const image = await captureFlyer()
      const payload = {
        restaurant_id: restaurant?._id,
        headline: value?.headline,
        page_number: 1,
        flyer_color: value?.flyerColor,
        image: image
      }
      Object.keys(row)?.length > 0
        ? dispatch(editQrFlyer({ ...payload, flyer_id: row?._id, page_id: row?.flyer_pages[0]?._id, is_qr_flyer: false }))
        : dispatch(addQrFlyer(payload))
      handleClose()
    }
  })

  useEffect(() => {
    if (Object.keys(row)?.length > 0) {
      formik.setFieldValue('headline', row?.flyer_pages[0]?.headline ?? '')
      formik.setFieldValue('flyerColor', row?.flyer_pages[0]?.flyer_color ?? '#FF5733')
    }
  }, [row])

  const handleClose = () => {
    setOpen({ open: false, row: {} })
    formik.resetForm()
  }

  const captureFlyer = async (): Promise<Blob | null> => {
    if (templateRef.current) {
      const canvas = await html2canvas(templateRef.current, {
        useCORS: true,
        scale: 20,
      })

      return new Promise(resolve => {
        canvas.toBlob(blob => {
          resolve(blob)
        }, 'image/png')
      })
    }

    return null
  }



  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 800 } } }}
    >
      <Header>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Flyer</Typography>
        <IconButton onClick={handleClose} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </Header>
      <Box sx={{ p: 4, overflow: 'auto' }}>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', gap: 4 }}>
          <Box sx={{ width: '55%' }} ref={templateRef}>
            <Template heading={formik.values.headline} bg_color={formik.values.flyerColor} />
          </Box>
          <Box sx={{ width: '45%' }}>
            <TextField
              sx={{ mt: 4, mb: 6 }}
              fullWidth
              label='Headline'
              placeholder='Enter Headline'
              name='headline'
              value={formik.values.headline}
              onChange={formik.handleChange}
              error={formik.touched.headline && Boolean(formik.errors.headline)}
              helperText={formik.touched.headline && formik.errors.headline}
              inputProps={{ maxLength: 100 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {formik.values.headline?.length}/100
                  </InputAdornment>
                )
              }}
            />
            <Box>
              <Typography sx={{ fontWeight: 700 }}>Color</Typography>
              <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
                {Array.isArray(color) &&
                  color?.length > 0 &&
                  color?.map((item: string, index: number) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          p: 1,
                          outline: item === formik.values.flyerColor ? `2px solid ${formik.values.flyerColor}` : 'none',
                          borderRadius: '50%',
                          mr: 2,
                        }}
                      >
                        <LoadingButton
                          sx={{
                            bgcolor: `${item} !important`,
                            borderRadius: '50%',
                            p: 2,
                            minWidth: '1.5rem',
                            height: '1.5rem'
                          }}
                          onClick={() => formik.setFieldValue('flyerColor', item)}
                        >
                          &nbsp;
                        </LoadingButton>
                      </Box>
                    )
                  })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer>
        <LoadingButton
          size='large'
          disabled={loading}
          sx={{
            bgcolor: theme => theme.palette.primary.lightOpacity,
            width: { xs: '100%', sm: 'auto' },
            mb: { xs: 2.5, sm: 0 }
          }}
          onClick={captureFlyer}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          size='large'
          variant='contained'
          sx={{ width: { xs: '100%', sm: 'auto' }, ml: '0 !important', mt: { xs: 2.5, sm: 0 } }}
          onClick={() => formik.handleSubmit()}
          loading={loading}
          loadingPosition='start'
          startIcon={loading ? <>&nbsp;</> : <></>}
        >
          Save
        </LoadingButton>
      </Footer>
    </Drawer>
  )
}

export default AddEditFlyer
