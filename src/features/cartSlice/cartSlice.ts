import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import IBook from "../../types";


type stateType = {
  cart: IBook[],
  isActive: boolean,
  value: string,
  count: number,
  totalCost: number
}

const cart = JSON.parse(localStorage.getItem('cart')||'[]') ? JSON.parse(localStorage.getItem('cart')||'[]') : []
const count = JSON.parse(localStorage.getItem('count')||'0') ? JSON.parse(localStorage.getItem('count')||'0') : 0

const initialState:stateType = {
  cart,
  isActive: false,
  value: '',
  count,
  totalCost: 0,
}




const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isActive = true
    },
    closeCart: (state)=> {
      state.isActive = false
    },
    setValue: (state,action:PayloadAction<string>)=> {
      state.value = action.payload
    },
    addQuantity: (state,action:PayloadAction<IBook>)=> {
      state.cart.map(item => {
        if (item.id == action.payload.id) {
          item.quantity++
          item.saleInfo.listPrice.amount += item.saleInfo.listPrice.amount
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    decQuantity: (state,action:PayloadAction<IBook>)=> {
      state.cart.map(item => {
        if (item.id == action.payload.id) {
          if (item.quantity > 1) {
            item.quantity--
            item.saleInfo.listPrice.amount = item.saleInfo.listPrice.amount/2
          }
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    addToCart: (state,action:PayloadAction<IBook>)=> {

      if (!state.cart.some(item => item.id == action.payload.id)) {
        state.count++
        state.cart.push({...action.payload,quantity: 1})
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
      localStorage.setItem('count', JSON.stringify(state.count))
  
    },
    removeFromCart: (state,action:PayloadAction<IBook>) => {
      state.count--
      const cartArray = state.cart.filter(item=> item.id !== action.payload.id)
      state.cart = cartArray
      localStorage.setItem('cart', JSON.stringify(state.cart))
      localStorage.setItem('count', JSON.stringify(state.count))
    },
    calcTotal: (state)=> {
      let {total} = state.cart.reduce((cartTotal, cartItem)=>{
        const price = cartItem.saleInfo.saleability !== 'NOT_FOR_SALE' ? cartItem.saleInfo.listPrice.amount : 0
        cartTotal.total += price

        return cartTotal
      },{
        total: 0,
      })
      state.totalCost = parseFloat(total.toFixed(2))
    }
  }
})

export const {openCart,
              closeCart,
              setValue,
              addToCart,
              removeFromCart,
              addQuantity,
              decQuantity,
              calcTotal} = cartSlice.actions
export default cartSlice.reducer