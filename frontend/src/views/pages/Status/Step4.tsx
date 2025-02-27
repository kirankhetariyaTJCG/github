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

const Step4 = (props: Props) => {
  // Props
  const { setStep, step } = props

  const [value, setValue] = useState<string>(
    `<p><span>Hello&nbsp;</span><span>,</span></p>
<p><br></p>
<p><span>I need your help in order to achieve maximum sales results with online ordering on nento.com</span></p>
<p><br></p>
<p><strong>Visitor to order conversion</strong></p>
<ul>
    <li>The &quot;See MENU &amp; Order&quot; button should be visible on the main page in the header, footer and center of the page.<br>This way food-clients can see it without scrolling.</li>
    <li>The &quot;See MENU &amp; Order&quot; button should be added to the header and footer navigation so it&apos;s visible on any page.</li>
</ul>
<p><strong>Content optimization</strong></p>
<ul>
    <li>The Title tag should contain your restaurant name &quot;restaurant prontoo00&quot;.<br><code style="color: rgba(var(--bs-soft-rgb),var(--bs-text-opacity)) !important;font-size: 0.75rem;">
            <p>Example:</p>
            <p><em>&lt;title&gt;Restaurant Prontoo00 - Food delivery - newyork - Order online&lt;/title&gt;</em></p>
        </code></li>
    <li>The meta description should contain your restaurant name and city.<br><code style="color: rgba(var(--bs-soft-rgb),var(--bs-text-opacity)) !important;font-size: 0.75rem;">
            <p>Example:</p>
            <p><em>&lt;meta name=&quot;description&quot; content=&quot;Order Online for Takeout / Delivery or Book a Table. Here at Restaurant Prontoo00 - newyork you&apos;ll experience delicious Spanish cuisine. Try our mouth-watering dishes, carefully prepared with fresh ingredients! At Restaurant Prontoo00, our recipe for success is simple &ndash; Great food &amp; care makes customers return every time.&quot;&gt;</em></p>
        </code></li>
    <li>The first H1 tag should contain the restaurant name &quot;restaurant prontoo00&quot;.<br><code style="color: rgba(var(--bs-soft-rgb),var(--bs-text-opacity)) !important;font-size: 0.75rem;">
            <p>Example:</p>
            <p><em>&lt;h1&gt;restaurant prontoo00&lt;/h1&gt;</em></p>
        </code></li>
    <li>The city name &quot;newyork&quot; should appear in the first H1 or the first H2 tag of the page.<br><code style="color: rgba(var(--bs-soft-rgb),var(--bs-text-opacity)) !important;font-size: 0.75rem;">
            <p>Example:</p>
            <p><em>&lt;h2&gt;Spanish food delivery in newyork&lt;/h2&gt;</em></p>
        </code></li>
    <li>At least one H2 in the page should contain the restaurant name &ldquo;restaurant prontoo00&rdquo;.</li>
    <li>The restaurant name &ldquo;restaurant prontoo00&rdquo; should appear in one regular text in the page.</li>
</ul>
<p><strong>Structured data</strong></p>
<ul>
    <li>Schema.org should be added for opening hours.</li>
    <li>Schema.org should be added for address.</li>
    <li>Schema.org should be added to latitude / longitude.</li>
    <li>Schema.org should be added to menu link.</li>
</ul>
<p><strong>Social media and local listings</strong></p>
<ul>
    <li>We didn&rsquo;t find a link to your Facebook business page.</li>
    <li>We didn&rsquo;t find a link to your TripAdvisor listing.</li>
    <li>We didn&rsquo;t find a link to your Yelp listing.</li>
</ul>
<p><span>How fast can you implement this?</span></p>
<p><br></p>
<p><span>Thank you,</span></p>
<p><span>Adam</span></p>`
  )

  const values: WebMasterTypes = {
    webmaster_name: '',
    webmaster_mail: '',
    subject: 'Optimize nento.com for maximum sales results',
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
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
        <LoadingButton size='large' variant='contained' onClick={() => formik.handleSubmit()}>
          Preview & Send
        </LoadingButton>
      </Box>
    </>
  )
}

export default Step4
