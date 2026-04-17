import {
	useState,
	useContext,
	useEffect,
	type ChangeEvent,
	type SyntheticEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Cliente from "../../../models/Cliente";
import { atualizar, buscar, cadastrar } from "../../../services/service";

import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCliente() {
	 const navigate = useNavigate();

  // Estado para controlar o Loader(animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado que irá receber todos os clientes persistidos no Backend
  const [cliente, setCliente] = useState<Cliente>({
	id: 0,
	nome: "",
	email: "",
	telefone: "",
	sites: "",
	oportuniades: [],
  });
 

  // Acessar o token do usuário autenticado
  const { usuario, handleLogout } = useContext(AuthContext);

  //Criar um objeto para armazenar o token
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarClientePorId(id: string) {
    try {
      await buscar(`clientes/${id}`, setCliente, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  //Cria um useEffect para monitorar o token
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarClientePorId(id);
    }
  }, [id]);

  // Função de atuaiização do estado cliente
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/listarclientes");
  }

  async function gerarNovoCliente(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/clientes", cliente, setCliente, {
          headers: { Authorization: token },
        });
        ToastAlerta("O cliente foi atualizado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta(" Erro ao atualizar o cliente.", "erro");
        }
      }
    } else {
      try {
        await cadastrar("/clientes", cliente, setCliente, {
          headers: { Authorization: token },
        });
        ToastAlerta("O cliente foi cadastrado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta(" Erro ao cadastrar o cliente.", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

	return (
		<div className="container mx-auto flex flex-col bg-primary-dark items-center min-h-screen min-w-screen p-4">
			<h1 className="my-8 text-center text-4xl text-blue-light">
				{id !== undefined ? "Editar Cliente" : "Cadastrar Cliente"}
			</h1>

			<form
				className="flex w-full max-w-2xl flex-col gap-4 md:w-1/2"
				onSubmit={gerarNovoCliente}
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="nome" className="text-blue-light">Nome do Cliente</label>
					<input
						type="text"
						placeholder="Nome do Cliente"
						name="nome"
						id="nome"
						required
						className="rounded border-2 border-slate-700 p-2 bg-background "
						value={cliente.nome}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-blue-light">Email do Cliente</label>
					<input
						type="email"
						placeholder="Email do Cliente"
						name="email"
						id="email"
						required
						className="rounded border-2 border-slate-700  bg-background p-2"
						value={cliente.email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="telefone" className="text-blue-light">Telefone do Cliente</label>
					<input
						type="text"
						placeholder="Telefone do Cliente"
						name="telefone"
						id="telefone"
						required
						className="rounded border-2 border-slate-700  bg-background p-2"
						value={cliente.telefone}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>


				<div className="flex flex-col gap-2">
					<label htmlFor="sites" className="text-blue-light">Site do Cliente</label>
					<input
						type="text"
						placeholder="Site do Cliente"
						name="sites"
						id="sites"
						className="rounded border-2 border-slate-700  bg-background p-2"
						value={cliente.sites}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				

				

				

				<button
					type="submit"
					disabled={isLoading}
					className="mx-auto flex w-1/2 justify-center rounded bg-indigo-400 py-2 font-bold text-white hover:bg-indigo-800 disabled:bg-slate-300 mb-4"
				>
					{isLoading ? (
						<ClipLoader color="#ffffff" size={24} />
					) : (
						<span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
					)}
				</button>
			</form>
		</div>
	);
}

export default FormCliente;

