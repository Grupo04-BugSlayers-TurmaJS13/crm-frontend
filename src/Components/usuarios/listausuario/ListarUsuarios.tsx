/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar } from "../../../services/service";
import type Usuario from "../../../models/Usuario";
import CardUsuarios from "../cardusuario/CardUsuarios";

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
            <section className="min-h-screen bg-[var(--color-primary-dark)] p-6">
                <h1 className="text-3xl text-white font-bold mb-6">
                    Usuários
                </h1>

                {isLoading && (
                    <p className="text-white">Carregando...</p>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {usuarios.map((user) => (
                        <CardUsuarios key={user.id} usuario={user} />
                    ))}
                </div>

                {!isLoading && usuarios.length === 0 && (
                    <p className="text-gray-400 mt-4">
                        Nenhum usuário encontrado.
                    </p>
                )}
            </section>
        </>
    )
}

export default ListarUsuarios