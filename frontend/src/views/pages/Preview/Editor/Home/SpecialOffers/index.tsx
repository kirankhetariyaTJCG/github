// MUI Imports
import { Box, LoadingButton, Typography, Avatar } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import UrlHelper from '@/Helper/Url'

const SpacialOffersView = ({ onDelete }: { onDelete: () => void }) => {

  // Hooks
  const promotions = useSelector((state: any) => state.self_made.promotions)

  return (
    <Box>
      <Box
        sx={{
          border: theme => `1px solid ${theme.palette.info.light}`,
          borderRadius: '8px',
          py: 2,
          px: 4,
          mb: 4,
          bgcolor: theme => theme.palette.info.lightOpacity,
          fontSize: '0.9rem'
        }}
      >
        The information is automatically retrieved from the <b>"Promotions"</b> section within the web admin panel.
      </Box>
      <Box sx={{ my: 4 }}>
        {Array.isArray(promotions) && promotions?.length > 0 &&
          promotions
            .filter((item) => item?.is_active)
            ?.map((promotion, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    border: theme => `2px solid ${theme.palette.divider}`,
                    borderRadius: '8px',
                    mb: 4,
                    gap: 4
                  }}
                >
                  <Avatar
                    variant='rounded'
                    src={`${UrlHelper.imgPath}${promotion?.promotion_image}`}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{promotion?.name}</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: '0.9rem' }}>{promotion?.description}</Typography>
                  </Box>
                </Box>
              )
            })
        }
      </Box>
      <Box sx={{ borderTop: theme => `1px solid ${theme.palette.divider}`, pt: 4 }}>
        <LoadingButton variant='contained' onClick={onDelete}>
          <Icon icon={'ic:twotone-delete'} style={{ fontSize: 20, marginRight: 6 }} />
          Delete
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default SpacialOffersView
