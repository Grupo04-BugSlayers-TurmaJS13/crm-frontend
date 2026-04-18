/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";


import { useContext, useEffect, useState } from "react";
import type Oportunidade from "../../../models/Oportunidade";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar } from "../../../services/service";
import { SyncLoader } from "react-spinners";
import CardOportunidade from "../cardoportunidade/CardOportunidade";
import FormOportunidade from "../formoportunidade/FormOportunidade";

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
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}
      <section className=" min-h-[80vh]  w-full bg-background my-8 pt-5">
        <div className="flex justify-center ">
          <h1 className="font-heading text-2xl text-center">
            {" "}
            PLATAFORMA DE CRM QUE SIMPLIFICA E AGILIZA <br /> AS VENDAS DO SEU
            NEGÓCIO!
          </h1>
        </div>
        <article className=" flex p-4 w-screen justify-center">
          <div className="grid lg:grid-cols-3 gap-x-20 md:grid-cols-2 sm:grid-cols-1 ">
            {oportunidades.map((oportunidade) => (
              <CardOportunidade
                key={oportunidade.id}
                oportunidade={oportunidade}
              />
            ))}
          </div>
        </article>
      </section>
      <FormOportunidade />
    </>
  );
}

export default ListarOportunidade;
