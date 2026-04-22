import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import profileimg from "../../assets/profileimg.jpg"
import type Oportunidade from "../../models/Oportunidade"
import type Usuario from "../../models/Usuario"
import { ToastAlerta } from "../../utils/ToastAlerta"
import CardOportunidade from "../../components/oportunidades/cardoportunidade/CardOportunidade"
import { buscar } from "../../services/service"
import { AuthContext } from "../../contexts/AuthContext"
import { FaTrophy, FaSadTear } from "react-icons/fa"
import { FaPencil } from "react-icons/fa6"
import { SyncLoader } from "react-spinners"
import { PageShell } from "../../components/about/AboutShared"

function Perfil() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { usuario: usuarioLogado, handleLogout } = useContext(AuthContext)
    const token = usuarioLogado?.token

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [oportunidades, setOportunidades] = useState<Oportunidade[]>([])

    const isOwner = usuarioLogado?.id === usuario?.id

    const minhasOportunidades = oportunidades.filter(
        (post) => post.usuario?.id === usuario?.id
    )

    useEffect(() => {
        if (!token) {
            ToastAlerta("Você precisa estar logado!", "erro")
            navigate("/")
            return
        }

        if (!id) return

        setIsLoading(true)

        Promise.all([
            buscar(`/usuarios/${id}`, (data: unknown) => {
                const usuarioData = Array.isArray(data) ? data[0] : data
                setUsuario(usuarioData ?? null)
            }, {
                headers: { Authorization: token },
            }),
            buscar("/oportunidades", setOportunidades, {
                headers: { Authorization: token },
            })
        ])
            .catch((error: unknown) => {
                const msg = error instanceof Error ? error.message : String(error)
                if (msg.includes("401")) handleLogout()
                else ToastAlerta("Erro ao carregar perfil", "erro")
            })
            .finally(() => setIsLoading(false))

    }, [id, token])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0f0f1a]">
                <SyncLoader color="#7c3aed" size={20} />
            </div>
        )
    }

    if (!usuario)
        return <p className="text-white text-center mt-10">Carregando...</p>

    return (
        <PageShell>
            <section className="min-h-screen text-white font-sans pb-30">
                <div className="h-48 md:h-64 w-full bg-gradient-to-r from-purple-700 via-purple-400 to-blue-500 relative">
                    <div className="absolute left-1/2 md:left-20 transform -translate-x-1/2 md:translate-x-0 bottom-[-60px]">
                        <img
                            src={usuario.foto && usuario.foto.trim() !== "" ? usuario.foto : profileimg}
                            alt={`Foto de ${usuario.nome}`}
                            className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-[#0f0f1a] object-cover shadow-lg"
                        />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 mt-20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">{usuario.nome}</h1>
                            <p className="text-gray-400">{usuario.usuario}</p>
                        </div>

                        {isOwner && (
                            <Link to="/atualizarusuario">
                                <button className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition">
                                    <FaPencil size={18} />
                                    Editar Perfil
                                </button>
                            </Link>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-[#1a1a2e] p-6 rounded-2xl shadow-md">
                            <h2 className="text-lg font-semibold mb-3 text-purple-400">Informações</h2>
                            <p><strong>Nome:</strong> {usuario.nome}</p>
                            <p><strong>Email:</strong> {usuario.usuario}</p>
                        </div>

                        <div className="bg-[#1a1a2e] p-6 rounded-2xl shadow-md">
                            <h2 className="text-lg font-semibold mb-3 text-purple-400">Segurança</h2>
                            <p>Senha protegida 🔒</p>
                            {isOwner && (
                                <Link to="/atualizarusuario" className="mt-3 text-sm text-purple-400 hover:underline block">
                                    Alterar senha
                                </Link>
                            )}
                        </div>

                        <div className="flex flex-col mt-10 md:col-span-2">
                            <h3 className="flex items-center gap-4 text-3xl font-bold text-purple-400 mb-6">
                                <FaTrophy /> Minhas Oportunidades
                            </h3>

                            {minhasOportunidades.length === 0 ? (
                                <p className="text-gray-400 flex items-center gap-2">
                                    Você ainda não tem nenhuma oportunidade <FaSadTear size={20} />
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                                    {minhasOportunidades.map((oportunidade) => (
                                        <CardOportunidade key={oportunidade.id} oportunidade={oportunidade} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    )
}

export default Perfil
