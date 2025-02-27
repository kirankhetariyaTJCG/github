import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'

// Slice Imports
import ThemeSlice from './Theme'
import Payments from './Payments'
import QrFlyers from './QrFlyers'
import ServiceFee from './ServiceFee'
import AuthSlice from './Auth'
import MenuSelection from './MenuSelection'
import RestaurantSlice from './Restaurant'
import CommonSlice from './CommonSlice'
import UserSlice from './User'
import serveMasterSlice from './ServeMaster'
import DeliverySlice from './Delivery'
import ProspectsSlice from './InviteProspects'
import WebsiteSlice from './Website'
import Category from './Category'
import Addons from './Addons'
import RestaurantServiceSchedulesSlice from './RestaurantsServiceSchedules'
import SelfMade from './SelfMade'
import PreMade from './PreMade'
import ReportsSlice from './Reports'
import TakingOrderSlice from './OrderTakingApp'


export const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    auth: AuthSlice,
    payments: Payments,
    qr_code: QrFlyers,
    fees: ServiceFee,
    menuSelection: MenuSelection,
    restaurant: RestaurantSlice,
    common: CommonSlice,
    user: UserSlice,
    serveMaster: serveMasterSlice,
    delivery: DeliverySlice,
    invite_prospects: ProspectsSlice,
    website: WebsiteSlice,
    category: Category,
    addons: Addons,
    service_schedules: RestaurantServiceSchedulesSlice,
    self_made: SelfMade,
    pre_made: PreMade,
    reports: ReportsSlice,
    takingOrder: TakingOrderSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }) //.concat(logger)
})

export type AppDispatch = typeof store.dispatch
