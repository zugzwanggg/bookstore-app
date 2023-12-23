import {useState} from 'react'
import { useAppDispatch } from '../../../hooks'
import { useNavigate, Link } from 'react-router-dom'
import { setValue } from '../../../features/cartSlice/cartSlice'

const Hero = () => {
  const [searchValue,setSearchValue] = useState('')
  const [empty,setEmpty] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    if (searchValue.length == 0) {
      return setEmpty(true)
    } else {
      setEmpty(false)
    }
    dispatch(setValue(searchValue))
    navigate(`search`)
  }

  const handlekeydown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key =='Enter') {
      dispatch(setValue(searchValue))
      navigate(`search`)
    }
  }

  return (
    <section className="container flex items-center justify-between gap-9">
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-6xl font-medium text-4xl flex items-center">What book you looking for?<img className="flex w-16 right-2" src="./img/bookgif.gif" alt="" /></h1>
        <p className="md:text-base text-grayPrimary text-sm mt-4 font-medium">Explore our catalog and find your next read.</p>
        <div className="relative mt-9">
          <input onKeyDown={handlekeydown} value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className={`border-solid outline-none border-black border-2 py-3 px-5 w-full rounded-3xl ${empty ? 'placeholder:text-red-500' : ''}`} placeholder={empty ? 'Cannot be empty!' : "Type the name of book or author..."} type="text" />
          <img onClick={handleClick} className="absolute right-0 top-1/2 -translate-y-1/2 p-4" src="./img/search.svg" alt="Search" />
          <span className="block absolute bg-yellow h-10 rounded-3xl w-full top-5 left-1 -z-10"></span>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          
          <Link to='search' className="md:px-6 hover:bg-orange duration-300 bg-yellow border-solid py-4 mt-6 rounded-lg border-black border-2 flex items-center justify-center gap-2">Explore<img src="./img/binoculars.svg"/></Link>
          <hr className="md:w-full border-dashed border-2 border-grayPrimary"/>
        </div>
      </div>
      <div className="md:block hidden relative">
        <img src="./img/libraryimg.jpg" alt="" />
        <span className="block absolute p-4 -top-1"></span>
      </div>
    </section>
  )
}

export default Hero