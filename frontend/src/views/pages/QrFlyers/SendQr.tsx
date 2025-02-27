// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'
import CsEditor from '@/@core/components/CsEditor'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Value {
  webmaster_mail: string
  subject: string
  message: string
}

const SendQr = (props: DialogProps) => {
  // Props
  const { open, setOpen } = props

  // State
  const [step, setStep] = useState<number>(1)
  const [value, setValue] = useState<any>(
    `<p><span>Hello,</span><br><br><span>I would like to order some flyers. Here are the specifics:</span><br><br><span>Quantity: 100</span><br><span>Flyer size: DL(55x55), no fold, 2-sided</span><br><span>Orientation: vertical</span><br><span>Paper type: standard thickness, matte</span><br><span>Pdf files:&nbsp;</span><a href="#" style="text-align: start;color: rgba(var(--bs-link-color-rgb),var(--bs-link-opacity, 1));background-color: rgb(255, 255, 255);font-size: 14px;">click here</a><br><br><span>Delivery address:</span><br><span>08, 1008 DG Amsterdam, Netherlands</span><br><br><span>Regards,</span><br><span>John Doe</span></p>`
  )

  const values: Value = {
    webmaster_mail: '',
    subject: 'Add user to Google Listing',
    message: 'I hope you are doing well.'
  }

  const schema = yup.object().shape({
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
    <Dialog open={open} maxWidth='md'>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
          px: 4,
          py: 3
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Flyer with QR codes for dine-in</Typography>
        <IconButton onClick={() => setOpen(false)} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        {step === 1 && (
          <>
            <Typography sx={{ fontWeight: 700 }}>
              Send your order to the printing house. Your flyers are included as pdf files.
            </Typography>
            <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px', p: 4, mt: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={2}>
                  <Typography sx={{ fontWeight: 700 }}>To:</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
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
          </>
        )}
        {step === 2 && (
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 4 }}>Preview the email to your webmaster</Typography>
            <Box sx={{ p: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography sx={{ fontWeight: 700 }}>To:</Typography>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: theme => theme.palette.secondary.lightOpacity,
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    ml: 9
                  }}
                >
                  test@gmail.com
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 700 }}>From:</Typography>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: theme => theme.palette.secondary.lightOpacity,
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    ml: 4
                  }}
                >
                  test@gmail.com
                </Box>
              </Box>
              <Typography sx={{ fontWeight: 700, mt: 2 }}>Add user to Google Listing</Typography>
              <Divider sx={{ my: 4 }} />
              <Typography dangerouslySetInnerHTML={{ __html: value }} />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          pt: '1rem !important'
        }}
      >
        <LoadingButton
          size='large'
          variant='contained'
          onClick={() => (step === 2 ? setOpen(false) : formik.handleSubmit())}
        >
          {step === 1 ? 'Preview & Send' : 'Send'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default SendQr
