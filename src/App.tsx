import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DeletarOportunidade from "./components/oportunidades/deletaroportunidade/DeletarOportunidade";
import ListarOportunidade from "./components/oportunidades/listaroportunidades/ListarOportunidade";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import FormOportunidade from "./components/oportunidades/formoportunidade/FormOportunidade";


function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
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
