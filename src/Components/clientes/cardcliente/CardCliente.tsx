
import { Buildings } from "@phosphor-icons/react";
import type Cliente from "../../../models/Cliente";
import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
import { MdOutlineMail, MdPhone } from "react-icons/md";

interface cardClienteProps {
  cliente: Cliente;
}

function CardCliente({ cliente }: cardClienteProps) {
  return (
    <div key={cliente.id} className=" bg-purple/18 backdrop-blur-md
            border border-purple/30 rounded-2xl p-4
                    shadow-lg hover:shadow-purple-500/20 
                    transition-all duration-300 hover:scale-[1.02] mt-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-light/20 p-3 rounded-full text-blue">
          <Buildings size={32} />
        </div>
        <h2 className="font-heading font-bold text-lg truncate text-gray-300">{cliente.nome}</h2>
      </div>
      <p className="text-md text-gray-400 flex gap-2 items-center pt-4 pb-2"><MdOutlineMail size={20} /> {cliente.email}</p>
      <p className="text-md text-gray-400 flex gap-2 items-center pb-2"><MdPhone size={20} /> {cliente.telefone}</p>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />
      <a href={cliente.sites} target="_blank" rel="noreferrer" className="flex py-2 gap-2 text-purple font-semibold text-xs uppercase tracking-wider hover:underline">
        <FaGlobe size={16} /> Ver Website
      </a>
      <div className="flex gap-4 mt-2">
        <Link to={`/atualizarcliente/${cliente.id}`}
          className='w-full rounded-lg 
                  bg-purple-400 hover:bg-purple flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarcliente/${cliente.id}`}
          className='w-full py-2 rounded-lg
                    bg-gray-700 transition text-white font-medium
                    flex items-center justify-center hover:bg-red-700'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCliente;
