import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import DeletarOportunidade from "./components/oportunidades/deletaroportunidade/DeletarOportunidade";
import FormOportunidade from "./components/oportunidades/formoportunidade/FormOportunidade";
import ListarOportunidade from "./components/oportunidades/listaroportunidades/ListarOportunidade";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";






function App() {
  return (
    <>

    <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/cadastraroportunidade" element={<FormOportunidade />} />
          <Route path="/atualizaroportunidade/:id" element={<FormOportunidade />} />
          <Route path="/listaroportunidades" element={<ListarOportunidade />} />
          <Route path="/deletaroportunidade/:id" element={<DeletarOportunidade />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthProvider>

    </>
  );
}

export default App;
