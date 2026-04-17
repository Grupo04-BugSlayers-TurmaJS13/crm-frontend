import {  UserIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import imgLogoLine from "../../assets/img/conecta-inline.png"


function Navbar() {

  
    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-(--color-primary-dark) shadow-md text-white border-b ">
                <div className="w-full px-6 h-16 flex items-center justify-between">

                    <div className="container flex justify-between mx-6">

                        <Link to="/home" >
                            <img 
                            src={imgLogoLine}
                            alt="Logo Conecta CRM" 
                            className="h-7"  
                            />
                        </Link>

                        <div className='flex gap-4 text-sm font-light items-center'>
                            <Link to='/listarclientes' className=' hover:text-(--color-blue-light) '>CLIENTES</Link>
                            <Link to='/listaroportunidades' className='hover:text-(--color-blue-light)'>OPORTUNIDADES</Link>
                            <Link to="/perfil">
                            <button
                                aria-label="Perfil do usuário"
                                className="text-white hover:text-(--color-blue-light) transition-colors ml-2"
                            >
                                <UserIcon size={26} />
                            </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Navbar
