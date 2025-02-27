// MUI Imports
import { Box, Typography, Divider, IconButton, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const SocialMedia = (props: { section?: any }) => {
  // Props
  const { section } = props

  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)

  const links = [
    { icon: 'ri:facebook-fill', type: 'facebookLink' },
    { icon: 'ri:instagram-fill', type: 'instagramLink' },
    { icon: 'ri:twitter-x-fill', type: 'twitterLink' },
    { icon: 'ri:linkedin-fill', type: 'linkedinLink' },
    { icon: 'ri:youtube-fill', type: 'youtubeLink' },
    { icon: 'ri:pinterest-fill', type: 'pinterestLink' },
  ]

  return (
    <Container maxWidth='lg' sx={{ mb: 16 }}>
      <Box sx={{ mb: section?.description ? 4 : 8 }}>
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '1.5rem', md: '2.875rem' },
            fontWeight: 600,
            color: colorData?.main,
            ...AppUtils.getFontFamily(fontType)
          }}
        >
          {section?.title ? section?.title : 'Social Media'}
        </Typography>
        <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
      </Box>
      {section?.description && (
        <Typography
          sx={{
            color: '#000',
            fotnWeight: 500,
            fontSize: '1rem',
            ...AppUtils.getFontFamily(fontType),
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 3
          }}
          dangerouslySetInnerHTML={{ __html: section?.description }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'start',
          gap: 10,
          flexWrap: 'wrap',
          width: '100%',
          mt: 6
        }}
      >
        {Array.isArray(links) && links?.length > 0 &&
          links.map((link: any, index: number) => {
            if (section && AppUtils.checkValue(section[link?.type])) {
              return (
                <IconButton
                  key={index}
                  sx={{
                    bgcolor: colorData?.light,
                    fontSize: { xs: 30, md: 50 },
                    p: 4,
                    transition: 'all 0.2s ease-in-out',
                    color: colorData?.main,
                    '&:hover': { transform: 'scale(1.1)', bgcolor: `${colorData?.main} !important`, color: colorData?.light }
                  }}
                  onClick={() => window.open(section[link?.type], '_blank', 'noopener,noreferrer')}
                >
                  <Box component={Icon} icon={link?.icon} />
                </IconButton>
              )
            }
          })}
      </Box>
    </Container>
  )
}

export default SocialMedia
