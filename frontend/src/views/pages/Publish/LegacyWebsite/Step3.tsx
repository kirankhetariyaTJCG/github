// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'
import CsEditor from '@/@core/components/CsEditor'

// Types Imports
import { WebMasterTypes } from '@/types'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Props {
  setStep: (step: number) => void
  step: number
}

const Step3 = (props: Props) => {
  // Props
  const { setStep, step } = props

  const [value, setValue] = useState<string>(
    '<p><span>Hello&nbsp;</span><span>,</span><br><br><span>I hope you are doing well. I&apos;ve decided to take orders online and table reservations using the GloriaFood online ordering system.</span><br><br><span>I would like to make it available as soon as possible. Could you please publish the &quot;See MENU and Order&quot; and &quot;Table reservation&quot; buttons on our website?</span><br><br><span>Please add the buttons in a prominent and visible area at the top of the main page.</span><br><br><span>Here is a page that contains our personalized&nbsp;</span><a href="#" style="text-align: start;font-size: 14px;">HTML code and instructions</a><br><br><span>Thank you,</span><br><span>Adam</span></p>'
  )

  const values: WebMasterTypes = {
    webmaster_name: '',
    webmaster_mail: '',
    subject: 'Add online ordering + table reservation to my site https://nento.com',
    message: 'I hope you are doing well.'
  }

  const schema = yup.object().shape({
    webmaster_name: yup.string().required(ErrorConstants.NAME_ERROR),
    webmaster_mail: yup.string().required(ErrorConstants.EMAIL_ERROR).email(ErrorConstants.VALID_EMAIL_ERROR),
    subject: yup.string().required(ErrorConstants.SUBJECT_ERROR),
    message: yup.string().required(ErrorConstants.MESSAGE_ERROR)
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: () => setStep(step + 1)
  })

  return (
    <>
      <Typography sx={{ fontWeight: 700 }}>Send instructions, including HTML code to your webmaster</Typography>
      <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px', p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={2}>
            <Typography sx={{ fontWeight: 700 }}>To:</Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CsTextField
              sx={{ mb: 4 }}
              fullWidth
              label='Webmaster Name'
              placeholder='Enter Webmaster Name'
              name='webmaster_name'
              value={formik.values.webmaster_name}
              onChange={formik.handleChange}
              error={formik.touched.webmaster_name && Boolean(formik.errors.webmaster_name)}
              helperText={formik.touched.webmaster_name && formik.errors.webmaster_name}
            />
            <CsTextField
              fullWidth
              label='Webmaster Email'
              placeholder='Enter Webmaster Email'
              name='webmaster_mail'
              onChange={formik.handleChange}
              value={formik.values.webmaster_mail}
              error={formik.touched.webmaster_mail && Boolean(formik.errors.webmaster_mail)}
              helperText={formik.touched.webmaster_mail && formik.errors.webmaster_mail}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography sx={{ fontWeight: 700 }}>Subject:</Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CsTextField
              fullWidth
              label='Subject'
              placeholder='Enter Subject'
              name='subject'
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
            />
          </Grid>
          <Grid item xs={12}>
            <CsEditor
              label='Message'
              height={200}
              value={value}
              setValue={setValue}
              formik={formik}
              fieldName={'message'}
              toolbar={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4 }}>
        <LoadingButton size='large' sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}>
          I'll do this myself
        </LoadingButton>
        <LoadingButton size='large' variant='contained' onClick={() => formik.handleSubmit()}>
          Preview & Send
        </LoadingButton>
      </Box>
    </>
  )
}

export default Step3
