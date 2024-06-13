import { createSlice } from '@reduxjs/toolkit'
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: []
  },
  reducers: {
    updateCart: (state, action) => {
      const quantity = state.cartProducts.some(product => parseInt(action.payload.quantity) === 0)
      if (quantity) {
        console.log('entro')
        state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload.id)
      } else {
        const product = state.cartProducts.some(product => product.id === action.payload.id)
        if (!product) {
          state.cartProducts.push(action.payload)

          console.log('no existe')
        } else {
        // updatear cart
          state.cartProducts = state.cartProducts.map(product => {
            if (product.id === action.payload.id) {
              product.quantity = action.payload.quantity
            }
            return product
          })
        // state.cartProducts.push(action.payload)
        }
      }
      // console.log(action.payload.id + ' and ' + action.payload.quantity)

      console.log('Array')
      state.cartProducts.forEach(product => {
        console.log('ID:', product.id, 'Cantidad:', product.quantity)
      })
    }
  }
})

export const { updateCart } = cartSlice.actions

export default cartSlice.reducer
