import { useNavigate, useParams } from "react-router-dom"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import type Oportunidade from "../../../models/Oportunidade"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { ClipLoader } from "react-spinners"


function DeletarOportunidade() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [oportunidade, setOportunidade] = useState<Oportunidade>({} as Oportunidade)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/oportunidades/${id}`, setOportunidade, {
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

    async function deletarOportunidade() {
        setIsLoading(true)

        try {
            await deletar(`/oportunidades/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Oportunidade apagada com sucesso', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar a oportunidade.', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/listaroportunidades")
    }
  return (
    <>
       <div className='container w-1/3 mx-auto '>
            <h1 className='text-4xl text-center my-4'>Deletar Oportunidade</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a oportunidade a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-purple text-white font-bold text-2xl'>
                    Oportunidade
                </header>
                <div className="p-4">
                    <p className='text-xl h-full'>{oportunidade.servico}</p>
                    
                </div>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-blue-400 
                        hover:bg-blue-600 flex items-center justify-center'
                        onClick={deletarOportunidade}
                        >
                          Sim
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
    </>
  )
}

export default DeletarOportunidade