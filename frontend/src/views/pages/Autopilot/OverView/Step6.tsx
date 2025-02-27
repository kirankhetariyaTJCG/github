// MUI Imports
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const Step6 = () => {
  const bill = [
    { label: 'Total', value: 'US$ 10,71/-' },
    { label: 'Sub Total', value: 'US$ 9,00/-' },
    { label: 'Taxes', value: 'US$ 1,71/-' }
  ]

  return (
    <>
      <Box sx={{ p: 6 }}>
        <Box>
          {Array.isArray(bill) &&
            bill?.length > 0 &&
            bill?.map((item: any, index: number) => {
              return (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ fontWeight: index === 0 ? 700 : 500 }}>{item?.label}</Typography>
                  <Typography sx={{ fontWeight: index === 0 ? 700 : 500 }}>{item?.value}</Typography>
                </Box>
              )
            })}
        </Box>
        <Divider sx={{ my: 4 }} />
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
              Pricing Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontWeight: 500 }}>Base fee per order</Typography>
              <Typography>10%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 500 }}>Discount</Typography>
              <Typography sx={{ fontWeight: 500 }}>0%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 500 }}>Your fee per order</Typography>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>10%</Typography>
                <Typography sx={{ fontWeight: 500 }}>(+ applicable tax)</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Typography sx={{ fontWeight: 500 }}>
              This is a post-paid service. The fee will be billed monthly, based on the the sales from previous period.
            </Typography>
          </AccordionDetails>
        </Accordion>
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

export default Step6
