// MUI Imports
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const Step3 = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 700 }}>Sales optimized website</Typography>
        <Box>
          <Typography sx={{ fontWeight: 700 }}>9.00 USD / Month</Typography>
          <Typography>(+ applicable tax)</Typography>
        </Box>
      </Box>
      <Typography sx={{ my: 4 }}>
        Build instantly a mobile friendly website that's highly optimized for search engines. Use your existing domain
        name or a domain at your choice (registered by us) included in this monthly service. Everything is designed to
        generate more online orders.
      </Typography>
      <Accordion
        sx={{
          mb: 4,
          boxShadow: 'none',
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: '6px !important',
          '&:before': { bgcolor: 'transparent' }
        }}
      >
        <AccordionSummary>
          <Typography
            sx={{ fontWeight: '700 !important', color: theme => `${theme.palette.text.secondary} !important` }}
          >
            About: Activation / Cancellation / Refund
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 700 }}>Activation</Typography>
          <Typography>
            For domains purchased through us this service becomes available within 48h after finalizing the purchasing
            process. For domains that you already own this service becomes available after our team has migrated the DNS
            zone file settings to our nameserver. You may be asked to provide us the access details of the registrar
            where you have registered your domain.
          </Typography>
          <Divider sx={{ my: 4 }} />
          <Typography sx={{ fontWeight: 700 }}>Cancellation</Typography>
          <Typography>You can cancel this service anytime, even after the first month.</Typography>
          <Divider sx={{ my: 4 }} />
          <Typography sx={{ fontWeight: 700 }}>Refund</Typography>
          <Typography>No refunds on the already processed monthly charges, you can however cancel anytime.</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Step3
