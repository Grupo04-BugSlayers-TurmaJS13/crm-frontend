/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react"
import { Link, useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario"
import { motion } from "framer-motion"
import { ClipLoader } from "react-spinners"
import { FaCheck, FaExclamationTriangle } from "react-icons/fa"
import logo from "../../assets/logo-crm.png"
import { MdOutlineAppRegistration, MdOutlineSecurity } from "react-icons/md"
import { TbClick } from "react-icons/tb";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { FacebookLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { cadastrarUsuario } from "../../services/service"

function Cadastro() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
    })

    const emailValido =
        usuario.usuario?.includes("@") && usuario.usuario?.includes(".");
    const senhasIguais = usuario.senha === confirmarSenha;

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    async function cadastrarNovoUSuario(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
            try {
                await cadastrarUsuario("/usuarios", usuario, setUsuario)

                ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
            } catch (error) {
                ToastAlerta("Erro ao cadastrar usuário!", "erro")
            }
        } else {
            ToastAlerta("Dados inválidos!", "info")
            setUsuario({
                ...usuario,
                senha: ""
            })
            setConfirmarSenha("");
        }
        setIsLoading(false);
    }

    function retornar() {
        navigate("/");
    }

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario]);

    return (
        <>
            <section className="min-h-screen mt-10 flex items-center justify-center bg-gray-light font-sans px-6 py-25 md:px-0">
                <article className="w-full max-w-255 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(121,84,237,0.5)] grid grid-cols-1 md:grid-cols-5">
                    <div className="bg-primary-dark text-white p-6 md:p-10 flex flex-col justify-between md:col-span-2">
                        <div className="flex flex-col">
                            <img
                                src={logo}
                                alt="logo-site"
                                className="w-40 md:w-55 h-auto items-center justify-center my-6 mx-auto drop-shadow-md drop-shadow-purple"
                            />
                            <h1 className="text-2xl md:text-3xl font-heading font-semibold leading-snug">
                                Crie sua conta e comece a{" "}
                                <span className="text-[var(--color-purple)]">evoluir</span>
                            </h1>

                            <p className="mt-4 text-sm text-gray-300">
                                Cadastre-se e tenha acesso completo ao CRM.
                            </p>
                        </div>

                        <div className="space-y-4 text-sm text-gray-300 pb-10 md:pb-42 md:mt-10">
                            <p className="flex gap-2 items-center">
                                <MdOutlineAppRegistration size={35} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm" />
                                Cadastro rápido
                            </p>
                            <p className="flex gap-2 items-center">
                                <TbClick size={35} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm" />
                                Acesso imediato
                            </p>
                            <p className="flex gap-2 items-center">
                                <MdOutlineSecurity size={35} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm" />
                                Seguro
                            </p>
                        </div>

                        <span className="text-gray-400 text-md text-center">
                            Nos siga nas redes sociais
                        </span>
                        <div className="space-y-2 text-sm text-gray-300 md:pb-4 flex justify-evenly">
                            <Link to="https://www.instagram.com" target="_blank" className="">
                                <InstagramLogoIcon size={40} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm hover:shadow-sm shadow-purple-400" />
                                {/* Instagram */}
                            </Link>
                            <Link to="https://www.facebook.com" target="_blank" className="">
                                <FacebookLogoIcon size={40} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm hover:shadow-sm shadow-purple-400" />
                                {/* Facebook */}
                            </Link>
                            <Link to="https://www.linkedin.com" target="_blank" className="">
                                <LinkedinLogoIcon size={40} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm hover:shadow-sm shadow-purple-400" />
                                {/* LinkedIn */}
                            </Link>

                        </div>
                    </div>

                    <div className="bg-white p-6 md:p-10 flex flex-col justify-center md:col-span-3">
                        <h2 className="text-2xl font-heading font-semibold text-text">
                            Criar conta
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Preencha os dados para começar
                        </p>

                        <motion.form
                            onSubmit={cadastrarNovoUSuario}
                            className="space-y-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div>
                                <label className="text-xs text-gray-500">Nome</label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={usuario.nome}
                                    onChange={atualizarEstado}
                                    placeholder="Seu nome"
                                    className="w-full mt-1 p-3 rounded-lg bg-[var(--color-gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)]"
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

                            <div>
                                <label className="text-xs text-gray-500">E-mail</label>
                                <input
                                    type="email"
                                    name="usuario"
                                    value={usuario.usuario}
                                    onChange={atualizarEstado}
                                    placeholder="seu@email.com"
                                    className="w-full mt-1 p-3 rounded-lg bg-[var(--color-gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)]"
                                />

                                {usuario.usuario?.length > 0 && !emailValido && (
                                    <span className="text-red-400 text-xs flex items-center p-2 gap-2">
                                        <FaExclamationTriangle size={16} /> E-mail inválido
                                    </span>
                                )}

                                {emailValido && (
                                    <span className="text-green-400 flex items-center p-2 gap-2">
                                        <FaCheck size={16} />
                                    </span>
                                )}
                            </div>

                            <div>
                                <label className="text-xs text-gray-500">Senha</label>
                                <input
                                    type="password"
                                    name="senha"
                                    value={usuario.senha}
                                    onChange={atualizarEstado}
                                    placeholder="••••••"
                                    className="w-full mt-1 p-3 rounded-lg bg-[var(--color-gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)]"
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

                            <div>
                                <label className="text-xs text-gray-500">Confirmar Senha</label>
                                <input
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={handleConfirmarSenha}
                                    placeholder="••••••"
                                    className="w-full mt-1 p-3 rounded-lg bg-[var(--color-gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)]"
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

                            <div>
                                <label className="text-xs text-gray-500">Foto (URL)</label>
                                <input
                                    type="text"
                                    name="foto"
                                    value={usuario.foto}
                                    onChange={atualizarEstado}
                                    placeholder="https://..."
                                    className="w-full mt-1 p-3 rounded-lg bg-[var(--color-gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)]"
                                />
                            </div>

                            {usuario.foto && usuario.foto.trim().length > 0 && (
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 rounded-full border-2 border-[var(--color-purple)] overflow-hidden">
                                        <img
                                            src={usuario.foto}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.currentTarget.style.display = "none")}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 justify-center items-center m-auto">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 rounded-lg bg-[var(--color-purple)] text-white font-semibold hover:bg-[var(--color-purple-hover)] transition"
                                >
                                    {isLoading ? (
                                        <ClipLoader color="#fff" size={20} />
                                    ) : (
                                        "Cadastrar"
                                    )}
                                </motion.button>

                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={retornar}
                                    className="w-full py-3 rounded-lg bg-gray-700 hover:bg-red-500 transition text-white font-semibold"
                                >
                                    Cancelar
                                </motion.button>
                            </div>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                Já tem uma conta?{" "}
                                <Link to="/login" className="text-[var(--color-purple)]">
                                    Entrar
                                </Link>
                            </p>
                        </motion.form>
                    </div>
                </article>
            </section>
        </>
    );
}

export default Cadastro;
