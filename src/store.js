import { configureStore } from '@reduxjs/toolkit'
import auth from './stores/auth'

export default configureStore({
  reducer: {
    auth: auth,
  },
})