import { ArrowUpIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import imgLogo from "../../assets/img/logo-crm.png"


function Footer() {
  return (
    <>
    <footer className="bg-(--color-primary-dark) border-t border-white">
      <div className="w-full px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="flex flex-col items-center gap-3 p-4">
            <Link to="/" >
                            <img 
                            src={imgLogo}
                            alt="Logo Conecta CRM" 
                            className="w-50"  
                            />
                        </Link>
            
              
              <div className="text-white/80 text-xs uppercase max-w-70 text-center">
                <p>Plataforma de CRM que simplifica e agiliza as vendas do seu negócio</p>
              </div>            
          </div>


          <nav className="flex gap-30 ">
            <div className="flex flex-col  gap-4 ">
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm font-regular uppercase transition-colors"
                > CLIENTES
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm font-regular uppercase transition-colors"
                > OPORTUNIDADES
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm font-regular uppercase transition-colors"
                > USUARIOS
                </a>
            </div>

            <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm font-regular uppercase transition-colors"
                > SOBRE
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm font-regular uppercase transition-colors"
                > PROJETO
                </a>
            </div>
          </nav>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
          >
            <span>TOPO</span>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition-colors">
              <ArrowUpIcon size={16} />
            </div>
          </button>

        </div>
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            @{new Date().getFullYear()} CONECTA CRM - Projeto BugSlayers -
            Generation Brasil
          </p>
          <p className="text-white/40 text-xs">
            Desenvolvido com React + Typescript + NestJs
          </p>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer