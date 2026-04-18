/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import profileimg from "../../assets/profileimg.jpg"
import { FaPencil } from "react-icons/fa6"
import type Oportunidade from "../../models/Oportunidade"
import { ToastAlerta } from "../../utils/ToastAlerta"
import CardOportunidade from "../../components/oportunidades/cardoportunidade/CardOportunidade"
import { buscar } from "../../services/service"
import { AuthContext } from "../../contexts/AuthContext"

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    const token = usuario.token

    const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);

    const minhasOportunidades = oportunidades.filter(
        (post) => post.usuario?.id === usuario.id
    )

    async function buscarOportunidades() {
        try {
            await buscar("/oportunidades", setOportunidades, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            ToastAlerta("Erro ao buscar postagens", "erro");
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "erro");
            navigate("/");
        } else {
            buscarOportunidades();
        }
    }, [token]);

    return (
        <>
            <section className="min-h-screen bg-[#0f0f1a] text-white font-sans">

                <div className="h-48 md:h-64 w-full bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 relative">

                    <div className="absolute left-1/2 md:left-20 transform -translate-x-1/2 md:translate-x-0 bottom-[-60px]">
                        <img
                            src={usuario.foto || profileimg}
                            alt="Foto"
                            className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-[#0f0f1a] object-cover shadow-lg"
                        />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 mt-20">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {usuario.nome}
                            </h1>
                            <p className="text-gray-400">{usuario.usuario}</p>
                        </div>

                        <Link to="/atualizarusuario">
                            <button className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition">
                                <FaPencil size={18} />
                                Editar Perfil
                            </button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        <div className="bg-[#1a1a2e] p-6 rounded-2xl shadow-md">
                            <h2 className="text-lg font-semibold mb-3 text-purple-400">
                                Informações
                            </h2>
                            <p className="p-0.75"><strong>Nome:</strong> {usuario.nome}</p>
                            <p className="p-0.75"><strong>Email:</strong> {usuario.usuario}</p>
                        </div>

                        <div className="bg-[#1a1a2e] p-6 rounded-2xl shadow-md">
                            <h2 className="text-lg font-semibold mb-3 text-purple-400">
                                Segurança
                            </h2>
                            <p className="p.075">Senha protegida 🔒</p>
                            <Link to="/atualizarusuario" className="mt-3 text-sm text-purple-400 hover:underline">
                                Alterar senha
                            </Link>

                        </div>
                        <div className="flex flex-col justify-between mt-10 text-center items-center justify-center">

                            <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">
                                Minhas Oportunidades
                            </h3>

                            {minhasOportunidades.length === 0 ? (
                                <p className="text-center items-center justify-center text-gray-400">
                                    Você ainda não tem nenhuma Oportunidade
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
                                    {minhasOportunidades.map((oportunidade) => (
                                        <CardOportunidade key={oportunidade.id} oportunidade={oportunidade} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Perfil