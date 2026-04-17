<<<<<<< HEAD
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode } from "react";
import { login } from "../services/Service";
import type UsuarioLogin from "../models/UsuarioLogin";
import { ToastAlerta } from "../utils/ToastAlerta";

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
            ToastAlerta('Usuário logado com sucesso', 'sucesso')
        } catch (error) {
            ToastAlerta('Usuário ou senha inválidos', 'erro')
        } 
        setIsLoading(false)
=======
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
>>>>>>> origin/feat/clientes
    }

    function handleLogout() {
        setUsuario({
<<<<<<< HEAD
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        })
=======
            usuario: "",
            senha: "",
            token: ""
        });
>>>>>>> origin/feat/clientes
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
<<<<<<< HEAD
    )

=======
    );
>>>>>>> origin/feat/clientes
}