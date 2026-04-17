import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import type { Cliente } from "../../models/Cliente";
import { buscar } from "../../services/Service";
import { Plus, Buildings } from "@phosphor-icons/react";
import { AuthContext } from "../../context/AuthContext";

function Clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  async function getClientes() {
    try {
      await buscar('/clientes', setClientes, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
         handleLogout();
      }
      alert("Erro ao carregar clientes. Verifique sua conexão.");
    }
  }

  useEffect(() => {
    if (token !== "") { 
      getClientes(); 
    }
  }, [token]);

  return (
    <div className="bg-background min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary-dark">Meus Clientes</h1>
            <p className="text-gray-500">Gerencie sua base de contatos e empresas.</p>
          </div>
          <button 
            onClick={() => navigate("/cadastroCliente")}
            className="bg-purple hover:bg-purple-hover text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
          >
            <Plus size={20} weight="bold" /> Novo Cliente
          </button>
        </header>
        {clientes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum cliente encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientes.map((cliente) => (
              <div key={cliente.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-light/20 p-3 rounded-full text-blue">
                    <Buildings size={28} />
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Clientes;