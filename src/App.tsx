import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import { Home } from "lucide-react";
import DeletarCliente from "./components/clientes/deletarclientes/DeletarCliente";
import FormCliente from "./components/clientes/formclientes/FormClientes";
import ListarClientes from "./components/clientes/listarclientes/ListarClientes";
import Footer from "./components/footer/Footer";
import DeletarOportunidade from "./components/oportunidades/deletaroportunidade/DeletarOportunidade";
import FormOportunidade from "./components/oportunidades/formoportunidade/FormOportunidade";
import ListarOportunidade from "./components/oportunidades/listaroportunidades/ListarOportunidade";
import ListarUsuarios from "./components/usuarios/listausuario/ListarUsuarios";
import AboutUs from "./pages/about/AboutUs";
import Cadastro from "./pages/cadastro/Cadastro";
import AtualizarPerfil from "./pages/perfil/AtualizarPerfil";
import Perfil from "./pages/perfil/Perfil";
import AboutProject from "./pages/about/AboutProject";


function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil/:id" element={<Perfil />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/atualizarusuario" element={<AtualizarPerfil />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sobre" element={<AboutProject />} />
            <Route path="/sobrenos" element={<AboutUs />} />
            <Route path="/listarusuarios" element={<ListarUsuarios />} />
            <Route path="/cadastraroportunidade" element={<FormOportunidade />} />
            <Route path="/atualizaroportunidade/:id" element={<FormOportunidade />} />
            <Route path="/listaroportunidades" element={<ListarOportunidade />} />
            <Route path="/deletaroportunidade/:id" element={<DeletarOportunidade />} />
            <Route path="/listarclientes" element={<ListarClientes />} />
            <Route path="/cadastrarcliente" element={<FormCliente />} />
            <Route path="/atualizarcliente/:id" element={<FormCliente />} />
            <Route path="/deletarcliente/:id" element={<DeletarCliente />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App;
