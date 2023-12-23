import { useGetBookQuery } from "../../reduxApi/booksApi"
import { useAppDispatch,useAppSelector } from "../../hooks"
import {useState} from 'react'
import { addToCart, removeFromCart, setValue } from "../../features/cartSlice/cartSlice"
import { useNavigate } from "react-router-dom"
import IBook from "../../types"


const Search = () => {

  const dispatch = useAppDispatch()
  const {value,cart} = useAppSelector(state => state.cart)
  const [searchValue,setSearchValue] = useState('')
  const {data,isFetching} = useGetBookQuery(value)
  const [isFilter,setIsFilter] = useState(false)
  const [isCategory,setIsCategory] = useState(false)
  const [genre,setGenre] = useState('All')
  const [filter,setFilter] = useState('Both')
  const navigate = useNavigate()
  

  const genresArray:string[] = [
    'All',
    'Classics',
    'Fantasy',
    'Comics & Graphic Novels',
    'Romance',
    'Adventure',
    'Fiction',
    'Horror',
    'Science',
    'Education',
    'Philosophy'
  ]
  

  
  const handleGenres = (value:string) => {
    setIsCategory(false)
    setGenre(value)
  }

  const handleFilter = (value:string) => {
    setIsFilter(false)
    setFilter(value)
  }


  const handlekeydown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key =='Enter') {
      dispatch(setValue(searchValue))
      setSearchValue("")
    }
  }


  const handleSubmit = () => {
    dispatch(setValue(searchValue))
    setSearchValue("")
  }

  return (
    <div className="container">
      
      <div className="relative max-w-xl mx-auto mt-9">
        <input onKeyDown={e=>handlekeydown(e)} name="searchInput" value={searchValue} onChange={e=>setSearchValue(e.target.value)} className={`border-solid border-black border-2 py-3 px-5 w-full rounded-3xl`} placeholder={"Type the name of book or author..."} type="text" />
        <button onClick={()=>handleSubmit()}><img className="absolute right-0 top-1/2 -translate-y-1/2 p-4" src="./img/search.svg" alt="Search" /></button>
        <span className="block absolute bg-yellow h-10 rounded-3xl w-full top-5 left-1 -z-10 "></span>
      </div>
      <div className="mt-10 md:flex md:items-center md:justify-between">
        {value ? <h1 className="uppercase md:text-2xl text-center">Results “<span className="text-blue">{value}</span>”</h1> : <span></span>}
        <div className="flex flex-col items-end md:flex-row md:gap-8">
          <div onMouseOver={()=>setIsCategory(true)} onMouseLeave={()=>setIsCategory(false)} className="relative w-full md:w-80 mt-8">
            <button className={`bg-white text-left border-solid border-black border-2 py-4 px-5 w-full rounded-3xl`}>Categories: {genre}</button>
            <img onClick={()=>setIsCategory(prev=>!prev)} className={`absolute right-0 top-1/2 -translate-y-1/2 p-4 ${!isCategory ? '-rotate-90': 'rotate-90'}`} src="./img/left.svg" alt="Search" />
            {isCategory
            ?
            <ul className="w-ful z-10 text-black ml-1 border-solid border-black border-2 rounded-3xl w-full bg-white absolute flex flex-col">
              {genresArray.map((item,index)=> {
                if (index === 0) {
                  return <li key={index} onClick={()=>handleGenres(item)} className="hover:bg-gray-300 w-full text-center rounded-t-3xl py-2 cursor-pointer">{item}</li>
                } else if (index == genresArray.length - 1) {
                  return <li key={index} onClick={()=>handleGenres(item)} className="hover:bg-gray-300 w-full text-center rounded-b-3xl py-2 cursor-pointer">{item}</li>
                } else {
                  return <li key={index} onClick={()=>handleGenres(item)} className="hover:bg-gray-300 w-full text-center py-2 cursor-pointer">{item}</li>
                }
              })}
            </ul>
            :
            ''}
            <span className="block absolute bg-orange h-10 rounded-3xl w-full top-7 left-1 -z-10 "></span>
          </div>
          <div onMouseOver={()=>setIsFilter(true)} onMouseLeave={()=>setIsFilter(false)} className="relative w-36 mt-8">
            <button className={`bg-white border-solid border-black border-2 py-4 px-5 w-full rounded-3xl`}>Filter by</button>
            <img onClick={()=>setIsFilter(prev=>!prev)} className={`absolute -right-1 top-1/2 -translate-y-1/2 p-4 ${!isFilter ? '-rotate-90': 'rotate-90'}`} src="./img/left.svg" alt="Search" />
            {isFilter 
            ?
            <ul className="w-ful z-10 text-black ml-1 border-solid border-black border-2 rounded-3xl w-full bg-white absolute flex flex-col">
              <li onClick={()=>handleFilter('Both')} className="hover:bg-gray-300 w-full text-center rounded-t-3xl py-2 cursor-pointer">Both</li>
              <li onClick={()=>handleFilter('Free')} className="hover:bg-gray-300 w-full text-center py-2 cursor-pointer">Only free</li>
              <li onClick={()=>handleFilter('Paid')} className="hover:bg-gray-300 w-full text-center rounded-b-3xl py-2 cursor-pointer">Only paid</li>
            </ul>
            :
            ''}
            <span className="block absolute bg-orange h-10 rounded-3xl w-full top-7 left-1 -z-10 "></span>
          </div>
        </div>
      </div>
      {isFetching 
      ? 
      <div className="fixed right-1/2 translate-x-1/2"><img src="./img/loader.svg" className="animate-spin"/></div>
      :
      <ul className="grid md:grid-cols-4 justify-items-center gap-14 my-28 relative">
        {
          data?.items.length > 0
          ?
          value
            ? data.items
            .filter((item:IBook)=>{
              if (filter =='Free') {
                return item.saleInfo.saleability == 'NOT_FOR_SALE'
              } else if (filter =='Paid') {
                return item.saleInfo.saleability == 'FOR_SALE'
              } else {
                return item
              }
            })
            .filter((item:IBook)=>{
              return genre !== 'All' ? item.volumeInfo.categories?.some(text => text == genre) : item
            }).map((item:IBook) => {
              let img = `https://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api`
    
              if (img !== undefined) {
                return <li className="flex flex-col justify-between w-52" key={item.id}>
                  <img onClick={()=>navigate(`../product/${item.id}`)} className="shadow-2xl max-h-72" src={img} />
                  <div className="flex flex-col items-center justify-between gap-4 mt-4">
                    <p className="p-2 w-full rounded-2xl border-black border-2 text-center">{item.saleInfo.saleability == 'FOR_SALE' ? `${item.saleInfo.listPrice.amount} ${item.saleInfo.listPrice.currencyCode}` : "FREE"}</p>
                    {cart.some(elem=> elem.id == item.id)
                    ?
                    <button onClick={()=>dispatch(removeFromCart(item))} className="p-2 rounded-2xl border-black border-2 w-full bg-blue"><img src="./img/shopping-cart.svg" className="mx-auto" /></button>
                    :
                    <button onClick={()=>dispatch(addToCart(item))} className="p-2 bg-yellow rounded-2xl border-black border-2 w-full hover:bg-orange"><img src="./img/shopping-cart.svg" className="mx-auto" /></button>
                    }
                  </div>
                </li>
              }
            })
            :
            <div className="absolute w-full right-1/2 translate-x-1/2 -bottom-12 md:-bottom-2 flex gap-3 flex-col items-center justify-center md:flex-row">
              <img className="w-24" src="./img/bookFind.svg"/>
              <p className='text-orange text-2xl mt-2 text-center'>Find your favorite books</p>
            </div>
            
          :
          <div className="absolute right-1/2 w-full translate-x-1/2 -bottom-12 md:-bottom-2 flex gap-3 flex-col items-center justify-center md:flex-row">
            <img className="w-24" src="./img/bookFind.svg"/>
            <p className='text-orange text-2xl text-center mt-2'>Nothing was found</p>
          </div>
        }
      </ul>
      }
    </div>
  )
}

export default Search