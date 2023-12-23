import Layout from "./components/Layout"
import Home from "./pages/Home/Home"
import Search from "./pages/Search/Search"
import Product from "./pages/Product/Product"
import {Routes,Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/product/:book" element={<Product/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
