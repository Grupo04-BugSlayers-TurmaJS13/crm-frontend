import type Usuario from "../../../models/Usuario";

interface CardUsuariosProps {
  usuario: Usuario
}

function CardUsuarios({ usuario }: CardUsuariosProps) {
  return (
    <>
      <div className="bg-[var(--color-primary-dark)]/80 backdrop-blur-md 
                    border border-[var(--color-purple)]/20 
                    rounded-2xl p-4 flex items-center gap-4 
                    shadow-lg hover:shadow-purple-500/20 
                    transition-all duration-300 hover:scale-[1.02]">

        <img
          src={usuario.foto || "https://i.imgur.com/L4mXH6S.png"}
          alt={usuario.nome}
          className="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-purple)]"
        />

        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">
            {usuario.nome}
          </h3>
          <p className="text-gray-400 text-sm">
            {usuario.usuario}
          </p>
        </div>
      </div>
    </>
  )
}

export default CardUsuarios