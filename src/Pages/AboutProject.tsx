import { motion } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, Database, FolderGit2, Globe, LayoutDashboard, Link as LinkIcon, MonitorSmartphone, Sparkles, Workflow } from 'lucide-react';
import { BrandLogo, PageShell, SectionBadge, fadeUp, staggerContainer } from '../Components/about/AboutShared';

const projectMetrics = [
    {
        label: 'Experiência do frontend',
        value: 'React + Tailwind',
        detail: 'Interface moderna com foco na responsividade, reutilização de código e identidade visual consistente, consolidando nossa identidade.',
    },
    {
        label: 'Arquitetura da API',
        value: 'Nest + Node',
        detail: 'Estrutura preparada para suportar fluxos de CRM de forma otimizada, organizada e escalável.',
    },
    {
        label: 'Camada de dados',
        value: 'MySQL + TypeORM',
        detail: 'Base relacional pensada para leads, contatos, oportunidades e seu histórico comercial.',
    },
];

const featureHighlights = [
    {
        title: 'Visão de vendas',
        description: 'Acompanhe as pipelines, leads e oportunidades com uma leitura mais clara da jornada comercial do seu negócio.',
        icon: LayoutDashboard,
    },
    {
        title: 'Fluxo Conectado',
        description: 'Rotas, interface, requisições e persistência em um só lugar! Pensadas para funcionar de forma integrada.',
        icon: Workflow,
    },
    {
        title: 'Evoluição contínua',
        description: 'A base do projeto permite crescer com novos módulos, relatórios e regras de negócio.',
        icon: Sparkles,
    },
];

const stackCategories = [
    {
        title: 'Frontend',
        items: ['React', 'TypeScript', 'TailwindCSS', 'React Router DOM', 'Axios', 'Phosphor Icons', 'Lucide React', 'React Spinners'],
        icon: MonitorSmartphone
    },
    {
        title: 'Backend e dados',
        items: ['NestJS', 'Node.Js', 'MySQL', 'TypeORM', 'Swagger'],
        icon: Database,
    },
    {
        title: 'Ferramentas',
        items: ['Github', 'Vercel', 'VS Code', 'Insomnia'],
        icon: FolderGit2,
    },
];

export default function AboutProject() {
    return (
        <PageShell>
            <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
                <div className="flex flex-col gap-16">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className='space-y-8'
                    >
                        <div className='space-y-6'>
                            <SectionBadge>Sobre o Projeto</SectionBadge>
                            <motion.div
                                custom={0.16}
                                variants={fadeUp}
                                className='max-w-full space-y-4'>
                                <div className='grid gap-8 lg:grid-cols-2'>
                                    <div>
                                        <h1 className='text-4xl font-semibold leading-tight text-white-soft sm:text-5xl lg:text-6xl'>
                                            Um CRM criado para conectar oportunidade, produtividade e estratégia de negócios.</h1>
                                        <p className='mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg'>
                                            O Conecta CRM foi pensado pela nossa equipe para oferecer uma experiênci mais fluida no acompanhamento de métricas de negócio, clientes, processos e decisões, unindo interface moderna, estrutura escalável e gestão orientada a resultados.
                                        </p>
                                    </div>
                                    <div className='flex flex-col justify-end gap-4'>
                                        <div className='mb-24 pt-2 scale-[6.0] origin-left pl-1 sm:mb-24'>
                                            <BrandLogo />
                                        </div>
                                        <motion.div
                                            variants={staggerContainer}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.3 }}
                                            className='grid gap-4'
                                        >
                                            {projectMetrics.map((metric, index) => (
                                                <motion.article
                                                    key={metric.label}
                                                    custom={index * 0.08}
                                                    variants={fadeUp}
                                                    whileHover={{ y: -6, scale: 1.01 }}
                                                    className='rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl'>
                                                    <p className='text-xs uppercase tracking-[0.22em] text-blue-light'>
                                                        {metric.label}
                                                    </p>
                                                    <h2 className='mt-3 text-lg font-semibold text-white'>
                                                        {metric.value}
                                                    </h2>
                                                </motion.article>
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            custom={0.22}
                            variants={fadeUp}
                            className='flex flex-wrap gap-4'>
                            <a
                                href='https://github.com/Grupo04-BugSlayers-TurmaJS13/crm-frontend'
                                target='_blank'
                                rel='noreferrer'
                                className='group inline-flex min-h-11 items-center gap-3 rounded-full border border-gray-400/30 bg-gradient-to-r from-purple to-blue px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(70,170,228,0.22)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(121,84,237,0.28)]'>
                                Acesse nosso repositório
                                <ArrowUpRight className='h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                            </a>
                            <div className='inline-flex min-h-11 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 backdrop-blur-md'>
                                <Globe className='h-4 w-4 text-blue-light' />
                                Desenvolvido para uma jornada comercial mais inteligente.
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                        className='relative w-full'>
                        <div className='absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-purple/20 via-transparent to-blue/20 blur-2xl' />
                        <div className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-{0_24px_80px_rgba(4,12,22,0.45)] backdrop-blur-2xl sm:p-6'>
                            <div className='mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4'>
                                <div>
                                    <p className='text-xs uppercase tracking-[0.24em] text-purple'>Visão do produto</p>
                                    <h2 className='mt-2 text-xl font-semibold text-white'>Mockup conceitual do CRM</h2>
                                </div>
                                <div className='rounded-full border border-emerald-400/200 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300'> Em evolução
                                </div>
                            </div>
                            <div className='grid gap-4'>
                                <div className='grid gap-4 md:grid-cols-[1.15fr_0.85fr]'>
                                    <motion.article
                                        whileHover={{ y: -4 }}
                                        className='rounded-[1.5rem] border border-white/10 bg-text/80 p-5'
                                    >
                                        <div className='mb-5 flex items-center justify-between'>
                                            <div>
                                                <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>
                                                    Pipeline
                                                </p>
                                                <h3 className='mt-2 text-lg font-semibold text-white'>Acompanhamento visual</h3>
                                            </div>
                                            <BrainCircuit className='h-5 w-5 text-purple' />
                                        </div>

                                        <div className='space-y-4'>
                                            <div className='h-2 rounded-full bg-white/5'>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '84%' }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                                                    className='h-2 rounded-full bg-gradient-to-r from-purple to-blue'
                                                />
                                            </div>
                                            <div className='grid grid-cols-3 gap-2 text-center'>
                                                {[
                                                    ['Leads', '128'],
                                                    ['Qualificados', '76'],
                                                    ['Fechados', '24'],
                                                ].map(([label, value]) => (
                                                    <div key={label} className='rounded-2xl border border-white/8 bg-white/[0.04] px-1 py-4'>
                                                        <p className='text-[10px] uppercase tracking-wider text-slate-400 truncate px-1'>{label}</p>
                                                        <p className='mt-2 text-xl font-semibold text-white'>{value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.article>

                                    <motion.article
                                        whileHover={{ y: -4 }}
                                        className='rounded-[1.5rem] border border-white/10 bg-text/80 p-5'
                                    >
                                        <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Áreas de foco</p>
                                        <div className='mt-4 space-y-3'>
                                            {['Gestão de clientes', 'Relatórios de vendas', 'Produtividade da equipe', 'Monitoramento estratégico'].map((item) => (
                                                <motion.div
                                                    key={item}
                                                    whileHover={{ x: 4 }}
                                                    className='flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-200'
                                                >
                                                    <span className='h-2.5 w-2.5 rounded-full bg-blue-light shadow-{0_0_12px_rgba(129,202,231,0.8)]' />
                                                    {item}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.article>
                                </div>

                                <motion.article
                                    whileHover={{ y: -4 }}
                                    className='rounded-[1.5rem] border border-white/10 bg-text/80 p-5'
                                >
                                    <div className='mb-5 flex items-center justify-between gap-4'>
                                        <div>
                                            <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Destaques</p>
                                            <h3 className='mt-2 text-lg font-semibold text-white'>Projetado para clareza e ação.</h3>
                                        </div>
                                        <LinkIcon className='h-5 w-5 text-purple' />
                                    </div>

                                    <div className='grid gap-4 md:grid-cols-3'>
                                        {featureHighlights.map(({ title, description, icon: Icon }) => (
                                            <motion.div
                                                key={title}
                                                whileHover={{ y: -6, scale: 1.01 }}
                                                className='rounded-[1.4rem] border border-white/8 bg-white[0.04] p-4'
                                            >
                                                <div className='mb-4 inline-flex rounded-2xl border border-purple/20 bg-purple-10 p-3 text-purple'>
                                                    <Icon className='h-5 w-5' />
                                                </div>

                                                <h4 className='text-base font-semibold text-white'>{title}</h4>
                                                <p className='mt-2 text-sm leading-7 text-slate-300'>{description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.article>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className='relative mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 lg:px-16 lg:pb-24'>
                <div className='grid gap-8 lg:grid-cols-[0.9fr_1-1fr]'>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className='space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-8 backfrop-blur-xl'
                    >
                        <SectionBadge>Tecnologias</SectionBadge>
                        <div className='space-y-4'>
                            <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
                                Uma stack escolhida para entregar desempenho, facilidade de manutenção e crescimento.
                            </h2>
                            <p className='text-base leading-8 text-slate-300'>
                                O projeto é uma junção de frontend moderno, backend modular, documentação e ferramentas de colaboração para construir uma experiência de CRM mais sólida e preparada para evoluir.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className='grid gap-5'
                    >
                        {stackCategories.map(({ title, items, icon: Icon }, index) => (
                            <motion.article
                                key={title}
                                custom={index * 0.08}
                                variants={fadeUp}
                                whileHover={{ y: -6 }}
                                className='rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6 backdrop-blur-xl'
                            >
                                <div className='mb-5 flex items-center gap-4'>
                                    <div className='inline-flex rounded-2xl border border-blue-light/20 bg-blue-light/10 p-3 text-blue-light'>
                                        <Icon className='h-5 w-5' />
                                    </div>
                                    <h3 className='text-xl font-semibold text-white'>{title}</h3>
                                </div>

                                <div className='flex flex-wrap gap-3'>
                                    {items.map((item) => (
                                        <motion.span
                                            key={item}
                                            whileHover={{ scale: 1.0 }}
                                            className='rounded-full border border-white/10 bg-text px-4 py-2 text-sm text-slate-200 shadow-[inset_0_0_0_1px_rgba(255,,255,0.03)]'
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>
        </PageShell>
    );
}