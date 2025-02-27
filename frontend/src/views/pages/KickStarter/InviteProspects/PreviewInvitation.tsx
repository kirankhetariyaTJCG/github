// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import EmailPreview from './EmailPreview'
import CsMobileFrame from '@/@core/components/CsMobileFrame'
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Store Imports
import { invite_type } from '@/redux-store/InviteProspects'

// Store Imports
import { setActiveStep, setDoneSteps } from '@/redux-store/InviteProspects'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Values {
  subject: string
  promotion: any
  text_1: string
  text_2: string
  button_text: string
}

const PreviewInvitation = () => {
  // Hooks
  const dispatch = useDispatch()
  const inviteType = useSelector(invite_type)

  const defaultValues: Values = {
    subject: 'Psst, enjoy a 15% Off Your 1st Order',
    promotion: { name: '15% Off Your 1st Order', value: 1 },
    text_1: 'Order for pickup & delivery and enjoy',
    text_2: "Don't let this sizzling offer go to waste.",
    button_text: 'ORDER NOW'
  }

  const schema = yup.object().shape({
    subject: yup.string().required(ErrorConstants.EMAIL_SUBJECT_ERROR),
    promotion: yup.mixed().required(ErrorConstants.PROMOTION_ERROR),
    text_1: yup.string().required(`${ErrorConstants.TEXT_ERROR} 1`),
    text_2: yup.string().required(`${ErrorConstants.TEXT_ERROR} 2`)
  })

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: schema,
    onSubmit: (values: Values) => {
      dispatch(setActiveStep(2))
      dispatch(setDoneSteps({ index: 1, isDone: true }))
    }
  })

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '50%', borderRight: theme => `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ p: 4, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontWeight: 600 }}>From:</Typography>
              <Typography sx={{ ml: 2, fontWeight: 500 }}>Pizzaholic</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontWeight: 600 }}>Subject:</Typography>
              <Typography sx={{ ml: 2, fontWeight: 500 }}>{formik.values.subject}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              overflow: 'auto',
              height: 'calc(100vh - 18.8rem)',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            {inviteType === 1 ? (
              <EmailPreview
                data={{
                  promotion: formik.values?.promotion?.name,
                  text_1: formik.values.text_1,
                  text_2: formik.values.text_2,
                  button_text: formik.values.button_text
                }}
              />
            ) : (
              <CsMobileFrame
                JSXContent={
                  <Box sx={{ p: 4 }}>
                    <Box
                      sx={{
                        mt: 8,
                        p: 4,
                        borderTopRightRadius: '1.3rem',
                        borderBottomLeftRadius: '1.3rem',
                        borderBottomRightRadius: '1.3rem',
                        bgcolor: theme => theme.palette.customColors.trackBg,
                        boxShadow: theme => theme.shadows[5]
                      }}
                    >
                      <Typography>
                        {`${formik.values.text_1} ${formik.values.promotion?.name} delivery at Pizzaholic`}
                      </Typography>
                      <Box sx={{ py: 2 }}>
                        <Typography>{formik.values.text_2}</Typography>
                        <Typography>{formik.values.text_2}</Typography>
                      </Box>
                    </Box>
                  </Box>
                }
              />
            )}
          </Box>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ px: 4, py: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Preview invitation</Typography>
          </Box>
          <Box sx={{ p: 6, overflow: 'auto', height: 'calc(100vh - 17rem)' }}>
            <TextField
              sx={{ mb: 4 }}
              fullWidth
              label='Subject'
              placeholder='Enter Email Subject'
              name='subject'
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
            />
            <CsAutocomplete
              sx={{ mb: 4 }}
              label='Select Promotion'
              placeholder='Select Promotion'
              options={[
                { name: '15% Off Your 1st Order', value: 1 },
                { name: 'Free Delivery', value: 2 }
              ]}
              multiple={false}
              getOptionLabel={(option: any) => option?.name || ''}
              value={formik.values.promotion}
              onChange={(e: any, value: any) => formik.setFieldValue('promotion', value)}
              error={formik.touched.promotion && Boolean(formik.errors.promotion)}
              helperText={formik.touched.promotion && formik.errors.promotion}
            />
            {inviteType === 1 && (
              <Typography
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  pb: 2,
                  borderBottom: theme => `1px solid ${theme.palette.divider}`
                }}
              >
                Email Body
              </Typography>
            )}
            <TextField
              sx={{ mb: 6 }}
              fullWidth
              label='Text 1'
              placeholder='Enter Text 1'
              name='text_1'
              value={formik.values.text_1}
              onChange={formik.handleChange}
              error={formik.touched.text_1 && Boolean(formik.errors.text_1)}
              helperText={formik.touched.text_1 && formik.errors.text_1}
            />
            <TextField
              sx={{ mb: 4 }}
              fullWidth
              label='Text 2'
              placeholder='Enter Text 2'
              name='text_2'
              value={formik.values.text_2}
              onChange={formik.handleChange}
              error={formik.touched.text_2 && Boolean(formik.errors.text_2)}
              helperText={formik.touched.text_2 && formik.errors.text_2}
            />
            <TextField
              sx={{ mb: 4 }}
              fullWidth
              label='Button Text'
              placeholder='Enter Button Text'
              name='button_text'
              value={formik.values.button_text}
              onChange={formik.handleChange}
              error={formik.touched.button_text && Boolean(formik.errors.button_text)}
              helperText={formik.touched.button_text && formik.errors.button_text}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <LoadingButton
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={() => {
            formik.resetForm()
            dispatch(setActiveStep(0))
            dispatch(setDoneSteps({ index: 0, isDone: false }))
          }}
        >
          Back
        </LoadingButton>
        <LoadingButton variant='contained' onClick={() => formik.handleSubmit()}>
          Next
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default PreviewInvitation
