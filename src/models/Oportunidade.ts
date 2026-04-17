import type Cliente from "./Cliente";
import type Usuario from "./Usuario";
import type { StatusControle } from "../utils/StatusControle";

export default interface Oportunidade{
    id: number;
    servico: string;
    preco: number;
    status: StatusControle;
    data: Date;
    cliente?: Cliente;
    usuario?: Usuario;
}