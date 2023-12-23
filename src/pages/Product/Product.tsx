import { useParams } from "react-router-dom"
import { useGetBookByIdQuery } from "../../reduxApi/booksApi"
import { useAppDispatch,useAppSelector } from "../../hooks"
import { addToCart, removeFromCart } from "../../features/cartSlice/cartSlice"

const Product = () => {

  const {book} = useParams()
  const {data,isLoading} = useGetBookByIdQuery(book)
  const dispatch = useAppDispatch()
  const {cart} = useAppSelector(state=>state.cart)



  
  
  
  let img = `https://books.google.com/books/content?id=${data?.id}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api`

  

  return (
    <div className="container mt-16 mb-28 flex flex-col items-center md:flex-row md:justify-center md:gap-36">
      {!isLoading
      ?
      <>
        <img src={img} className="w-44 h-64 shadow-2xl md:w-64 md:h-96" alt="" />
        <div className="mt-12 md:w-1/2">
          <h1 className="title-primary text-2xl">{data.volumeInfo.title}</h1>
          <div className="relative">
            {data.volumeInfo.authors ? <p className="py-6 px-8 bg-white border-dashed border-2 border-black rounded-3xl font-medium mt-10">{data.volumeInfo.authors?.map((item:string)=>`${item}\n`)}</p> : ''}
            <span className="bg-grayPrimary absolute -z-10 top-2 -right-2 w-full rounded-3xl h-full"></span>
          </div>
          <div className="relative">
            {data.volumeInfo.description ? <p dangerouslySetInnerHTML={{__html: data.volumeInfo.description}} className="py-6 px-8 bg-white border-dashed border-2 border-black rounded-3xl font-medium mt-10"></p> : ''}
            <span className="bg-grayPrimary absolute -z-10 top-2 -right-2 w-full rounded-3xl h-full"></span>
          </div>
          <div className="mt-14">
            <div className="flex items-center justify-between">
              <h1 className="text-orange text-4xl">{data.saleInfo.saleability == 'FOR_SALE' ? `${data.saleInfo.listPrice.amount} ${data.saleInfo.listPrice.currencyCode}` : "FREE"}</h1>
            </div>
            <div className="flex flex-col gap-4 mt-10 md:flex-row md:justify-between">
            {data.saleInfo.saleability == 'FOR_SALE' 
            ? 
              <button className="p-2 bg-orange rounded-2xl border-black border-2 w-full text-black text-xl">Buy now</button>
              :
              <button className="p-2 bg-orange rounded-2xl border-black border-2 w-full text-black text-xl">Download</button>
            }
              {cart.some(item=>item.id==data.id)
              ?
                <button onClick={()=>dispatch(removeFromCart(data))} className="p-2 rounded-2xl border-black border-2 w-full bg-blue"><img src="./img/shopping-cart.svg" className="mx-auto" /></button>
              :
                <button onClick={()=>dispatch(addToCart(data))} className="p-2 bg-yellow rounded-2xl border-black border-2 w-full hover:bg-orange"><img src="./img/shopping-cart.svg" className="mx-auto" /></button>
              }
            </div>
          </div>
        </div>
      </>
      :
      <div className="fixed right-1/2 translate-x-1/2"><img src="./img/loader.svg" className="animate-spin"/></div>
      }
    </div>
  )
}

export default Product