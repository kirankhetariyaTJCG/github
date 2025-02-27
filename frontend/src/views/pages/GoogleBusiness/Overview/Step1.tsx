// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// Custom Imports
import CsMobileFrame from '@/@core/components/CsMobileFrame'

const Step1 = (props: any) => {
  const { step, domain, setDomain } = props
  return (
    <>
      {step === 1 ? (
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '100%',
              height: '30rem',
              display: 'flex',
              alignItems: 'center',
              transform: 'scale(0.9)'
            }}
          >
            <CsMobileFrame
              JSXContent={
                <Box sx={{ p: 4 }}>
                  <Box
                    sx={{
                      mt: 8,
                      borderTopRightRadius: '1.3rem',
                      borderBottomLeftRadius: '1.3rem',
                      borderBottomRightRadius: '1.3rem',
                      bgcolor: theme => theme.palette.customColors.trackBg,
                      boxShadow: theme => theme.shadows[5]
                    }}
                  >
                    <Box
                      component={'img'}
                      src='https://www.gloriafood.com/admin/phone_content.7eabf1f40732856b.png'
                      sx={{ width: '15rem', height: '32rem' }}
                    />
                  </Box>
                </Box>
              }
            />
          </Box>
          <Box sx={{ p: 6, width: '100%', m: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
              Make sure your Google Business listing is optimized for the best sales conversion
            </Typography>
          </Box>
        </Box>
      ) : (
        step === 2 && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Box component={'img'} src='/images/WebsiteScanner/DomainName.svg' sx={{ width: 'auto', height: '8rem' }} />
            <Typography sx={{ fontWeight: 700, my: 4 }}>What is your restaurant's domain name?</Typography>
            <TextField
              sx={{ width: '100%' }}
              fullWidth
              value={domain}
              InputProps={{ readOnly: false, startAdornment: <InputAdornment position='start'>www.</InputAdornment> }}
              onChange={(e: any) => setDomain(e.target.value)}
            />
          </Box>
        )
      )}
    </>
  )
}

export default Step1
