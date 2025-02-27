// MUI Imports
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const Step5 = () => {
  const bill = [
    { label: 'Total', value: 'US$ 10,71/-' },
    { label: 'Sub Total', value: 'US$ 9,00/-' },
    { label: 'Taxes', value: 'US$ 1,71/-' }
  ]

  return (
    <>
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
            <Typography sx={{ fontWeight: 500 }}>Base price per month:</Typography>
            <Typography>US$ 9,00/-</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 700 }}>Monthly amount:</Typography>
            <Box sx={{ textAlign: 'end' }}>
              <Typography sx={{ fontWeight: 700 }}>US$ 9,00/-</Typography>
              <Typography sx={{ fontWeight: 500 }}>(+ applicable tax)</Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 500 }}>Next monthly renewal</Typography>
            <Typography sx={{ fontWeight: 500 }}>18 Jul 2024</Typography>
          </Box>
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

export default Step5
