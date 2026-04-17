import axios from "axios";

export const api = axios.create({
  baseURL: "https://crm-backend-dzhc.onrender.com",
});

export const cadastrarUsuario = async (url: string, dados: any, setDados: any) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (url: string, dados: any, setDados: any) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (url: string, setDados: any, header: any) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (url: string, dados: any, setDados: any, header: any) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};