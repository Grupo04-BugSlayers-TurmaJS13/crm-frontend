import { BrowserRouter } from 'react-router-dom'
import './App.css'

import Home from './Pages/home/Home'
import Navbar from './Components/navbar/Navbar'
import Footer from './Components/footer/Footer'


function App() {
 
  return (
    <>
    <BrowserRouter>

      <Navbar />
      <Home />
      <Footer />

    </BrowserRouter>
    </>
  )
}

export default App
