// MUI Imports
import { Box, Drawer, Typography, IconButton } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { setPageType } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'
import UrlHelper from '@/Helper/Url'

const DrawerView = (props: DialogProps & { pages: { pageTitle: string; link: string; type: number }[] }) => {
  // Props
  const { open, setOpen, pages } = props

  // Hooks
  const sections = useSelector((state: any) => state.website.website.sections)
  const siteLogoData = sections?.find((item: any) => item?.type === SECTION_NAME.LOGO)
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const restaurant = useSelector((state: any) => state.website.website.restaurant)
  const colorData = useSelector((state: any) => state.website.website.color)
  const pagesType = useSelector((state: any) => state.website.website.pageType)
  const dispatch = useDispatch()

  const handlePageChange = (type: number) => {
    dispatch(setPageType(type))
    setOpen(false)
  }

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      anchor='top'
      sx={{ '& .MuiDrawer-paper': { bgcolor: colorData?.main } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          px: 4
        }}
      >
        <Box>
          {siteLogoData?.logoType === 1 && (
            <Typography
              sx={{ fontWeight: 700, color: '#fff', fontSize: '1.5rem', ...AppUtils.getFontFamily(fontType) }}
            >
              {siteLogoData?.restaurantName}
            </Typography>
          )}
          {siteLogoData?.logoType === 2 && (
            <Box component={'img'} src={`${UrlHelper.imgPath}${siteLogoData?.restaurantLogo}`} sx={{ width: 100, height: 50 }} />
          )}
        </Box>
        <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
          <Icon icon='mdi:close' />
        </IconButton>
      </Box>
      <Box>
        <Box sx={{ pb: 4, textAlign: 'center' }}>
          {Array.isArray(pages) &&
            pages?.length > 0 &&
            pages?.map((page: any, index: number) => {
              if (index > 0 && index < 5) {

                if (page?.type === 3 && !restaurant?.has_delivery) return null;

                return (
                  <Typography
                    key={index}
                    sx={{
                      fontWeight: 500,
                      color: pagesType === page?.type ? colorData?.main : '#fff',
                      bgcolor: pagesType === page?.type ? colorData?.light : colorData?.main,
                      ...AppUtils.getFontFamily(fontType),
                      mb: 2,
                      p: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { bgcolor: colorData?.light, color: colorData?.main, cursor: 'pointer' }
                    }}
                    onClick={() => handlePageChange(page?.type)}
                  >
                    {page?.pageTitle}
                  </Typography>
                )
              }
            })}
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerView
