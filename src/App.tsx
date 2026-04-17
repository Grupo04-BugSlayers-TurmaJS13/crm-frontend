import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import DeletarCliente from "./components/clientes/deletarclientes/DeletarCliente";
import FormCliente from "./components/clientes/formclientes/FormClientes";
import ListarClientes from "./components/clientes/listarclientes/ListarClientes";
import DeletarOportunidade from "./components/oportunidades/deletaroportunidade/DeletarOportunidade";
import FormOportunidade from "./components/oportunidades/formoportunidade/FormOportunidade";
import ListarOportunidade from "./components/oportunidades/listaroportunidades/ListarOportunidade";





function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/listarclientes" element={<ListarClientes />} />
          <Route path="/deletarcliente/:id" element={<DeletarCliente />} />
          <Route path="/cadastrarcliente" element={<FormCliente />} />
          <Route path="/atualizarcliente/:id" element={<FormCliente />} />
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
