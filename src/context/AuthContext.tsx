import { createContext, ReactNode, useState } from "react";
import { UsuarioLogin } from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    handleLogout(): void;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        usuario: "",
        senha: "",
        token: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario);
            alert("Usuário logado com sucesso!");
        } catch (error) {
            alert("Dados do usuário inconsistentes.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario({
            usuario: "",
            senha: "",
            token: ""
        });
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}