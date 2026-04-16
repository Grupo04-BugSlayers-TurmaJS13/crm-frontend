import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'


function App() {
 
  return (
    <>
    <BrowserRouter>

      <Navbar />
      
      <Footer />

    </BrowserRouter>
    </>
  )
}

export default App
