import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice/cartSlice'
import { booksApi } from './reduxApi/booksApi'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    [booksApi.reducerPath]: booksApi.reducer
  },


  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware)
  
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch