import { useAppSelector,useAppDispatch } from "../hooks"
import { addQuantity, closeCart, decQuantity, removeFromCart, calcTotal } from "../features/cartSlice/cartSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Cart = () => {
  const {isActive,count,cart,totalCost} = useAppSelector(state=>state.cart)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(calcTotal())
  },[cart])
  

  const handleNavigation = (data:string)=> {
    dispatch(closeCart())
    navigate(`/product/${data}`)
  }
   

  
  
  return (
    <div className={`max-w-lg fixed py-4 px-4 duration-500 bg-white top-0 right-0 z-30 w-full h-screen ${isActive ? 'translate-x-0': 'translate-x-full'}`}>
      <div className="flex items-center gap-2">
        <img onClick={()=>dispatch(closeCart())} src="./img/left.svg"/>
        <p className="text-grayPrimary">Your Cart <span className="text-blue">({count} items)</span></p>
      </div>

      <ul className="flex flex-col gap-4 mt-6 h-3/4 overflow-y-scroll">
        {
          cart.map(item=> {
            let img = `https://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api`
            return <li key={item.id} className="border-dashed border-2 py-6 px-6 rounded-3xl border-grayPrimary flex justify-between gap-2">
            <img onClick={()=>handleNavigation(item.id)} className="w-20 h-32" src={img} alt="" />
            <div className="w-48 flex flex-col justify-between">
              <p>{item.volumeInfo.title}</p>
              <small>{item.volumeInfo.authors?.map(item=>`${item}\n`)}</small>
              <div className={`flex items-center gap-4 ${item.saleInfo.saleability == 'FOR_SALE' ?'border-black' : 'hidden'}`}>
                <button onClick={()=>dispatch(decQuantity(item))} className={`rounded-full w-4 flex items-center justify-center h-4 border-black border-2 font-bold`}>-</button>
                <input value={item.quantity} readOnly className={`w-9 text-center border-black border-2 rounded-md`} type="number" />
                <button onClick={()=>dispatch(addQuantity(item))} className={`rounded-full w-4 flex items-center justify-center h-4 border-black border-2 font-bold`}>+</button>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <p className="text-orange">{item.saleInfo.saleability == 'FOR_SALE' ? `${item.saleInfo.listPrice.amount} ${item.saleInfo.listPrice.currencyCode}`: 'Free'}</p>
              <img onClick={()=>dispatch(removeFromCart(item))} className="w-6" src="./img/trash.svg"/>
            </div>
          </li>
          })
        }
        <li>
          <p>&#160;</p>
        </li>
      </ul>
      <div className="w-full flex flex-col gap-4 fixed bg-white bottom-0 right-0 py-4 px-6 border-2 border-black rounded-t-3xl text-black">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">Subtotal:</h1>
          <span className="bg-yellow border-2 border-black rounded-3xl py-2 px-10 text-xl">{totalCost}</span>
        </div>
        <button className="bg-orange mb-4 border-2 border-black rounded-3xl text-white py-4">Pay with stripe</button>
      </div>
    </div>
  )
}

export default Cart