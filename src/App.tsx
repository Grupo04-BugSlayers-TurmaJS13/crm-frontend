import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AtualizarPerfil from "./Pages/perfil/AtualizarPerfil";
import Perfil from "./Pages/perfil/Perfil";
import Cadastro from "./Pages/cadastro/Cadastro";

import { ToastContainer } from "react-toastify";
import Login from "./Pages/login/Login";
import Home from "./Pages/home/Home";
import FormOportunidade from "./Components/oportunidades/formoportunidade/FormOportunidade";
import ListarOportunidade from "./Components/oportunidades/listaroportunidades/ListarOportunidade";
import DeletarOportunidade from "./Components/oportunidades/deletaroportunidade/DeletarOportunidade";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
    
            <Route path="/cadastraroportunidade" element={<FormOportunidade />} />
            <Route path="/atualizaroportunidade/:id" element={<FormOportunidade />} />
          <Route path="/listaroportunidades" element={<ListarOportunidade />} />
          <Route path="/deletaroportunidade/:id" element={<DeletarOportunidade />} />
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
