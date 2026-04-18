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

		if (name === "preco") {
			setOportunidade((estadoAnterior) => ({
				...estadoAnterior,
				preco: value === "" ? 0 : Number(value),
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

	return (
		<div className="container mx-auto flex flex-col items-center px-4">
			<h1 className="my-8 text-center text-4xl">
				{id !== undefined ? "Editar Oportunidade" : "Cadastrar Oportunidade"}
			</h1>

			<form
				className="flex w-full max-w-2xl flex-col gap-4 md:w-1/2"
				onSubmit={gerarNovaOportunidade}
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="servico">Título da Oportunidade</label>
					<input
						type="text"
						placeholder="Serviço"
						name="servico"
						id="servico"
						required
						className="rounded border-2 border-slate-700 p-2"
						value={oportunidade.servico}
						onChange={atualizarEstado}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="preco">Preço da Oportunidade</label>
					<input
						type="number"
						step="0.01"
						min="0"
						placeholder="Preço"
						name="preco"
						id="preco"
						required
						className="rounded border-2 border-slate-700 p-2"
						value={oportunidade.preco === 0 ? "" : oportunidade.preco}
						onChange={atualizarEstado}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="status">Status da Oportunidade</label>
					<select
						name="status"
						id="status"
						className="rounded border border-slate-800 p-2"
						value={oportunidade.status}
						onChange={atualizarEstado}
					>
						<option value={StatusControle.ABERTO}>Aberto</option>
						<option value={StatusControle.FECHADO}>Fechado</option>
						<option value={StatusControle.PERDIDO}>Perdido</option>
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="cliente">Cliente da Oportunidade</label>
					<select
						name="cliente"
						id="cliente"
						className="rounded border border-slate-800 p-2"
						value={oportunidade.cliente?.id ? String(oportunidade.cliente.id) : ""}
						onChange={atualizarEstado}
						required
					>
						<option value="" disabled>
							Selecione um cliente
						</option>

						{clientes.map((cliente) => (
							<option key={cliente.id} value={cliente.id}>
								{cliente.nome}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="mx-auto flex w-1/2 justify-center rounded bg-indigo-400 py-2 font-bold text-white hover:bg-indigo-800 disabled:bg-slate-300"
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

export default FormOportunidade;

