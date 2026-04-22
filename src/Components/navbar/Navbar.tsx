import {  UserIcon } from "@phosphor-icons/react"
import { Link, useNavigate } from "react-router-dom"
import imgLogoLine from "../../assets/img/conecta-inline.png"
import { FaSignOutAlt } from "react-icons/fa"
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { GoHome } from "react-icons/go";
import { HiMenu, HiX } from "react-icons/hi";


function Navbar() {
    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)
    const [menuAberto, setMenuAberto] = useState(false)

    function logout() {
        handleLogout()
        ToastAlerta("O usuário foi deslogado com sucesso!", "sucesso")
        navigate("/")
    }

    function fecharMenu() {
        setMenuAberto(false)
    }

    const links = [
        { to: "/home", label: "HOME", icon: <GoHome size={18} /> },
        { to: "/listarclientes", label: "CLIENTES" },
        { to: "/listaroportunidades", label: "OPORTUNIDADES" },
        { to: "/listarusuarios", label: "USUÁRIOS" },
        { to: "/sobrenos", label: "SOBRE NÓS" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-(--color-primary-dark) shadow-md text-white border-b">
            <div className="w-full px-6 h-16 flex items-center justify-between">

                <Link to="/home">
                    <img
                        src={imgLogoLine}
                        alt="Logo Conecta CRM"
                        className="h-7"
                    />
                </Link>

                {/* ── MENU TELA NORMAL ── */}
                <div className="hidden md:flex gap-4 text-sm font-light items-center">
                    {links.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className="hover:text-(--color-blue-light) transition-colors flex items-center gap-1"
                        >
                            {icon && icon}
                            {label}
                        </Link>
                    ))}

                    <Link to={`/perfil/${usuario.id}`}>
                        <button
                            aria-label="Perfil do usuário"
                            className="text-white hover:text-(--color-blue-light) transition-colors ml-2 cursor-pointer"
                        >
                            <UserIcon size={26} />
                        </button>
                    </Link>

                    <Link
                        to="/login"
                        onClick={logout}
                        className="border p-2 w-20 h-10 rounded-lg justify-center items-center flex text-white hover:bg-blue-light transition-colors"
                    >
                        <FaSignOutAlt size={20} />
                    </Link>
                </div>

                {/* ── BOTÃO HAMBURGUER ── */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label="Abrir menu"
                >
                    {menuAberto ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>
            </div>

            {/* ── MENU MOBILE ── */}
            {menuAberto && (
                <div className="md:hidden bg-(--color-primary-dark) border-t border-white/10 flex flex-col px-6 py-4 gap-4 text-sm font-light">
                    {links.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={fecharMenu}
                            className="hover:text-(--color-blue-light) transition-colors flex items-center gap-2"
                        >
                            {icon && icon}
                            {label}
                        </Link>
                    ))}

                    <Link
                        to={`/perfil/${usuario.id}`}
                        onClick={fecharMenu}
                        className="hover:text-(--color-blue-light) transition-colors flex items-center gap-2"
                    >
                        <UserIcon size={20} />
                        PERFIL
                    </Link>

                    <Link
                        to="/login"
                        onClick={() => { fecharMenu(); logout() }}
                        className="flex items-center gap-2 text-blue-light hover:text-purple-300 transition-colors"
                    >
                        <FaSignOutAlt size={18} />
                        SAIR
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar
