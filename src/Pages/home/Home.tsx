import { Link } from 'react-router-dom'
import logo from '../../assets/logo-crm.webp'


function Home() {
  return (
    <>
        
        <section className='bg-primary-dark min-h-screen flex flex-col items-center justify-center text-center gap-2'>
            
            
           
                <img src={logo} alt="logo-crm" className='w-[350px] transition-transform duration-500 hover:rotate-0 hover:scale-110'/>
                
                <h1 className='text-white font-semibold max-w-md leading-tight -mt-18'> CONECTE PESSOAS, 
                DADOS E OPORTUNIDADES COM UM CRM FEITO PARA CRESCER COM VOCÊ</h1>
                
                <Link to="/sobre" className='mt-10 border border-white text-white px-10 py-2 
                                    rounded-md hover:bg-white
                                     hover:text-black transition-all 
                                     transition-transform duration-500 hover:rotate-0 
                                     hover:scale-110'>SAIBA MAIS</Link>
            
        </section>
    </>
  )
}

export default Home

