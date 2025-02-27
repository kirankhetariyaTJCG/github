// React Imports
import { useEffect } from 'react'

// MUI Imports
import { Box, Container, Typography, Divider, Avatar } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { getCategories } from '@/redux-store/Category/Action'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const Menu = () => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)
  const categories = useSelector((state: any) => state.category.category)
  const restaurant = useSelector((state: any) => state.website.website.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?.menu_id)) {
      dispatch(getCategories({ menu_id: restaurant?.menu_id }))
    }
  }, [restaurant?.menu_id])

  return (
    <Container maxWidth='lg' sx={{ mb: 16 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '1.5rem', md: '2.875rem' },
            fontWeight: 600,
            color: colorData?.main,
            ...AppUtils.getFontFamily(fontType)
          }}
        >
          {restaurant?.name} Menu
        </Typography>
        <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {Array.isArray(categories) &&
          categories?.length > 0 &&
          categories?.map((category, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  width: { xs: '100%', md: '49%' },
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '20px',
                  p: 4
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 60%), url(${UrlHelper.imgPath}${category?.image?.replace(/\\/g, "/")})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '10rem',
                    borderRadius: '8px',
                    p: 4
                  }}
                >
                  <Typography variant='h4' sx={{ color: '#fff', fontWeight: 600, ...AppUtils.getFontFamily(fontType) }}>
                    {category?.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#fff',
                      fontWeight: 400,
                      ...AppUtils.getFontFamily(fontType),
                      mb: 4,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      WebkitLineClamp: 3
                    }}
                  >
                    {category?.description}
                  </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                  {Array.isArray(category?.items) &&
                    category?.items?.length > 0 &&
                    category?.items?.map((menuItem: any, i: number) => {
                      return (
                        <Box
                          key={i}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: 4,
                            borderRadius: '8px',
                            mb: category?.items?.length - 1 === i ? 0 : 4,
                            bgcolor: '#F2F2F2',
                            gap: 4
                          }}
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography
                                sx={{ color: '#403429', fontWeight: 500, ...AppUtils.getFontFamily(fontType) }}
                              >
                                {menuItem?.name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: '#808080',
                                  fontSize: '0.8rem',
                                  fontWeight: 400,
                                  ...AppUtils.getFontFamily(fontType),
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  WebkitLineClamp: 2
                                }}
                              >
                                {menuItem?.description}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                color: '#403429',
                                fontWeight: 600,
                                ...AppUtils.getFontFamily(fontType),
                                mt: 2
                              }}
                            >
                              $ {menuItem?.price.toFixed(2)}/-
                            </Typography>
                          </Box>
                          <Avatar variant='rounded' src={`${UrlHelper.imgPath}${menuItem?.image?.replace(/\\/g, "/")}`} sx={{ width: 80, height: 80 }} />
                        </Box>
                      )
                    })}
                </Box>
              </Box>
            )
          })}
      </Box>
    </Container>
  )
}

export default Menu
