import { configureStore } from '@reduxjs/toolkit'
import auth from './stores/auth'
import basket from './stores/basket'

export default configureStore({
  reducer: {
    auth: auth,
    basket: basket,
  },
})