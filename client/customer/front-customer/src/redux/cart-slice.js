import { createSlice } from '@reduxjs/toolkit'
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: []
  },
  reducers: {
    updateCart: (state, action) => {
      // console.log(action.payload)
      const quantity = state.cartProducts.some(product => parseInt(action.payload.quantity) === 0)
      if (quantity) {
        state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload.id)
      } else {
        const product = state.cartProducts.some(product => product.id === action.payload.id)
        if (!product) {
          state.cartProducts.push(action.payload)
        } else {
        // updatear cantidad
          state.cartProducts = state.cartProducts.map(product => {
            if (product.id === action.payload.id) {
              product.quantity = action.payload.quantity
            }
            return product
          })
        }
      }
      console.log('Array')
      state.cartProducts.forEach(product => {
        // console.log('ID:', product.id, 'Cantidad:', product.quantity, 'precio:', product.price)
      })
    }
  }
})

export const { updateCart } = cartSlice.actions

export default cartSlice.reducer
