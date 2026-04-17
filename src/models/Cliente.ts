import { Oportunidade } from "./Oportunidade";

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  sites: string;
  oportunidades?: Oportunidade[];
  status: 'Ativo' | 'Inativo';
}