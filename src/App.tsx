import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AtualizarPerfil from "./Pages/perfil/AtualizarPerfil";
import Perfil from "./Pages/perfil/Perfil";
import Cadastro from "./Pages/cadastro/Cadastro";
import { LogIcon } from "@phosphor-icons/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Perfil />} />
            <Route path="/login" element={<LogIcon />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/atualizarusuario" element={<AtualizarPerfil />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
