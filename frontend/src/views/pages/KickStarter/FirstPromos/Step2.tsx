// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import ChangeImage from './ChangeImage'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface FormValue {
  headline: string
  desc: string
  discount: string
  is_minimum: boolean
  minimum: string
}

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setValues: (values: any) => void
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

const Step2 = (props: Props) => {
  // Props
  const { isOpen, setIsOpen, setValues } = props

  // State
  const [open, setOpen] = useState<boolean>(false)
  const [file, setFile] = useState<any>(null)
  const [imageURL, setImageURL] = useState<string>(
    'https://www.fbgcdn.com/pictures/551c0022-549a-4a19-af9c-03eb95b09c99.jpg'
  )

  const initialValue = {
    headline: '',
    desc: '',
    discount: '',
    minimum: '0',
    is_minimum: false
  }

  const schema = yup.object().shape({
    headline: yup.string().required(ErrorConstants.HEADLINE_ERROR),
    desc: yup.string().required(ErrorConstants.DESCRIPTION_ERROR),
    discount: yup.string().required(ErrorConstants.DISCOUNT_ERROR),
    minimum: yup.string()
  })

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: (value: FormValue) => {
      setValues({ ...value, image: imageURL })
      setIsOpen(false)
    }
  })

  // Update the image URL only when `file` changes
  useEffect(() => {
    if (file instanceof Blob) {
      const objectURL = URL.createObjectURL(file)
      setImageURL(objectURL)

      // Clean up the object URL when the component unmounts
      return () => URL.revokeObjectURL(objectURL)
    } else {
      setImageURL(file || 'https://www.fbgcdn.com/pictures/551c0022-549a-4a19-af9c-03eb95b09c99.jpg')
    }
  }, [file])

  return (
    <Box>
      <Drawer
        open={isOpen}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 800 } } }}
      >
        <Header>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Create First Buy Promo</Typography>
          <IconButton onClick={() => setIsOpen(false)} sx={{ fontSize: 25 }}>
            <Icon icon={'ic:round-close'} />
          </IconButton>
        </Header>
        <Box sx={{ p: 4, overflow: 'auto', height: '-webkit-fill-available' }}>
          <Box sx={{ display: 'flex', gap: 6, height: '-webkit-fill-available' }}>
            <Box sx={{ width: '50%' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '15rem',
                  backgroundImage: `url(${imageURL})`,
                  backgroundSize: 'cover',
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
                onClick={() => setOpen(true)}
              >
                Change Picture
              </LoadingButton>
            </Box>
            <Box sx={{ width: '50%' }}>
              <TextField
                fullWidth
                sx={{ mb: 4 }}
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
                      <Typography>{formik.values.headline?.length} / 35</Typography>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                sx={{ mb: 4 }}
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
                      <Typography>{formik.values.desc?.length} / 100</Typography>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                sx={{ mb: 4 }}
                label={'Discount %'}
                placeholder='Enter Minimum Amount'
                name='discount'
                value={formik.values.discount}
                onChange={formik.handleChange}
                error={formik.touched.discount && Boolean(formik.errors.discount)}
                helperText={formik.touched.discount && formik.errors.discount}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon icon={'tabler:circle-dashed-percentage'} />
                    </InputAdornment>
                  )
                }}
              />
              <Typography sx={{ fontWeight: 700 }}>Minimum Order Amount</Typography>
              <FormControlLabel
                sx={{ mb: 4 }}
                control={
                  <Checkbox
                    checked={formik.values.is_minimum}
                    onChange={() => formik.setFieldValue('is_minimum', !formik.values.is_minimum)}
                  />
                }
                label='Set a minimum order value (recommended)'
              />
              <Collapse in={formik.values.is_minimum}>
                <TextField
                  fullWidth
                  sx={{ mb: 4 }}
                  label={'Amount'}
                  placeholder='Enter Amount'
                  name='minimum'
                  value={formik.values.minimum}
                  onChange={formik.handleChange}
                  error={formik.touched.minimum && Boolean(formik.errors.minimum)}
                  helperText={formik.touched.minimum && formik.errors.minimum}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography>USD</Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </Collapse>
            </Box>
          </Box>
        </Box>
        <Footer>
          <LoadingButton variant='contained' onClick={() => formik.handleSubmit()}>
            Save
          </LoadingButton>
          <LoadingButton variant='outlined' onClick={() => setIsOpen(false)}>
            Cancel
          </LoadingButton>
        </Footer>
      </Drawer>

      {open && <ChangeImage open={open} setOpen={setOpen} setImage={(img: any) => setFile(img)} />}
    </Box>
  )
}

export default Step2
