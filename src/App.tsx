import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/cadastroCliente" element={<FormCliente />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}