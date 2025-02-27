// MUI Imports
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const Step5 = () => {
  return (
    <>
      <Box sx={{ p: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 700 }}>Autopilot Selling</Typography>
          <Box>
            <Typography sx={{ fontWeight: 700 }}>10 % per generated order</Typography>
            <Typography>(+ applicable tax)</Typography>
          </Box>
        </Box>
        <Typography sx={{ my: 4 }}>
          You only pay if this brings results! We charge the commission fee on total order value, for each order
          generated by the Autopilot program, regardless of its outcome (accepted, rejected or missed). Orders generated
          organically or with restaurants’ own marketing efforts are not charged.
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
            <Typography>This service becomes available immediately after finalizing the purchasing process.</Typography>
            <Divider sx={{ my: 4 }} />
            <Typography sx={{ fontWeight: 700 }}>Cancellation</Typography>
            <Typography>You can cancel this service anytime, even after first month.</Typography>
            <Divider sx={{ my: 4 }} />
            <Typography sx={{ fontWeight: 700 }}>Refund</Typography>
            <Typography>
              No refunds on the already purchased monthly charges, you can however cancel any time.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}

export default Step5
