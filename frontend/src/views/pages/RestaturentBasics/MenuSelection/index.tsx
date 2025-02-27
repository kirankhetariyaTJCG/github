'use client'

// React Imports
import { useState, useRef, useEffect } from 'react'

// MUI Imports
import { Box, Card, Typography, LoadingButton, IconButton, Checkbox, Grid, Divider } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

// Store Impors
import { getAllMenu, deleteMenu, getDefaultMenu, addMenu } from '@/redux-store/MenuSelection/Action'

// Custom Imports
import AddEditMenu from './AddEditMenu'
import CsDelete from '@/@core/components/CsDelete'
import CustomBackdrop from '@/@core/components/CsBackdropLoader'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Style Imports
import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

interface Item {
  cuisine_name: string
  is_default: boolean
  _id: string
  cuisine_image: string
}

const MenuView = () => {
  // State
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })

  // Hooks
  const selectedMenuData = useSelector((state: any) => state.menuSelection.selectedMenuData)
  const defaultMenuData = useSelector((state: any) => state.menuSelection.defaultMenuData)
  const loading = useSelector((state: any) => state.menuSelection.loading)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const swiperRef = useRef<any>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?._id)) {
      dispatch(getAllMenu({ restaurant_id: restaurant?._id }))
      dispatch(getDefaultMenu({ restaurant_id: restaurant?._id }))
    }
  }, [restaurant?._id])

  useEffect(() => {
    !loading && setIsDelete({ open: false, id: '' })
  }, [loading])

  const handleMenuChange = (id: string) => {
    const activeMenu = selectedMenuData?.find((item: any) => item?.cuisine_id === id)
    activeMenu?.is_default
      ? dispatch(deleteMenu(activeMenu?._id))
      : dispatch(addMenu({ cuisine_id: id }))
  }

  return (
    <>
      <CustomBackdrop open={loading} />
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            px: 4,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.125rem', width: 'max-content', whiteSpace: 'nowrap' }}>
            Restaurant Menu
          </Typography>
          <LoadingButton
            variant='contained'
            sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
            onClick={() => setIsAdd({ open: true, row: {} })}
            loading={loading}
            loadingPosition='start'
            startIcon={loading ? <>&nbsp;</> : <></>}
          >
            Add Custom Menu
          </LoadingButton>
        </Box>
        <Box
          sx={{
            p: 4,
            mx: 'auto',
            overflow: 'auto',
            height: 'calc(100vh - 10rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Grid container sx={{ width: '100%', m: 0, height: 'calc(100vh - 27rem)', overflow: 'auto' }}>
            {Array.isArray(selectedMenuData) && selectedMenuData?.length > 0 ? (
              selectedMenuData?.map((item: Item, index: number) => {
                return (
                  <Grid key={index} item xs={12} sm={4} md={2}>
                    <Box
                      sx={{
                        borderRadius: '6px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: theme => theme.shadows[3],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        m: 3,
                        '&:hover .btnBox': { transform: 'scale(1)' }
                      }}
                    >
                      {AppUtils.checkValue(item?.cuisine_image) ? (
                        <Box
                          component={'img'}
                          src={`${UrlHelper.imgPath}${item?.cuisine_image}`}
                          sx={{ width: '100%', height: '7rem', objectFit: 'cover' }}
                        />
                      ) : (
                        <Icon icon={'hugeicons:menu-restaurant'} style={{ width: '100%', height: '7rem' }} />
                      )}
                      <Box
                        className='btnBox'
                        sx={{
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 2,
                          zIndex: 9,
                          height: '100%',
                          width: '100%',
                          bgcolor: 'rgba(38, 43, 67, 0.5)',
                          transition: 'all 0.3s ease-in-out',
                          transform: 'scale(0)'
                        }}>
                        {!item?.is_default &&
                          <IconButton size='small' color='primary'
                            sx={{ bgcolor: '#fff !important' }}
                            onClick={() => setIsAdd({ open: true, row: item })}
                          >
                            <Icon icon={'lucide:edit'} />
                          </IconButton>}
                        <IconButton size='small' color='primary'
                          sx={{ bgcolor: '#fff !important' }}
                          onClick={() => setIsDelete({ open: true, id: item?._id })}
                        >
                          <Icon icon={'icon-park-twotone:delete'} />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          bgcolor: 'rgba(247, 247, 249, 0.8)',
                          padding: '0.5rem',
                          width: '100%',
                          position: 'absolute',
                          bottom: 0,
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, pr: 1 }}>{item?.cuisine_name}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                )
              })
            ) : (
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 600 }}>No Menu Found</Typography>
              </Grid>
            )}
          </Grid>
          <Box>
            <Divider sx={{ fontWeight: 500, my: 4 }}>Default Cuisines</Divider>
            <Box
              sx={{
                position: 'relative',
                '& .swiper-pagination-bullet-active': {
                  bgcolor: theme => `${theme.palette.primary.main} !important`
                },
                '& .swiper-pagination-bullet': { bgcolor: '#fff', opacity: 1 },
              }}
            >
              <IconButton
                size='small'
                sx={{
                  position: 'absolute',
                  left: '0',
                  top: '40%',
                  zIndex: 2,
                  bgcolor: theme => `${theme.palette.primary.main} !important`,
                  color: '#fff !important'
                }}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <Icon icon={'mingcute:arrow-left-line'} />
              </IconButton>
              <Box
                sx={{ mx: '2.5rem !important' }}
                component={Swiper}
                spaceBetween={20}
                slidesPerView={4}
                pagination={{ clickable: true, dynamicBullets: true }}
                onSwiper={swiper => (swiperRef.current = swiper)}
                breakpoints={{
                  568: { slidesPerView: 1 },
                  660: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  915: { slidesPerView: 4 },
                  1253: { slidesPerView: 5 }
                }}
              >
                {Array.isArray(defaultMenuData) &&
                  defaultMenuData?.length > 0 &&
                  defaultMenuData.map((cuisine: any, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <Box
                          sx={{
                            borderRadius: '6px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: theme => theme.shadows[3],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            mb: 2
                          }}
                        >
                          {AppUtils.checkValue(cuisine?.cuisine_image) ? (
                            <Box
                              component={'img'}
                              src={`${UrlHelper.imgPath}${cuisine?.cuisine_image}`}
                              sx={{ width: '100%', height: '10rem', objectFit: 'cover' }}
                            />
                          ) : (
                            <Icon icon={'hugeicons:menu-restaurant'} fontSize={100} />
                          )}
                          <Box
                            sx={{
                              bgcolor: 'rgba(247, 247, 249, 0.8)',
                              padding: '0.5rem',
                              width: '100%',
                              position: 'absolute',
                              bottom: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Typography sx={{ fontWeight: 600, pl: 2 }}>{cuisine?.cuisine_name}</Typography>
                            <Box>
                              <Checkbox
                                checked={selectedMenuData?.some(
                                  (cuisineItem: any) => cuisineItem?.cuisine_id === cuisine?._id && cuisineItem?.is_default
                                )}
                                onChange={() => handleMenuChange(cuisine?._id)}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </SwiperSlide>
                    )
                  })}
              </Box>
              <IconButton
                size='small'
                sx={{
                  position: 'absolute',
                  right: '0',
                  top: '40%',
                  zIndex: 1,
                  bgcolor: theme => `${theme.palette.primary.main} !important`,
                  color: '#fff !important'
                }}
                onClick={() => swiperRef?.current?.slideNext()}
              >
                <Icon icon={'mingcute:arrow-right-line'} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>

      <AddEditMenu open={isAdd?.open} setOpen={setIsAdd} row={isAdd?.row} handleMenuChange={handleMenuChange} />

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Menu'
        loading={loading}
        handleDelete={() => dispatch(deleteMenu(isDelete?.id))}
      />
    </>
  )
}

export default MenuView
