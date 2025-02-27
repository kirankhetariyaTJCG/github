// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
  setStep: (step: number) => void
}

const Step5 = (props: Props) => {
  // Props
  const { setStep } = props

  return (
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
        <Typography sx={{ fontWeight: 700, mt: 2 }}>Optimize nento.com for maximum sales results</Typography>
        <Divider sx={{ my: 4 }} />
        <Typography
          dangerouslySetInnerHTML={{
            __html: `<p><span>Hello&nbsp;</span><span>,</span></p>
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
          }}
        />
      </Box>
      <LoadingButton size='large' variant='contained' sx={{ mt: 4 }} onClick={() => setStep(1)}>
        Send
      </LoadingButton>
    </Box>
  )
}

export default Step5
