// Third Party Imports
import { combineReducers } from 'redux'

// Slice Imports
import Taxtion from './Taxtion'

// Combine the reducers
const Payments = combineReducers({
  taxtion: Taxtion
})

export default Payments
