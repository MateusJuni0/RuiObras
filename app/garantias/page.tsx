"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, FileText, Anchor } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

const timelineEvents = [
  {
    icon: <FileText className="w-8 h-8 text-amber-500" />,
    title: "1. Contrato Transparente",
    description: "Sem custos ocultos. Tudo é descriminado e garantido em contrato desde o dia zero."
  },
  {
    icon: <Clock className="w-8 h-8 text-amber-500" />,
    title: "2. Cronograma Blindado",
    description: "Compromisso de prazos com penalização contratual caso não sejam cumpridos."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
    title: "3. Execução Premium",
    description: "Utilizamos apenas materiais com certificação europeia e mão-de-obra ultra-especializada."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-amber-500" />,
    title: "4. Auditoria Final",
    description: "Inspeção rigorosa de qualidade antes da entrega da chave."
  },
  {
    icon: <Anchor className="w-8 h-8 text-amber-500" />,
    title: "5. Garantia 5 Anos+",
    description: "Pós-venda ativo e suporte técnico integral após a conclusão da obra."
  }
];

export default function GarantiasPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10 relative overflow-hidden">
      <div className="mb-16">
        <Link href="/" className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Início
        </Link>
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 filter drop-shadow-[0_0_30px_rgba(217,119,6,0.3)]">
            Garantias Avançadas
          </h1>
          <p className="text-xl text-neutral-400 mt-4 max-w-2xl font-light">
            Segurança total no seu investimento. Conheça o nosso cronograma de garantias blindadas.
          </p>
        </Reveal>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-16">
          {timelineEvents.map((event, idx) => (
            <Reveal key={idx} delay={idx * 0.2}>
              <div className={`relative flex items-center justify-between md:justify-normal group ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                
                <div className="flex-1 hidden md:block" />

                <motion.div
                  className="absolute left-8 -translate-x-1/2 md:left-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-neutral-900 border border-amber-500/30 shadow-[0_0_30px_rgba(217,119,6,0.2)] group-hover:shadow-[0_0_50px_rgba(217,119,6,0.6)] group-hover:border-amber-500 transition-all duration-500 z-10"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {event.icon}
                </motion.div>

                <div className="flex-1 pl-20 md:px-12">
                  <motion.div
                    className="p-8 rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/20 shadow-[0_0_30px_rgba(217,119,6,0.15)] group-hover:shadow-[0_0_50px_rgba(217,119,6,0.4)] group-hover:border-amber-500/50 transition-all duration-500"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-neutral-400">{event.description}</p>
                  </motion.div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
