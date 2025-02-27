// MUI Imports
import { Box, Typography, Divider, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Portals = ({ section }: { section: any }) => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)

  return (
    <Container maxWidth='lg' sx={{ mb: 16 }}>
      <Box sx={{ mb: 8 }}>
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '1.5rem', md: '2.875rem' },
            fontWeight: 600,
            color: colorData?.main,
            ...AppUtils.getFontFamily(fontType)
          }}
        >
          Listed in
        </Typography>
        <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'start',
          gap: 10,
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        {Array.isArray(section?.sections) &&
          section?.sections?.length > 0 &&
          section?.sections?.map((portal: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#F2F2F2',
                  borderRadius: '8px',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { transform: 'scale(1.1)' }
                }}
                onClick={() => window.open(portal?.url, '_blank', 'noopener,noreferrer')}
              >
                <Box component={'img'} src={`/images/portals/${portal?.type}.png`}
                  sx={{ width: 'auto', height: '5rem', objectFit: 'contain' }} />
              </Box>
            )
          })}
      </Box>
    </Container>
  )
}

export default Portals
