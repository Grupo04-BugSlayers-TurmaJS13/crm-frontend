import { Link } from "react-router-dom";
import type Oportunidade from "../../../models/Oportunidade";
import { StatusControle } from "../../../utils/StatusControle";
import { MdOutlineMail, MdPhone } from "react-icons/md";

interface cardOportunidadeProps {
  oportunidade: Oportunidade;
}

function CardOportunidade({ oportunidade }: cardOportunidadeProps) {
  const statusStyle = {
    [StatusControle.ABERTO]: "bg-blue",
    [StatusControle.FECHADO]: "bg-green-500",
    [StatusControle.PERDIDO]: "bg-red-500",
  } as const;

  const statusLabel = {
    [StatusControle.ABERTO]: "Aberto",
    [StatusControle.FECHADO]: "Fechado",
    [StatusControle.PERDIDO]: "Perdido",
  } as const;

  return (
    <article className="my-6 w-full h-full bg-purple/18 backdrop-blur-md px-10 flex flex-col justify-between
            border border-purple/30 rounded-2xl p-4 gap-4 
                    shadow-lg hover:shadow-purple-500/20 
                    transition-all duration-300 hover:scale-[1.02]">
      <header className="space-y-2">
        <div className="leading-tight">
          <h2 className="font-heading py-4 text-center text-2xl font-semibold text-blue-light uppercase tracking-wide">
            {oportunidade.servico}
          </h2>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />
          
          <p className="font-sans text-[18px] font-normal text-gray-300 pt-3 pb-1">Contrato CRM</p>
        </div>

        <p
          className={`inline-flex rounded-full px-5 py-1.5 font-sans text-[12px] font-semibold uppercase text-white ${statusStyle[oportunidade.status]}`}
        >
          {statusLabel[oportunidade.status]}
        </p>
        <p className="font-sans text-[18px] font-normal text-gray-400 pb-3 pt-1"> Valor: R$ {oportunidade.preco.toFixed(2)}</p>
      </header>

      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />

      <section className="mt-4 space-y-4">
        <div className="leading-tight">
          <h3 className="font-heading text-lg font-bold uppercase text-blue-light py-2 text-center">
            Cliente
          </h3>
          {oportunidade.cliente ? (
            <>
              <p className="font-sans text-[20px] font-semibold text-gray-300 py-2">
                {oportunidade.cliente.nome}
              </p>
              <address className="not-italic font-sans text-md font-normal text-gray-400 py-2">
                <p className="flex gap-2 items-center pb-1.5"><MdOutlineMail size={20} />{oportunidade.cliente.email}</p>
                <p className="flex gap-2 items-center"><MdPhone size={20} /> {oportunidade.cliente.telefone} </p>
              </address>
            </>
          ) : ( 
            <p className="font-sans text-[20px] font-semibold">Em Aberto</p>
          )}
        </div>

        <div className="leading-tight">
          <h3 className="font-heading text-m font-bold uppercase text-blue-light py-2 text-center">
            Usuario
          </h3>
         <div className="flex items-center gap-4">
          <img src={oportunidade.usuario?.foto} alt={oportunidade.usuario?.nome} className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"/>
          <div className="flex flex-col">
            <p className="font-sans text-[20px] font-semibold text-gray-300 py-1">
            {oportunidade.usuario?.nome}
          </p>
          <p className="font-sans text-md text-gray-400">{oportunidade.usuario?.usuario}</p>
          </div>
         </div>
        </div>
      </section>

      <footer className="py-6 flex justify-center">
        <button
          type="button"
          className="min-w-37.5 rounded-lg bg-purple px-6 py-2 font-sans text-[14px] font-bold uppercase text-white transition-colors hover:bg-purple-hover"
        >
          Ver relatorio
        </button>
      </footer>

      <div className="flex gap-4">
                <Link to={`/atualizaroportunidade/${oportunidade.id}`} 
                    className='w-full rounded-lg 
                  bg-purple-400 hover:bg-purple flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletaroportunidade/${oportunidade.id}`} 
                    className='w-full py-2 rounded-lg
                    bg-gray-700 transition text-white font-medium
                    flex items-center justify-center hover:bg-red-700'>
                    <button>Deletar</button>
                </Link>
            </div>
    </article>
  );
}

export default CardOportunidade;
