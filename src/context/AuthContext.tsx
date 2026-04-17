/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode } from "react";
import { login } from "../services/Service";
import type UsuarioLogin from "../models/UsuarioLogin";

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })
    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleLogin(usuario: UsuarioLogin) {
        setIsLoading(true)

        try {
            await login('usuarios/logar', usuario, setUsuario)
            alert('Usuário logado com sucesso')
        } catch (error) {
            alert('Usuário ou senha inválidos')
        } 
        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )

}