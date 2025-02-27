// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Step2 = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Box sx={{ mr: 4 }}>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 500 }}>
          Allow us to manage & improve your Google Business listing.
        </Typography>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 500 }}>
          This may increase your website visitors & online sales.
        </Typography>
      </Box>
      <Box
        component={'iframe'}
        src='https://1roos.com/en/marketing-tools/google-business/overview'
        sx={{ width: '100%', height: '100%' }}
      />
    </Box>
  )
}

export default Step2
