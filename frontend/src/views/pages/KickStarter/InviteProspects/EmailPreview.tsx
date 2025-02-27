// MUI Imports
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
  data: { text_1: string; promotion: string; text_2: string; button_text: string }
}

const EmailPreview = (props: Props) => {
  // Props
  const { data } = props

  return (
    <Box
      sx={{
        m: 4,
        borderRadius: '8px',
        p: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: theme => `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        width: '25rem'
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: '1.3rem' }}>Pizzaholic</Typography>
      <Divider sx={{ my: 3, width: '3rem' }} />
      <Typography sx={{ fontWeight: 500, fontSize: '1.2rem' }}>{data.text_1}</Typography>
      <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', my: 2 }}>{data.promotion}</Typography>
      <Typography sx={{ fontWeight: 400, fontSize: '1rem', color: theme => theme.palette.text.secondary }}>
        {data.text_2}
      </Typography>
      <LoadingButton variant='contained' size='large' sx={{ my: 4 }}>
        {data.button_text}
      </LoadingButton>
      <Box
        component={'img'}
        src='/images/SpecialOffer.jpg'
        sx={{ width: '18rem', height: 'auto', borderRadius: '6px', mb: 4 }}
      />
      <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
        Pizzaholic 08, 1008 DG Amsterdam, +31 88 126 8702
      </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
        https://sahajanandrestaurant.com, gogec41620@padvn.com
      </Typography>
      <Typography sx={{ textAlign: 'left', fontSize: '0.7rem', my: 4 }}>
        Je hebt deze e-mail ontvangen namens Pizzaholic omdat je in het verleden een bestelling hebt geplaatst bij
        Pizzaholic en/of je anderszins hebt ingestemd met het ontvangen van directe marketing (ongevraagde
        communicaties). Als je niet langer directe marketing-communicaties van Pizzaholic wenst te ontvangen, schrijf je
        dan uit. Uw persoonlijke gegevens worden verwerkt zoals hier vermeld.
      </Typography>
      <Typography sx={{ textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem' }}>Unsubscribe</Typography>
    </Box>
  )
}

export default EmailPreview
