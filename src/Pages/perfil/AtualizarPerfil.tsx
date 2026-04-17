/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import type Usuario from "../../models/Usuario"
import { atualizar, buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"
import profileimg from "../../assets/profileimg.jpg"
import { FaCheck, FaPencil } from "react-icons/fa6"
import { FaExclamationTriangle } from "react-icons/fa"
import { motion } from "framer-motion"
import { ClipLoader } from "react-spinners"

function AtualizarPerfil() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [user, setUser] = useState<Usuario>({} as Usuario)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const id: string = usuario.id.toString()

    const senhasIguais = usuario.senha === confirmarSenha

    async function buscarUsuarioPorId() {
        try {
            await buscar(`/usuarios/${id}`, setUser, {
                headers: {
                    Authorization: token,
                },
            })

            setUser((user) => ({ ...user, senha: "" }))
            setConfirmarSenha("")

        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            } else {
                ToastAlerta("Usuário não encontrado!", "erro")
                retornar()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "erro")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        setUser({} as Usuario)
        setConfirmarSenha("")
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            buscarUsuarioPorId()
        }
    }, [id])

    function retornar() {
        navigate("/perfil")
    }

    function sucesso() {
        handleLogout()
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            try {
                await atualizar(`/usuarios/${id}`, user, setUser, {
                    headers: {
                        Authorization: token,
                    },
                })
                ToastAlerta("Usuário atualizado! Efetue o Login Novamente!", "sucesso")
                sucesso()
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar o usuário!", "erro")
                    retornar()
                }
            }
        } else {
            ToastAlerta("Dados inconsistentes. Verifique as informações do usuário.", "erro")
            setUser({ ...user, senha: "" })
            setConfirmarSenha("")
        }

        setIsLoading(false)
    }

    console.log("USUARIO AUTH:", usuario);
console.log("TOKEN:", usuario.token);

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#12122a] to-[#0f0f1a] text-white flex items-center justify-center p-4">

                <form
                    onSubmit={atualizarUsuario}
                    className="w-full max-w-2xl bg-[#16162a]/80 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10"
                >

                    <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Editar Perfil
                    </h1>

                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <img
                                src={ user.foto || profileimg }
                                className="w-28 h-28 rounded-full object-cover border-4 border-purple-600 shadow-lg"
                            />
                            <div className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-xs">
                                <FaPencil size={12} color="#fff" />
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 mt-2">
                            Atualize sua foto
                        </span>
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm text-gray-300 mb-2">
                            Foto (URL)
                        </label>
                        <input
                            type="text"
                            name="foto"
                            value={user.foto}
                            onChange={atualizarEstado}
                            className="w-full p-3 rounded-xl bg-[#0f0f1a] border border-gray-800 text-white
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm text-gray-300 mb-2">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="nome"
                            value={user.nome}
                            onChange={atualizarEstado}
                            className="w-full p-3 rounded-xl bg-[#0f0f1a] border border-gray-800 text-white
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                        />

                        {usuario.nome.length > 0 && usuario.nome?.length < 3 && (
                            <span className="text-red-400 text-xs flex items-center p-2 gap-2">
                                <FaExclamationTriangle size={16} />
                                O nome deve ter no mínimo 3 caracteres
                            </span>
                        )}

                        {usuario.nome?.length >= 5 && (
                            <span className="text-green-400 flex items-center p-2 gap-2">
                                <FaCheck size={16} />
                            </span>
                        )}
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            name="usuario"
                            value={user.usuario}
                            disabled
                            className="w-full p-3 rounded-xl bg-[#0f0f1a] border border-gray-800 text-white
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm text-gray-300 mb-2">
                            Nova Senha
                        </label>
                        <input
                            type="password"
                            name="senha"
                            value={user.senha}
                            onChange={atualizarEstado}
                            className="w-full p-3 rounded-xl bg-[#0f0f1a] border border-gray-800 text-white
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                        />
                        {usuario.senha?.length > 0 && usuario.senha?.length < 8 && (
                            <span className="text-red-400 text-xs flex items-center p-2 gap-2">
                                <FaExclamationTriangle size={16} />A senha deve conter no
                                mínimo 8 caracteres ({usuario.senha.length}/8)
                            </span>
                        )}

                        {usuario.senha?.length >= 8 && (
                            <span className="text-green-400 flex items-center p-2 gap-2">
                                <FaCheck size={16} />
                            </span>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm text-gray-300 mb-2">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={handleConfirmarSenha}
                            className="w-full p-3 rounded-xl bg-[#0f0f1a] border border-gray-800 text-white
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                        />

                        {confirmarSenha.length > 0 && !senhasIguais && (
                            <span className="text-red-400 text-xs flex items-center p-2 gap-2">
                                <FaExclamationTriangle size={16} />
                                As senhas não são iguais
                            </span>
                        )}

                        {confirmarSenha.length > 0 && senhasIguais && (
                            <span className="text-green-400 flex items-center p-2 gap-2">
                                <FaCheck size={16} />
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-6">

                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={retornar}
                            className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white font-semibold"
                        >
                            Cancelar
                        </motion.button>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 rounded-lg bg-[var(--color-purple)] text-white font-semibold hover:bg-[var(--color-purple-hover)] transition"
                        >
                            {isLoading ? (
                                <ClipLoader color="#fff" size={20} />
                            ) : (
                                "Atualizar"
                            )}
                        </motion.button>

                    </div>

                </form>
            </section>
        </>
    );
}

export default AtualizarPerfil