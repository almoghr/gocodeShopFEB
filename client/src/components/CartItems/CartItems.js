import React, { useContext } from 'react'
import { MyContext } from '../../MyContext'

const CartItems = () => {
    const {cart} = useContext(MyContext)
  return (
    <div>
        {cart.map(p => <div>{p.title.slice(0,10)}... total:{p.amount * p.price}</div>)}
    </div>
  )
}

export default CartItems