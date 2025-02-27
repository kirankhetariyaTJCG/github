'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'

const CheckerView = () => {
  // State
  const [step, setStep] = useState<number>(1)
  const [domain, setDomain] = useState('sahajanandrestaurant.com')

  // Hooks
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 20 }}>
      <Card sx={{ width: { xs: '100%', lg: '65%' }, height: { xs: '100%', lg: '70%' } }}>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Website Quality</Typography>
          <LoadingButton
            variant='contained'
            sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
            onClick={() => (step === 2 ? router.push('/marketing-tools/website-scanner/status') : setStep(step + 1))}
          >
            {step === 1 ? 'Next' : 'Check Website'}
          </LoadingButton>
        </Box>
        <Divider />
        <Box sx={{ p: 6, width: { sm: '42rem' }, mx: 'auto' }}>
          {step === 1 && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>
                  Is your website optimized for maximum sales results?
                </Typography>
                <Box component={'ul'} sx={{ pl: 4.5 }}>
                  <Box component={'li'}>visitor to order conversion</Box>
                  <Box component={'li'}>speed performance</Box>
                  <Box component={'li'}>mobile optimization</Box>
                  <Box component={'li'}>search engine optimization</Box>
                  <Box component={'li'}>security</Box>
                </Box>
              </Box>
              <Box
                component={'img'}
                src='/images/WebsiteScanner/Website.svg'
                sx={{ width: '20rem', height: '15rem' }}
              />
            </Box>
          )}
          {step === 2 && (
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Box
                component={'img'}
                src='/images/WebsiteScanner/DomainName.svg'
                sx={{ width: 'auto', height: '8rem' }}
              />
              <Typography sx={{ fontWeight: 700, my: 4 }}>What is your restaurant's domain name?</Typography>
              <CsTextField
                sx={{ width: '100%' }}
                fullWidth
                value={domain}
                InputProps={{ readOnly: false }}
                StartIcon={'www.'}
                onChange={(e: any) => setDomain(e.target.value)}
              />
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  )
}

export default CheckerView
