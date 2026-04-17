import { createContext, useState, type ReactNode } from "react";
import  type UsuarioLogin  from "../models/UsuarioLogin.ts";

import { ToastAlerta } from "../utils/ToastAlerta.ts";
import { login } from "../services/service.ts";

interface authContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as authContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  //Inicializar o estado usuario (armazenar os dados do usuário autenticado)
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  // Inicialaz o estado isLoading (controlar o loaderr do componente login)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Implementação da função de login
  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login("/usuarios/logar", usuarioLogin, setUsuario);
      ToastAlerta("Usuario autenticado com sucesso!", "sucesso");
    } catch (error) {
      ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
    }

    setIsLoading(false);
  }

  // Implementação da função de Logout
  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return(
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading}}>
        {children}
    </AuthContext.Provider>
  )

}
