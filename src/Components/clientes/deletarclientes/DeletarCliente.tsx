import { useNavigate, useParams } from "react-router-dom"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import type Cliente from "../../../models/Cliente"
import { buscar, deletar } from "../../../services/service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { ClipLoader } from "react-spinners"


function DeletarCliente() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [cliente, setCliente] = useState<Cliente>({} as Cliente)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/clientes/${id}`, setCliente, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarCliente() {
        setIsLoading(true)

        try {
            await deletar(`/clientes/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Cliente apagada com sucesso', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar a cliente.', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/listarclientes")
    }
  return (
    <>
    <section className=" bg-primary-dark min-h-screen min-w-screen">
       <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center py-4 my-4 text-blue-light'>Deletar Cliente</h1>

            <p className='text-center font-semibold mb-4 text-blue-light'>
                Você tem certeza de que deseja apagar a cliente a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-purple text-white font-bold text-2xl'>
                    Cliente
                </header>
                <div className="p-4 bg-background">
                    <p className='text-xl h-full'>{cliente.nome}</p>
                    
                </div>
                <div className="flex ">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 '
                        onClick={retornar}
                        >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-blue-400 
                        hover:bg-blue-600 flex items-center justify-center'
                        onClick={deletarCliente}
                        >
                          
                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                        
                    </button>
                </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default DeletarCliente