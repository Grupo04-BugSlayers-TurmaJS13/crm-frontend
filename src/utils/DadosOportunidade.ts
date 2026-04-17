import type Oportunidade from "../models/Oportunidade";
import dadosClientes from "./DadosCliente";
import dadosUsuarios from "./DadosUsuario";
import { StatusControle } from "./StatusControle";

export const dadosOportunidades: Oportunidade[] = [
	{
		id: 1,
		servico: "Proposta comercial CRM",
		preco: 3500,
		status: StatusControle.ABERTO,
		data: new Date("2026-04-12"),
		cliente: dadosClientes[0],
		usuario: dadosUsuarios[0],
	},
	{
		id: 2,
		servico: "Implantacao de automacao de vendas",
		preco: 6200,
		status: StatusControle.FECHADO,
		data: new Date("2026-03-28"),
		cliente: dadosClientes[1],
		usuario: dadosUsuarios[1],
	},
	{
		id: 3,
		servico: "Treinamento de equipe comercial",
		preco: 1800,
		status: StatusControle.ABERTO,
		data: new Date("2026-04-09"),
		cliente: dadosClientes[2],
		usuario: dadosUsuarios[2],
	},
	{
		id: 4,
		servico: "Integracao CRM com ERP",
		preco: 9100,
		status: StatusControle.PERDIDO,
		data: new Date("2026-02-19"),
		cliente: dadosClientes[3],
		usuario: dadosUsuarios[3],
	},
	{
		id: 5,
		servico: "Configuracao de funil de vendas",
		preco: 2700,
		status: StatusControle.FECHADO,
		data: new Date("2026-03-10"),
		cliente: dadosClientes[4],
		usuario: dadosUsuarios[0],
	},
	{
		id: 6,
		servico: "Dashboard de desempenho comercial",
		preco: 4300,
		status: StatusControle.ABERTO,
		data: new Date("2026-04-14"),
		usuario: dadosUsuarios[1],
	},
];

export default dadosOportunidades;
