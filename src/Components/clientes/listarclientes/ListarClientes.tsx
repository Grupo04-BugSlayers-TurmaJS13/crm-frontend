/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";

import CardCliente from "../cardcliente/CardCliente";
import { useContext, useEffect, useState } from "react";
import type Cliente from "../../../models/Cliente";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar } from "../../../services/service";
import { SyncLoader } from "react-spinners";
import { FaCirclePlus } from "react-icons/fa6";
import { PageShell } from "../../about/AboutShared";
import { BsPeopleFill } from "react-icons/bs";


function ListarClientes() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);

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
  }, [clientes.length]);

  async function buscarClientes() {
    try {
      setIsLoading(true);

      await buscar("/clientes", setClientes, {
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
        <section className="min-h-screen min-w-full pt-35 py-10">
          <div className="flex justify-center px-30">
            <span className="font-heading text-2xl text-center text-blue-light pb-10">
              {" "} No <span className="text-purple-500">Conecta CRM</span>, você <span className="text-purple-500">centraliza</span> suas informações,
              acompanha cada <span className="text-purple-500">interação </span>
              e constrói <span className="text-purple-500">relacionamentos</span> mais <span className="text-purple-500">estratégicos </span>
              com seus clientes — tudo em um só lugar.
            </span>
          </div>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-blue/20 to-transparent my-2" />

          <div className="flex flex-col sm:flex-row justify-between w-[90vw] sm:w-[80vw] lg:w-[75vw] m-auto my-8 items-center gap-4">
            <h1 className="font-heading text-4xl text-center text-blue-light flex items-center gap-4">
              {" "}
              <BsPeopleFill /> Clientes
            </h1>

            <button onClick={() => navigate("/cadastrarcliente")}
              className="bg-purple-500 rounded-lg text-white px-6 py-3 font-bold text-md hover:bg-purple transition-all flex items-center gap-2">
              <FaCirclePlus size={20} />Cadastrar
            </button>
          </div>

          {isLoading && (
            <div className="flex justify-center w-full py-40 bg-primary-dark">
              <SyncLoader color="#312e81" size={20} />
            </div>
          )}

          <article className=" flex p-4 w-screen justify-center">
            <div className="grid lg:grid-cols-3 gap-x-20 md:grid-cols-2 sm:grid-cols-1 ">
              {clientes.map((cliente) => (
                <CardCliente
                  key={cliente.id}
                  cliente={cliente}
                />
              ))}
            </div>

          </article>
          {/* <div className="flex justify-center my-8 ">
          <button onClick={() => navigate("/cadastrarcliente")}
            className="bg-purple-500 rounded-lg text-white px-6 py-3 font-bold text-2xl hover:bg-purple transition-all">
            Cadastrar Cliente
          </button>
        </div> */}
        </section>
      </PageShell>
    </>
  );
}

export default ListarClientes;
