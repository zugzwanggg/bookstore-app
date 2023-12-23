import { useAppSelector,useAppDispatch } from "../hooks"
import Header from "./Header"
import Footer from "./Footer"
import Cart from "../pages/Cart"
import { Outlet } from "react-router-dom"
import { closeCart } from "../features/cartSlice/cartSlice"

const Layout = () => {

  const {isActive} = useAppSelector(state=>state.cart)
  const dispatch = useAppDispatch()

  

  return (
    <div>
      <Header/>
      <Cart/>
      {isActive && <div onClick={()=>dispatch(closeCart())} className="fixed top-0 right-0 w-full h-full bg-black opacity-25 z-10"></div>}
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout