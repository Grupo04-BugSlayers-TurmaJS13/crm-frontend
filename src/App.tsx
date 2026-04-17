import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import DeletarOportunidade from "./components/oportunidades/deletaroportunidade/DeletarOportunidade";
import ListarOportunidade from "./components/oportunidades/listaroportunidades/ListarOportunidade";
import { AuthProvider } from "./context/AuthContext";
import FormOportunidade from "./components/oportunidades/formoportunidade/FormOportunidade";
import { ToastContainer } from "react-toastify";
import AtualizarPerfil from "./pages/perfil/AtualizarPerfil";
import Perfil from "./pages/perfil/Perfil";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

function App() {
  return (
    <>

      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Perfil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/atualizarusuario" element={<AtualizarPerfil />} />
            <Route path="/cadastraroportunidade" element={<FormOportunidade />} />
            <Route path="/atualizaroportunidade/:id" element={<FormOportunidade />} />
            <Route path="/listaroportunidades" element={<ListarOportunidade />} />
            <Route path="/deletaroportunidade/:id" element={<DeletarOportunidade />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
