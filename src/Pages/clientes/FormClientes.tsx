import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { buscar, cadastrar, atualizar } from "../../services/Service";
import { User, Envelope, Phone, Globe, ArrowLeft } from "@phosphor-icons/react";
import { ToastAlerta } from "../../utils/ToastAlerta";
import type Cliente from "../../models/Cliente";
import { FaSave } from "react-icons/fa";

function FormCliente() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // caso pensado aqui para caso haja edição futura
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [cliente, setCliente] = useState<Cliente>({
        id: 0,
        nome: '',
        email: '',
        telefone: '',
        sites: ''
    });

    // proteção de rota: Se não tiver token, volta pro login
    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado", "erro");
            navigate("/login");
        }
    }, [token]);

    // lógica para carregar dados se for edição (opcional pessoal, mas robusto, vius?!)
    async function buscarPorId(id: string) {
        try {
            await buscar(`/clientes/${id}`, setCliente, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('401')) { handleLogout(); }
        }
    }

    useEffect(() => {
        if (id !== undefined) { buscarPorId(id); }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    }

    async function salvarCliente(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (id !== undefined) {
                await atualizar(`/clientes`, cliente, setCliente, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Cliente atualizado com sucesso!", "sucesso");
            } else {
                await cadastrar(`/clientes`, cliente, setCliente, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Cliente cadastrado com sucesso!", "sucesso");
            }
            navigate("/clientes");
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta("Erro ao salvar o Cliente.", "erro");
            }
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-primary-dark p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-heading font-bold">
                            {id !== undefined ? 'Editar Cliente' : 'Novo Cliente'}
                        </h2>
                        <p className="text-blue-light text-sm">Preencha os dados da empresa/contato</p>
                    </div>
                    <button onClick={() => navigate("/clientes")} className="hover:bg-white/10 p-2 rounded-full transition-all">
                        <ArrowLeft size={24} />
                    </button>
                </div>
                <form onSubmit={salvarCliente} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome" className="font-semibold text-sm text-gray-700">Nome do Cliente / Empresa</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="nome"
                                    value={cliente.nome}
                                    onChange={atualizarEstado}
                                    placeholder="Ex: L'Oréal Brasil"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-semibold text-sm text-gray-700">E-mail de Contato</label>
                                <div className="relative">
                                    <Envelope className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={cliente.email}
                                        onChange={atualizarEstado}
                                        placeholder="contato@empresa.com" {/*galera, aqui e um exemplo de email ok?*/}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="telefone" className="font-semibold text-sm text-gray-700">Telefone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="telefone"
                                        value={cliente.telefone}
                                        onChange={atualizarEstado}
                                        placeholder="(21) 99999-9999"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="sites" className="font-semibold text-sm text-gray-700">Website ou LinkedIn</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="sites"
                                    value={cliente.sites}
                                    onChange={atualizarEstado}
                                    placeholder="https://www.site.com.br"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple hover:bg-purple-hover text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-purple/20"
                    >
                        <FaSave size={22} height="bold" />
                        {id !== undefined ? 'Confirmar Edição' : 'Finalizar Cadastro'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormCliente;