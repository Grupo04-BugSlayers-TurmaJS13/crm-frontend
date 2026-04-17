import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent
} from "react"
import { FaExclamationTriangle } from "react-icons/fa"
import { motion } from "framer-motion"
import { ClipLoader } from "react-spinners"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import type UsuarioLogin from "../../models/UsuarioLogin"
import logo from "../../assets/logo-crm.png"
import { FcGoogle } from "react-icons/fc"
import { BsFillPersonFill } from "react-icons/bs"
import { IoMdTrendingUp } from "react-icons/io"
import { TbNotes } from "react-icons/tb"

function Login() {
  const navigate = useNavigate();


  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin,
  );


  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const emailValido =
    usuarioLogin.usuario?.includes("@") && usuarioLogin.usuario?.includes(".")

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home")
    }
  }, [usuario]);


  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  console.log("USUARIO AUTH:", usuario);
console.log("TOKEN:", usuario.token);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-[var(--color-gray-light)] font-sans py-10 px-4 md:px-0">
        <article className="w-full max-w-[900px] min-h-[520px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(121,84,237,0.5)] grid grid-cols-1 md:grid-cols-2">

          <div className="bg-[var(--color-primary-dark)] text-white p-6 md:p-10 flex flex-col justify-between">
            <div className="flex flex-col">
              <img
                src={logo}
                alt="logo-site"
                className="w-40 md:w-55 h-auto items-center justify-center my-6 mx-auto drop-shadow-md drop-shadow-purple"
              />

              <h1 className="text-2xl md:text-3xl font-heading font-semibold leading-snug">
                Gerencie seus clientes com{" "}
                <span className="text-[var(--color-purple)]">precisão</span>
              </h1>

              <p className="mt-4 text-sm text-gray-300">
                Uma plataforma completa para acompanhar oportunidades,
                contatos e resultados.
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-300 md:pb-4">
              <p className="flex gap-2 items-center">
                <BsFillPersonFill size={35} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm" />
                Gestão de clientes e contatos
              </p>
              <p className="flex gap-2 items-center">
                <IoMdTrendingUp size={35} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm" />
                Acompanhamento de oportunidades
              </p>
              <p className="flex gap-2 items-center">
                <TbNotes size={35} className="text-[var(--color-purple)] border border-[var(--color-purple)] rounded-md p-2 bg-[rgba(121,84,237,0.1)] backdrop-blur-sm" />
                Relatórios e métricas detalhadas
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 flex flex-col justify-center w-full">
            <h2 className="text-2xl font-heading font-semibold text-[var(--color-text)]">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Acesse sua conta para continuar
            </p>

            <motion.form
              className="space-y-4"
              onSubmit={login}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <label className="text-xs text-gray-500">E-mail</label>
                <input
                  type="email"
                  name="usuario"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  placeholder="seu@email.com"
                  className="w-full mt-1 p-3 rounded-lg bg-[var(--color-gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)]"
                />
                {usuarioLogin.usuario?.length > 0 && !emailValido && (
                  <span className="text-red-400 text-xs flex items-center p-2 gap-2">
                    <FaExclamationTriangle size={16} />
                    Digite um e-mail válido
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  placeholder="••••••"
                  className="w-full mt-1 p-3 rounded-lg bg-[var(--color-gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)]"
                />
              </div>

              <div className="text-right text-xs text-[var(--color-purple)] cursor-pointer">
                Esqueceu a senha?
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg bg-[var(--color-purple)] text-white font-semibold hover:bg-[var(--color-purple-hover)] transition"
              >
                {isLoading ? <ClipLoader color="#fff" size={20} /> : "Entrar"}
              </motion.button>

              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <div className="flex-1 h-px bg-gray-300" />
                ou continue com
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-lg border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
              >
                <span className="text-sm flex gap-2 items-center">
                  <FcGoogle size={20} />
                  Google
                </span>
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Não tem uma conta?{" "}
                <Link
                  to="/cadastrar"
                  className="text-[var(--color-purple)] cursor-pointer"
                >
                  Cadastre-se grátis
                </Link>
              </p>
            </motion.form>
          </div>
        </article>
      </section>

    </>
  );
}

export default Login

