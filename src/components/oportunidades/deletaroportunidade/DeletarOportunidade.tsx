/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import type Oportunidade from "../../../models/Oportunidade"
import { buscar, deletar } from "../../../services/service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { ClipLoader } from "react-spinners"
import { PageShell } from "../../about/AboutShared"



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
            } else {
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
            <PageShell>
                <section className='min-h-screen flex items-center justify-center p-4'>
                    <div className='w-full max-w-md'>

                        <h1 className='text-3xl text-center text-blue-light font-heading p-4'>Deletar Oportunidade</h1>

                        <p className='text-center text-blue-light font-medium mb-10'>
                            Você tem certeza de que deseja apagar a oportunidade a seguir?
                        </p>

                        <div className='flex flex-col rounded-2xl overflow-hidden
                    bg-purple/18 backdrop-blur-md
                    border border-purple/30 p-6 gap-4'>
                            <h2 className='text-xl text-center text-blue-light font-semibold'>
                                Oportunidade
                            </h2>

                            <div className="h-0.5 bg-gradient-to-r from-transparent via-blue/20 to-transparent my-2" />

                            <div className="text-gray-400 space-y-1">
                                <p className='text-lg font-semibold gap-4 text-gray-300'>{oportunidade.servico}</p>
                                <p className='text-sm flex text-center gap-2 items-center'>R$ {oportunidade.preco?.toFixed(2)}</p>

                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={retornar}
                                    className="w-full py-2 rounded-lg 
                                    bg-purple-400 hover:bg-purple flex items-center 
                                    justify-center text-text transition"
                                >
                                    Não
                                </button>
                                <button
                                    className='w-full py-2 rounded-lg
                                bg-gray-700 transition text-white font-medium
                                flex items-center justify-center hover:bg-red-700'
                                    onClick={deletarOportunidade}
                                >
                                    {isLoading ?
                                        <ClipLoader
                                            color="#ffffff"
                                            size={24}
                                        /> :
                                        "Sim"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </PageShell>
        </>
    )
}

export default DeletarOportunidade