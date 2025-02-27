// MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { FormikProps } from 'formik'

interface FormValues {
  name: string
  description: string
  promotion_image: any
}

interface Props {
  formik: FormikProps<FormValues>
  setIsChange: (isChange: boolean) => void
}

const Step1 = (props: Props) => {
  // Props
  const { formik, setIsChange } = props

  return (
    <Box>
      <TextField
        fullWidth
        sx={{ mb: 6 }}
        label='Headline'
        placeholder='Enter Headline'
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        inputProps={{ maxLength: 35 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Typography>{formik.values.name?.length} / 35</Typography>
            </InputAdornment>
          )
        }}
      />
      <TextField
        fullWidth
        sx={{ mb: 6 }}
        multiline
        minRows={3}
        label='Description'
        placeholder='Enter Description'
        name='description'
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        inputProps={{ maxLength: 100 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Typography>{formik.values.description?.length} / 100</Typography>
            </InputAdornment>
          )
        }}
      />
      <LoadingButton
        fullWidth
        size='large'
        sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
        onClick={() => setIsChange(true)}
      >
        Change Picture
      </LoadingButton>
    </Box>
  )
}

export default Step1
