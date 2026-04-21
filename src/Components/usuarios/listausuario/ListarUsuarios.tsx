/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar } from "../../../services/service";
import type Usuario from "../../../models/Usuario";
import CardUsuarios from "../cardusuario/CardUsuarios";
import { BsPeopleFill } from "react-icons/bs";
import { SyncLoader } from "react-spinners";
import { FaSadTear } from "react-icons/fa";
import { PageShell } from "../../about/AboutShared";

function ListarUsuarios() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        buscarClientes();
    }, [usuarios.length]);

    async function buscarClientes() {
        try {
            setIsLoading(true);

            await buscar("/usuarios", setUsuarios, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <PageShell>
            <section className="min-h-screen min-w-full py-35 px-20">
                <div className="flex justify-center px-30">
                    <span className="font-heading text-2xl text-center text-blue-light pb-10">
                        {" "} Cada <span className="text-purple-500">usuário </span> faz parte da sua operação — visualize
                        <span className="text-purple-500"> perfis</span>, acompanhe <span className="text-purple-500">informações 
                        </span> e mantenha tudo <span className="text-purple-500">conectado 
                            </span> no <span className="text-purple-500">Conecta CRM</span>.
                    </span>
                </div>

                <div className="h-0.5 bg-gradient-to-r from-transparent via-blue/20 to-transparent my-2" />

                <h1 className="text-3xl text-blue-light text-center font-bold mb-6 flex gap-4 py-10 items-center justify-center">
                    <BsPeopleFill size={35} /> Usuários
                </h1>

                {isLoading && (
                    <div className="flex justify-center w-full py-40 bg-primary-dark">
                        <SyncLoader color="#312e81" size={20} />
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {usuarios.map((user) => (
                        <CardUsuarios key={user.id} usuario={user} />
                    ))}
                </div>

                {!isLoading && usuarios.length === 0 && (
                    <p className="text-gray-400 mt-4 flex gap-2 items-center">
                        <FaSadTear size={20} />Nenhum usuário encontrado.
                    </p>
                )}
            </section>
            </PageShell>
        </>
    )
}

export default ListarUsuarios