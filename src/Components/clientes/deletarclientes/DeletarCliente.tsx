/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom"

import { useContext, useEffect, useState } from "react"
import type Cliente from "../../../models/Cliente"
import { buscar, deletar } from "../../../services/service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import { MdOutlineMail, MdPhone } from "react-icons/md"
import { PageShell } from "../../about/AboutShared"

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
            } else {
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
            <PageShell>
                <section className="min-h-screen flex items-center justify-center p-4">

                    <div className="w-full max-w-md">

                        <h1 className="text-3xl text-center text-blue-light font-heading p-4">
                            Deletar Cliente
                        </h1>

                        <p className="text-center text-blue-light font-medium mb-10 ">
                            Você tem certeza de que deseja apagar este cliente?
                        </p>

                        <div className="flex flex-col rounded-2xl overflow-hidden
                    bg-purple/18 backdrop-blur-md
                    border border-purple/30 p-6 gap-4">

                            <h2 className="text-xl text-center text-blue-light font-semibold">
                                Cliente
                            </h2>

                            <div className="h-0.5 bg-gradient-to-r from-transparent via-blue/20 to-transparent my-2" />

                            <div className="text-gray-400 space-y-1">
                                <p className="text-lg font-semibold text-gray-300 gap-4"> {cliente.nome}</p>
                                <p className="text-sm flex text-center gap-2 items-center"> <MdOutlineMail size={20} /> {cliente.email}</p>
                                <p className="text-sm flex text-center gap-2 items-center"> <MdPhone size={20} /> {cliente.telefone}</p>

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
                                        onClick={deletarCliente}
                                        className="w-full py-2 rounded-lg
                                bg-gray-700 transition text-white font-medium
                                flex items-center justify-center hover:bg-red-700"
                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#ffffff" size={20} />
                                        ) : (
                                            "Deletar"
                                        )}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </PageShell>
        </>
    )
}

export default DeletarCliente