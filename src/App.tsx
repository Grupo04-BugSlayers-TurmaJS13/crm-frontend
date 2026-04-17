import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./Pages/home/Home";
import FormOportunidade from "./Components/oportunidades/formoportunidade/FormOportunidade";
import Login from "./Pages/login/Login";
import ListarOportunidade from "./Components/oportunidades/listaroportunidades/ListarOportunidade";
import DeletarOportunidade from "./Components/oportunidades/deletaroportunidade/DeletarOportunidade";





function App() {
  return (
    <>

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
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
