import { openCart } from "../features/cartSlice/cartSlice"
import { useAppDispatch,useAppSelector } from "../hooks"
import { FC } from "react"
import { useNavigate } from "react-router-dom"


const Header:FC = () => {

  const dispatch = useAppDispatch()
  const {count} = useAppSelector(state=>state.cart)
  const navigate = useNavigate()


  return (
    <header className="container py-6 flex justify-between">
      <img onClick={()=>navigate('/')} src="./img/logo.svg" alt="logo"/>
      <button className="relative " onClick={()=>dispatch(openCart())}>
        <img src="./img/shopping-cart.svg" alt="cart" />
        {count ? <span className="bg-orange w-4 h-4 rounded-full flex items-center justify-center text-white absolute -top-1 -right-2">{count}</span> : ''}
      </button>
    </header>
  )
}

export default Header