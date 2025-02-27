import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Campaigns from './Pages/Campaigns'
import Order from './Pages/Order'
import Profile from './Pages/Profile'
import Auth from './Pages/LoginSignUp'
import CreateCampaign from './Pages/CreateCampaign'
import ProductDetails from './Pages/ProductDetails'
import CampaignDetails from './Pages/CampaignDetails'
import { SearchProvider } from './Context/SearchContext.jsx'
import CampaignModalities from './Pages/CampaigModalities.jsx'
import SelectProducts from './Pages/SelectProducts.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar/>

      <SearchProvider>
      <Routes>

        <Route path='/' element={<Home/>} />
        
       
        <Route path='/products' element={<Products/>} />
        
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path= '/campaigns' element={<Campaigns/>}/>
        <Route path='/campaign/:id' element={<CampaignDetails/>}/>
        <Route path='/campaign/:id/modalities' element={<CampaignModalities/>}/>
        <Route path='/order' element={<Order/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/createCampaign' element={<CreateCampaign/>}/>
        <Route path='/createCampaign/selectProduct' element={<SelectProducts/>}/>
        
        
        
      </Routes>

      </SearchProvider>
      </BrowserRouter>
    </>
  )
}

export default App
