/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type Oportunidade from "../../../models/Oportunidade";

import { StatusControle } from "../../../utils/StatusControle";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar, atualizar, cadastrar } from "../../../services/service";
import { PageShell } from "../../about/AboutShared";

function FormOportunidade() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [clientes, setClientes] = useState<Cliente[]>([]);

	const [oportunidade, setOportunidade] = useState<Oportunidade>({
		id: 0,
		servico: "",
		preco: 0,
		status: StatusControle.ABERTO,
		data: new Date(),
		cliente: {
			id: 0,
			nome: "",
			email: "",
			telefone: "",
		},
		usuario: {
			id: 0,
			nome: "",
			usuario: "",
			senha: "",
			foto: "",
		},
	});

	function normalizarStatus(status: string): StatusControle {
		if (status.toLowerCase() === "fechado") return StatusControle.FECHADO;
		if (status.toLowerCase() === "perdido") return StatusControle.PERDIDO;
		return StatusControle.ABERTO;
	}

	async function buscarOportunidadePorId(idOportunidade: string) {
		try {
			await buscar(
				`/oportunidades/${idOportunidade}`,
				(dados: Oportunidade) => {
					setOportunidade({
						...dados,
						status: normalizarStatus(String(dados.status)),
					});
				},
				{
					headers: { Authorization: token },
				}
			);
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	async function buscarClientes() {
		try {
			await buscar("/clientes", setClientes, {
				headers: { Authorization: token },
			});
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	useEffect(() => {
		if (token === "") {
			ToastAlerta("Você precisa estar logado", "info");
			navigate("/");
		}
	}, [token, navigate]);

	useEffect(() => {
		if (token !== "") {
			buscarClientes();
			if (id !== undefined) {
				buscarOportunidadePorId(id);
			}
		}
	}, [id, token]);

	function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		if (name === "cliente") {
			const clienteSelecionado = clientes.find((item) => item.id === Number(value));

			if (clienteSelecionado) {
				setOportunidade((estadoAnterior) => ({
					...estadoAnterior,
					cliente: clienteSelecionado,
				}));
			}

			return;
		}

		if (name === "status") {
			setOportunidade((estadoAnterior) => ({
				...estadoAnterior,
				status: normalizarStatus(value),
			}));
			return;
		}

		// if (name === "preco") {
		// 	setOportunidade((estadoAnterior) => ({
		// 		...estadoAnterior,
		// 		preco: value === "" ? 0 : Number(value),
		// 	}));
		// 	return;
		// }


		if (name === "preco") {
			const apenasNumeros = value.replace(/\D/g, "");
			const numero = Number(apenasNumeros) / 100;

			setOportunidade((estadoAnterior) => ({
				...estadoAnterior,
				preco: numero,
			}));
			return;
		}

		setOportunidade((estadoAnterior) => ({
			...estadoAnterior,
			[name]: value,
		}));
	}

	function retornar() {
		navigate("/ListarOportunidades");
	}

	async function gerarNovaOportunidade(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!oportunidade.cliente || oportunidade.cliente.id === 0) {
			ToastAlerta("Selecione um cliente válido", "info");
			return;
		}

		setIsLoading(true);

		const oportunidadePayload = {
			...oportunidade,
			status: oportunidade.status,
			cliente: { id: oportunidade.cliente.id },
			usuario: { id: usuario.id },
		};

		if (id !== undefined) {
			try {
				await atualizar("/oportunidades", oportunidadePayload, setOportunidade, {
					headers: {
						Authorization: token,
					},
				});

				ToastAlerta("Oportunidade atualizada com sucesso", "sucesso");
				retornar();
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					const mensagemErro =
						error?.response?.data?.message ?? "Erro ao atualizar a oportunidade";
					ToastAlerta(mensagemErro, "erro");
				}
			}
		} else {
			try {
				await cadastrar("/oportunidades", oportunidadePayload, setOportunidade, {
					headers: {
						Authorization: token,
					},
				});

				ToastAlerta("Oportunidade cadastrada com sucesso", "sucesso");
				retornar();
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					const mensagemErro =
						error?.response?.data?.message ?? "Erro ao cadastrar a oportunidade";
					ToastAlerta(mensagemErro, "erro");
				}
			}
		}

		setIsLoading(false);
	}

	function formatarMoeda(valor: number) {
		return valor.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	}

	return (
		<PageShell>
			<div className="container flex flex-col items-center py-20 min-h-screen min-w-screen p-10">
				<h1 className="py-6 text-center text-4xl text-blue-light">
					{id !== undefined ? "Editar Oportunidade" : "Cadastrar Oportunidade"}
				</h1>
				<form
					className="flex w-full max-w-2xl flex-col gap-4 md:w-1/2 bg-purple/18 backdrop-blur-md
            		border border-purple/30 rounded-2xl p-6
            		shadow-lgp-6 shadow-sm hover:shadow-md transition-shadow mt-8"
					onSubmit={gerarNovaOportunidade}
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="servico" className="text-blue-light px-2">Título da Oportunidade</label>
						<input
							type="text"
							placeholder="Serviço"
							name="servico"
							id="servico"
							required
							className="w-full p-3 rounded-lg bg-[#0f0f1a] border border-gray-800 text-white
            				focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30 transition"
							value={oportunidade.servico}
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="preco" className="text-blue-light px-2">Preço da Oportunidade</label>
						<input
							type="text"
							step="0.01"
							min="0"
							placeholder="Preço"
							name="preco"
							id="preco"
							required
							inputMode="numeric"
							className="w-full p-3 rounded-lg bg-[#0f0f1a] border border-gray-800 text-white
            				focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30 transition"
							value={
								oportunidade.preco === 0
									? ""
									: formatarMoeda(oportunidade.preco)
							}
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="status" className="text-blue-light px-2">Status da Oportunidade</label>
						<select
							name="status"
							id="status"
							className="w-full p-3 rounded-lg bg-[#0f0f1a] border border-gray-800 text-white
            				focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30 transition"
							value={oportunidade.status}
							onChange={atualizarEstado}
						>
							<option value={StatusControle.ABERTO} className="text-blue-light px-2">Aberto</option>
							<option value={StatusControle.FECHADO} className="text-blue-light px-2">Fechado</option>
							<option value={StatusControle.PERDIDO} className="text-blue-light px-2">Perdido</option>
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="cliente" className="text-blue-light px-2">Cliente da Oportunidade</label>
						<select
							name="cliente"
							id="cliente"
							className="w-full p-3 rounded-lg bg-[#0f0f1a] border border-gray-800 text-white
            				focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30 transition"
							value={oportunidade.cliente?.id ? String(oportunidade.cliente.id) : ""}
							onChange={atualizarEstado}
							required
						>
							<option value="" disabled className="text-blue-light px-2">
								Selecione um cliente
							</option>

							{clientes.map((cliente) => (
								<option key={cliente.id} value={cliente.id}>
									{cliente.nome}
								</option>
							))}
						</select>
					</div>
					<div className="flex justify-center m-auto gap-6" >
						<button
							type="submit"
							disabled={isLoading}
							className="mx-auto flex w-50 justify-center rounded-lg bg-blue-800 py-3 my-4 font-bold text-white hover:bg-indigo-800 disabled:bg-slate-300 mb-4"
						>
							{isLoading ? (
								<ClipLoader color="#ffffff" size={24} />
							) : (
								<span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
							)}
						</button>
						<button
							onClick={retornar}
							className="w-50 rounded-lg py-3 my-4 m-auto
	                    bg-gray-700 transition text-white font-bold flex items-center justify-center hover:bg-red-700">
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</PageShell>
	);
}

export default FormOportunidade;

