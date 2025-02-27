'use client'

// React Imports
import { useEffect } from 'react'

// Next Imports
import { useSearchParams } from 'next/navigation'

// MUI Imports
import Box from '@mui/material/Box'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import HomeView from '@/views/pages/Preview/View/HomePage'
import MenuPage from '@/views/pages/Preview/View/MenuPage'
import PreviewHeader from '@/views/pages/Preview/PreviewHeader'
import MobileView from '@/views/pages/Preview/MobileView'
import TabletView from '@/views/pages/Preview/TabletView'
import Header from '@/views/pages/Preview/View/Components/Header'
import Footer from '@/views/pages/Preview/View/Components/Footer'
import Settings from '@/views/pages/Preview/Settings'
import BottomButtons from '@/views/pages/Preview/View/Components/BottomButtons'
import HeroSection from '@/views/pages/Preview/View/Components/Hero'
import FoodDelivery from '@/views/pages/Preview/View/FoodDelivery'
import SpecialOffers from '@/views/pages/Preview/View/SpecialOffers'
import ContactUs from '@/views/pages/Preview/View/ContactUs'
import OrderAhead from '@/views/pages/Preview/View/OrderAhead'
import TableReservation from '@/views/pages/Preview/View/TableReservation'

// Store Imports
import { getWebsiteData } from '@/redux-store/Website/Action'
import { getRestaurantServiceSchedules } from '@/redux-store/RestaurantsServiceSchedules/Action'
import { getDeliveryZones } from '@/redux-store/Delivery/Action'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { getPromotions } from '@/redux-store/SelfMade/Action'
import Script from 'next/script'

const getPageTitle: any = {
  1: 'Home',
  2: 'Menu',
  3: 'Food Delivery',
  4: 'Special Offers',
  5: 'Contact Us',
  6: 'Table Reservation',
  7: 'Order Ahead',
}

const Editor = () => {
  // Hooks
  const preType = useSelector((state: any) => state.website.website.previewType)
  const pagesType = useSelector((state: any) => state.website.website.pageType)
  const dispatch = useDispatch()
  const params = useSearchParams()
  const restaurant_id = params.get('restaurant_id')

  useEffect(() => {
    if (AppUtils.checkValue(restaurant_id)) {
      dispatch(getWebsiteData({ restaurant_id: restaurant_id }))
      dispatch(getRestaurantServiceSchedules({ data: { restaurant_id: restaurant_id } }))
      dispatch(getDeliveryZones({ restaurant_id: restaurant_id }))
      dispatch(getPromotions({ restaurant_id: restaurant_id }))
    }
  }, [restaurant_id])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pagesType])



  return (
    <>
      <PreviewHeader />
      {preType === 1 && (
        <>
          <Header />
          <HeroSection pageTitle={getPageTitle[pagesType]} />
          {pagesType === 1 && <HomeView />}
          {pagesType === 2 && <MenuPage />}
          {pagesType === 3 && <FoodDelivery />}
          {pagesType === 4 && <SpecialOffers />}
          {pagesType === 5 && <ContactUs />}
          {pagesType === 6 && <TableReservation />}
          {pagesType === 7 && <OrderAhead />}
          <Footer />
          <BottomButtons />
          <Settings />
        </>
      )}
      {(preType === 2 || preType === 3) && (
        <Box
          sx={{
            width: '100%',
            height: preType === 3 ? '50rem' : '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            overflow: 'auto'
          }}
        >
          {preType === 2 && <TabletView />}
          {preType === 3 && <MobileView />}
        </Box>
      )}

      <Script
        src="/sdk/sdk.js"
        strategy="lazyOnload"
      />
    </>
  )
}

export default Editor
