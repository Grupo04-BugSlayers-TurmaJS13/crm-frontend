import { motion } from "framer-motion";
import { Blocks, FileText, ShieldCheck } from "lucide-react";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { BrandLogo, fadeUp, PageShell, SectionBadge, staggerContainer } from "../components/about/AboutShared";


const developers = [
  {
    name: "Bianca",
    role: "Desenvolvedora",
    linkedin: "https://www.linkedin.com/in/bia-caetano",
    github: "https://github.com/bia024",
    accent: "from-fuschia-500/30 to-sky-400/10",
    image: "/bianca.jpeg",
  },
  {
    name: "Clarisse",
    role: "Desenvolvedora",
    linkedin: "https://www.linkedin.com/in/clarissee-rodriguess",
    github: "https://github.com/clarodriguess",
    accent: "from-sky-500/30 to-cyan-400/10",
    image: "/clarisse.jpeg",
  },
  {
    name: "Gabriela",
    role: "Desenvolvedora",
    linkedin:
      "https://www.linkedin.com/in/gabriela-almeida-escalera-dos-santos-27022b3a0/",
    github: "https://github.com/Gaalmeida-dev",
    accent: "from-violet-500/30 to-sky-400/10",
    image: "/gabriela.jpeg",
  },
  {
    name: "Leonardo",
    role: "Desenvolvedor",
    linkedin: "https://www.linkedin.com/in/leonardo-botelho-b29061174",
    github: "https://github.com/Botelhool",
    accent: "from-violet-500/20 to-cyan-400/20",
    image: "/leonardo.jpeg",
  },
  {
    name: "Ramon",
    role: "Desenvolvedor",
    linkedin: "https://www.linkedin.com/in/ramon-alberto",
    github: "https://github.com/RAMONBRX",
    accent: "from-violet-500-25 to-cyan-500-15",
    image: "/ramon.jpeg",
  },
  {
    name: "Sabrina",
    role: "Desenvolvedora",
    linkedin: "https://www.linkedin.com/in/sabrina-novaes",
    github: "https://github.com/SabrinaNovaes",
    accent: "from-sky-500/20 to-blue-400-20",
    image: "/sabrina.jpeg",
  },
];

const collaborationPillars = [
  {
    title: "Colaboração compartilhada",
    description:
      "Um fluxo em grupo orientado por consistência visual, alinhamento técnico e integração entre entregas.",
    icon: Blocks,
  },
  {
    title: "Documentação prática",
    description:
      "Swagger, organização de repositório e boas ferramentas de desenvolvimento fortalecem a manutenção do projeto.",
    icon: FileText,
  },
  {
    title: "Base Confiável",
    description:
      "A stack foi escolhida para apoiar a escalabilidade, produtividade e uma experiência fluida na colaboração.",
    icon: ShieldCheck,
  },
];

export default function AboutUs() {
  return (
    <PageShell>
      <section className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <SectionBadge>Sobre nós</SectionBadge>
          <div className="mt-6 flex justify-center">
            <BrandLogo className="justify-center" />
          </div>
          <motion.h1
            custom={0.16}
            variants={fadeUp}
            className="mt-8 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Somos um time dedicado a desenvolver soluções digitais.
          </motion.h1>
          <motion.p
            custom={0.22}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            Nossa equipe combina colaboração, cuidado com interface e
            desenvolvimento orientado a produto para construir uma solução mais
            organizada, intuitiva e preparada para evoluir.
          </motion.p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {developers.map((developer, index) => (
            <motion.article
              key={developer.name}
              custom={index * 0.08}
              variants={fadeUp}
              whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
              transition={{ duration: 0.35 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-br ${developer.accent} opacity-70 blur-2xl transition duration-500 group-hover:opacity-100`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08), rgba(255,255,255,0.02))] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col items-center text-center">
                <div className="mb-6 flex flex-col items-center gap-4">
                  {developer.image ? (
                    <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-white/10 shadow-lg group-hover:border-purple/35 transition duration-300">
                      <img
                        src={developer.image}
                        alt={developer.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-purple/20 bg-blue-light text-2xl font-semibold text-purple shadow-[0_0_28px_rgba(129,202,231,0.16)]">
                      {developer.name.charAt(0)}
                    </div>
                  )}
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                    {developer.role}
                  </span>
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    {developer.name}
                  </h2>
                  <p className="text-sm leading-7 text-slate-300 mx-auto max-w-[80%]">
                    Integrante da equipe com foco na construção da experiência.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    href={developer.linkedin || "#"}
                    target={developer.linkedin ? "_blank" : "_self"}
                    rel="noreferrer"
                    aria-label={`Linkedin de ${developer.name}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition duration-300 hover:border-purple/35 hover:bg-purple/10 hover:text-purple"
                  >
                    <LinkedinLogoIcon className="h-5 w-5" />
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    href={developer.github || "#"}
                    target={developer.github ? "_blank" : "_self"}
                    rel="noreferrer"
                    aria-label={`GitHub de ${developer.name}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition duration-300 hover:border-purple/35 hover:bg-purple/10 hover:text-purple"
                  >
                    <GithubLogoIcon className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
      <section className="relative mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 lg:px-16 lg:pb-24">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <SectionBadge>Nosso trabalho em equipe</SectionBadge>
          <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
            {" "}
            Uma estrutura guiada por colaboração, entrega e consistência
            conjunta.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Mesmo com responsabilidades divididas, o projeto mantém uma
            linguagem visual alinhada e uma direção técnica conectada para que
            cada parte faça sentido dentro do mesmo produto.
          </p>
        </motion.article>
        <div className="mt-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5"
          >
            {collaborationPillars.map(
              ({ title, description, icon: Icon }, index) => (
                <motion.article
                  key={title}
                  custom={index * 0.08}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex rounded-2xl border border-purple/20 bg-purple/10 p-3 text-purple">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl front-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 tyext-slate-300">
                        {description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ),
            )}
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
