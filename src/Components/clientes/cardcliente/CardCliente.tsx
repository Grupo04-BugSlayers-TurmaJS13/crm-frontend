
import { Buildings } from "@phosphor-icons/react";
import type Cliente from "../../../models/Cliente";
import { Link } from "react-router-dom";

interface cardClienteProps {
  cliente: Cliente;
}


function CardCliente({ cliente }: cardClienteProps) {
  return (
    <div key={cliente.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow mt-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-light/20 p-3 rounded-full text-blue">
                        <Buildings size={32} />
                      </div>
                      <h2 className="font-heading font-bold text-lg truncate">{cliente.nome}</h2>
                    </div>
                    <p className="text-sm text-gray-600">📧 {cliente.email}</p>
                    <p className="text-sm text-gray-600">📞 {cliente.telefone}</p>
                    <div className="mt-4 pt-4 border-t border-gray-50">
                      <a href={cliente.sites} target="_blank" rel="noreferrer" className="text-purple font-semibold text-xs uppercase tracking-wider hover:underline">
                        Ver Website
                      </a>
                    </div>
                    <div className="flex gap-4 mt-2">
                <Link to={`/atualizarcliente/${cliente.id}`} 
                    className='w-full   rounded-lg
                   bg-purple-400 hover:bg-purple flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarcliente/${cliente.id}`} 
                    className='
                    bg-red-400 hover:bg-red-700 w-full flex items-center justify-center rounded-lg'>
                    <button>Deletar</button>
                </Link>
            </div>
                  </div>
  );
}

export default CardCliente;
