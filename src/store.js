import { configureStore } from '@reduxjs/toolkit'
import auth from './stores/auth'
import basket from './stores/basket'
import products from './stores/products'

export default configureStore({
  reducer: {
    auth: auth,
    basket: basket,
    products: products,
  },
})