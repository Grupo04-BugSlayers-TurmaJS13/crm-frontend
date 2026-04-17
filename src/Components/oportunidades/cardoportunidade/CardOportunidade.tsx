import { Link } from "react-router-dom";
import type Oportunidade from "../../../models/Oportunidade";
import { StatusControle } from "../../../utils/StatusControle";

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
    <article className="my-6 w-full max-w-100 rounded-lg border border-purple bg-card px-6 py-6 text-primary-dark shadow-sm">
      <header className="space-y-2">
        <div className="leading-tight">
          <h2 className="font-heading text-[20px] font-semibold uppercase tracking-[0.02em]">
            {oportunidade.servico}
          </h2>
          
          <p className="font-sans text-[18px] font-normal">Contrato CRM</p>
        </div>

        <p
          className={`inline-flex rounded-full px-5 py-1 font-sans text-[12px] font-semibold uppercase text-white ${statusStyle[oportunidade.status]}`}
        >
          {statusLabel[oportunidade.status]}
          
          
        </p>
        <p className="font-sans text-[18px] font-normal"> Valor: R$ {oportunidade.preco.toFixed(2)}</p>
      </header>

      <section className="mt-4 space-y-4">
        <div className="leading-tight">
          <h3 className="font-heading text-m  font-bold uppercase text-[#3C53C7]">
            Cliente
          </h3>
          {oportunidade.cliente ? (
            <>
              <p className="font-sans text-[20px] font-semibold">
                {oportunidade.cliente.nome}
              </p>
              <address className="not-italic font-sans text-[18px] font-normal">
                {oportunidade.cliente.email}
                <br />
                {oportunidade.cliente.telefone}
              </address>
            </>
          ) : (
            <p className="font-sans text-[20px] font-semibold">Em Aberto</p>
          )}
        </div>

        <div className="leading-tight">
          <h3 className="font-heading text-m font-bold uppercase text-[#3C53C7]">
            Usuario
          </h3>
          <p className="font-sans text-[20px] font-semibold">
            {oportunidade.usuario?.nome}
          </p>
        </div>
      </section>

      <footer className="mt-6 flex justify-center">
        <button
          type="button"
          className="min-w-37.5 rounded-md bg-purple px-6 py-2 font-sans text-[14px] font-bold uppercase text-white transition-colors hover:bg-purple-hover"
        >
          Ver relatorio
        </button>
      </footer>

      <div className="flex">
                <Link to={`/atualizaroportunidade/${oportunidade.id}`} 
                    className='w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletaroportunidade/${oportunidade.id}`} 
                    className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
    </article>
  );
}

export default CardOportunidade;
