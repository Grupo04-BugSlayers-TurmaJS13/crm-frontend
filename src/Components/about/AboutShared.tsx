/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import { BadgeCheck } from "lucide-react";
import { motion, type Variants } from "framer-motion";


export const fadeUp: Variants ={
    hidden:{ opacity: 0, y:28},
    visible:(delay: number = 0)=> ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            delay,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export const staggerContainer={
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

export function AuroraBackground(){
    return(
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-12%] top-[10%] h-72 w-72 rounded-full bg-purple/18 blur-3xl sm:h-96 sm:w-96"/>
            <div className="absolute right-[-8%] top-[12%] h-64 w-64 rounded-full bg-blue/16 blur-3xl sm:h-[26rem] sm:w-[26rem]"/>
            <div className="absolute bottom-[-6%] left-[20%] h-52 w-52 rounded-full bg-blue-light/16 blur-3xl sm:h-80 sm:w-80"/>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(121,84,237,0.08),transparent_32%),radial-gradient(circle_at_75%_22%,rgba(70,170,228,0.1),transparent_28%)]"/>
            <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(129,202,231,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(129,202,231,0.12)_1px,transparent_1px)] [background-size:72px_72px]"/>
            
        </div>
    );
}

export function SectionBadge({ children}: {children: ReactNode}){
    return(
        <motion.span
        custom={0.05}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-purple backdrop-blur-md">
            <BadgeCheck className="h-3.5 w-3.5"/>
            {children}
        </motion.span>
    );
};

export function BrandLogo({ className= ''}: {className?: string}){
    return(
        <motion.div
        custom={0.1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className={`inline-flex items-center ${className}`}>
            <img
            src="/logo-crm.png"
            alt="Logo do Conecta Crm"
            className="h-16 w-auto object-contain drop-shadow-[0_0_28px_rgba(129,202,231,0.22)] sm:h-20 lg:h-24"/>
        </motion.div>
    );
};

export function PageShell({children}: {children: ReactNode}){
    return(
        <main className="relative isolate overflow-hidden bg-text text-gray-light">
            <AuroraBackground/>
            {children}
        </main>
    );
}
