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



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/campaign/:id' element={<CampaignDetails/>}/>
        <Route path='/products' element={<Products/>} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path= '/campaigns' element={<Campaigns/>}/>
        <Route path='/order' element={<Order/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/createCampaign' element={<CreateCampaign/>}/>
        
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
