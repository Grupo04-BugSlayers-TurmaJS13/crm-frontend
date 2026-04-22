/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";


import { useContext, useEffect, useState } from "react";
import type Oportunidade from "../../../models/Oportunidade";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar } from "../../../services/service";
import { SyncLoader } from "react-spinners";
import CardOportunidade from "../cardoportunidade/CardOportunidade";
import { FaCirclePlus, FaTrophy } from "react-icons/fa6";
import { PageShell } from "../../about/AboutShared";

function ListarOportunidade() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarOportunidades();
  }, [oportunidades.length]);

  async function buscarOportunidades() {
    try {
      setIsLoading(true);

      await buscar("/oportunidades", setOportunidades, {
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
        <div className="container flex flex-col py-20 items-center min-h-screen min-w-[70vw] m-auto">
        <section className="min-h-screen min-w-screen pt-25 py-10 ">
          <div className="flex justify-center">
            <span className="font-heading text-2xl text-center text-blue-light pb-10">
              {" "}
              A Plataforma de <span className="text-purple-500">CRM</span> que <span className="text-purple-500">Simplifica</span> e <span className="text-purple-500">Agiliza</span> <br /> as vendas do seu {" "}
              <span className="text-purple-500">Negócio</span>!
            </span>

          </div>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-blue/20 to-transparent my-2" />

          <div className="flex flex-col sm:flex-row justify-between w-[90vw] sm:w-[80vw] lg:w-[75vw] m-auto my-8 items-center gap-4">
            <h1 className="font-heading text-4xl text-center text-blue-light flex items-center gap-4">
              <FaTrophy /> Oportunidades
            </h1>

            <button onClick={() => navigate("/cadastraroportunidade")}
              className="bg-purple-500 rounded-lg text-white px-6 py-3 font-bold text-md hover:bg-purple transition-all flex items-center gap-2">
              <FaCirclePlus size={20} />Cadastrar
            </button>
          </div>
          {isLoading && (
            <div className="flex justify-center w-full my-8 bg-primary-dark py-40">
              <SyncLoader color="#312e81" size={20} />
            </div>
          )}
          <article className="flex p-4 w-screen justify-center">
            <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1 ">
              {oportunidades.map((oportunidade) => (
                <CardOportunidade
                  key={oportunidade.id}
                  oportunidade={oportunidade}
                />
              ))}
            </div>
          </article>
        </section>
        </div>
      </PageShell>
    </>
  );
}

export default ListarOportunidade;
