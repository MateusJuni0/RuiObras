"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Hammer,
  Paintbrush,
  Zap,
  Droplets,
  Ruler,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Sparkles,
  Layers,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";

const GlowOrb = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-[120px] opacity-30 pointer-events-none ${className}`} />
);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    projectDetails: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { placeholder, value } = e.target;
    const keyMap: { [key: string]: string } = {
      "Nome Completo": "fullName",
      "Telefone": "phone",
      "Email": "email",
      "Descreva brevemente o seu projeto...": "projectDetails"
    };
    const key = keyMap[placeholder] || e.target.id;
    if (key) {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const { submitLead } = await import("./actions");
      const result = await submitLead(formData);
      if (result.success) {
        setIsSuccess(true);
        setFormData({ fullName: "", phone: "", email: "", projectDetails: "" });
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden relative selection:bg-amber-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay" />
        <GlowOrb className="w-[600px] h-[600px] bg-amber-600/20 top-[-20%] left-[-10%]" />
        <GlowOrb className="w-[800px] h-[800px] bg-neutral-800/40 bottom-[-20%] right-[-10%]" />
      </div>

      {/* Navigation - Glassmorphism */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-neutral-950/70 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Magnetic>
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-amber-500/20">
                <Hammer className="w-4 h-4 text-neutral-950" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                RUI<span className="text-amber-500">OBRAS</span>
              </span>
            </a>
          </Magnetic>

          <div className="hidden md:flex items-center gap-8">
            {["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item) => (
              <a
                key={item}
                href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : `/#${item.toLowerCase()}`}
                className="text-sm font-medium text-neutral-400 hover:text-amber-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-amber-500 after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
            <Magnetic>
              <Button asChild className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-full px-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:border-white/20">
                <a href="#contactos">Orçamento</a>
              </Button>
            </Magnetic>
          </div>

          <button
            className="md:hidden text-neutral-300 hover:text-white transition-colors p-2"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8"
          >
            {["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={item}
                href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : `/#${item.toLowerCase()}`}
                onClick={() => setMobileMenu(false)}
                className="text-3xl font-heading font-bold text-neutral-300 hover:text-amber-500 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(217,119,6,0.15)]">
              <Sparkles className="w-4 h-4" />
              <span>Remodelações de Alto Padrão em Portugal</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500">
              Construímos o <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 filter drop-shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                Extraordinário.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Elevamos o conceito de remodelação. Design contemporâneo, execução milimétrica e materiais premium para espaços que inspiram.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic>
                <Button asChild className="h-14 px-8 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-full text-lg transition-all duration-300 shadow-[0_10px_40px_rgba(217,119,6,0.4)] hover:shadow-[0_15px_50px_rgba(217,119,6,0.6)] hover:-translate-y-1">
                  <a href="#contactos">Começar Projeto <ArrowRight className="ml-2 w-5 h-5" /></a>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" className="h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white rounded-full text-lg backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <a href="#serviços">Ver Serviços</a>
              </Button>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* Bent Grid / Bento Box - Os Nossos Serviços */}
      <section id="serviços" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative scroll-mt-20">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              A Arte da <span className="text-amber-500">Transformação</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl leading-relaxed">
              Dominamos todas as disciplinas da construção para garantir uma entrega chave-na-mão sem falhas, com qualidade irrefutável.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 md:h-[800px]">
          
          {/* Card 1: Remodelações Integrais (Large) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 0.98, y: -5 }}
            className="md:col-span-2 md:row-span-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl p-8 flex flex-col justify-end relative overflow-hidden group shadow-[0_0_30px_rgba(217,119,6,0.15)] border-white/20 hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] hover:border-white/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-10" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-600/30 via-transparent to-transparent z-10" />
            
            <div className="relative z-20 transform group-hover:translate-y-[-5px] transition-transform duration-500">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(217,119,6,0.2)]">
                <Layers className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">Remodelações Integrais</h3>
              <p className="text-neutral-300 text-lg leading-relaxed max-w-md">
                Do conceito à entrega das chaves. Transformamos apartamentos, moradias e espaços comerciais com mestria e rigor absoluto.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Design & Planeamento */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 0.98, y: -5 }}
            className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(217,119,6,0.15)] border-white/20 hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 to-neutral-950 z-10" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700 z-10" />
            
            <Ruler className="w-10 h-10 text-neutral-200 relative z-20" />
            <div className="relative z-20 mt-6">
              <h3 className="text-2xl font-heading font-bold mb-2 text-white">Design & Arquitetura</h3>
              <p className="text-neutral-400">Projetos 3D e licenciamentos precisos.</p>
            </div>
          </motion.div>

          {/* Card 3: Eletricidade & Canalização (Vertical) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 0.98, y: -5 }}
            className="md:col-span-1 md:row-span-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl p-8 relative overflow-hidden flex flex-col group shadow-[0_0_30px_rgba(217,119,6,0.15)] border-white/20 hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] hover:border-white/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-950/80 to-neutral-950 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent z-10 group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative z-20 flex-1 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Droplets className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="relative z-20 transform group-hover:translate-y-[-5px] transition-transform duration-500">
              <h3 className="text-2xl font-heading font-bold mb-3 text-white">Infraestruturas</h3>
              <p className="text-neutral-400 leading-relaxed">
                Redes elétricas, canalização, pichelaria e climatização com materiais de última geração.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Pintura Premium */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 0.98, y: -5 }}
            className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(217,119,6,0.15)] border-white/20 hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent z-10" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700 z-10" />
            
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 relative z-20">
              <Paintbrush className="w-6 h-6 text-purple-400" />
            </div>
            <div className="relative z-20 mt-6 transform group-hover:translate-y-[-5px] transition-transform duration-500">
              <h3 className="text-2xl font-heading font-bold mb-2 text-white">Acabamentos</h3>
              <p className="text-neutral-300">Pinturas, estuques e microcimento.</p>
            </div>
          </motion.div>

          {/* Card 5: Carpintaria (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 0.98, y: -5 }}
            className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl p-8 relative overflow-hidden flex items-center justify-between group shadow-[0_0_30px_rgba(217,119,6,0.15)] border-white/20 hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] hover:border-white/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-20 max-w-sm transform group-hover:translate-x-2 transition-transform duration-500">
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-white">Carpintaria de Luxo</h3>
              <p className="text-neutral-300">Cozinhas por medida, roupeiros embutidos e soalhos de excelência.</p>
            </div>
            <div className="relative z-20 hidden md:flex items-center justify-center w-20 h-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl transform group-hover:rotate-12 transition-transform duration-500">
              <Hammer className="w-8 h-8 text-amber-400" />
            </div>
          </motion.div>

          {/* Card 6: 15 Anos Experiência (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 0.98, y: -5 }}
            className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/20 backdrop-blur-2xl p-8 relative overflow-hidden flex items-center justify-between group shadow-[0_20px_50px_-12px_rgba(217,119,6,0.1)] hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] hover:border-amber-500/40 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-l from-amber-600/10 to-transparent z-10 group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative z-20 transform group-hover:translate-x-2 transition-transform duration-500">
              <h3 className="text-4xl md:text-5xl font-heading font-black mb-2 text-white flex items-center gap-2">
                15<span className="text-amber-500">+</span> <span className="text-2xl md:text-3xl text-neutral-400 font-bold">Anos</span>
              </h3>
              <p className="text-neutral-300 text-lg font-medium">De Excelência e Confiança no Mercado.</p>
            </div>
            <div className="relative z-20 transform group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-16 h-16 text-amber-500 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* O Processo - Glass Timeline */}
      <section id="processo" className="py-24 relative z-10 scroll-mt-20">
        <div className="absolute inset-0 bg-neutral-900/30 border-y border-white/5 backdrop-blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                Metodologia <span className="text-amber-500">Exata</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                Sem surpresas no orçamento. Sem atrasos na entrega.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Visita e Diagnóstico",
                desc: "Análise rigorosa do espaço e levantamento de necessidades para um orçamento 100% transparente."
              },
              {
                step: "02",
                title: "Projeto e Planeamento",
                desc: "Definição de materiais, cronograma de obra e aprovação do projeto em 3D antes da primeira marretada."
              },
              {
                step: "03",
                title: "Execução e Entrega",
                desc: "Gestão de obra diária com equipas especializadas. Limpeza final e entrega com garantia de 5 anos."
              }
            ].map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                key={i}
              >
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-7xl font-heading font-black text-white/[0.03] absolute top-2 right-4 group-hover:text-white/[0.05] transition-colors">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white relative z-10 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                  <p className="text-neutral-400 relative z-10 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantia & CTA */}
      <section id="contactos" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto z-10 relative scroll-mt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 backdrop-blur-2xl p-8 md:p-16 relative overflow-hidden shadow-[0_0_80px_rgba(217,119,6,0.2)] border border-amber-500/20"
        >
          <GlowOrb className="w-[500px] h-[500px] bg-amber-600/20 top-[-20%] left-[-10%]" />
          <GlowOrb className="w-[500px] h-[500px] bg-amber-600/10 bottom-[-20%] right-[-10%]" />
          
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-[1.1]">
                Pronto para iniciar a sua <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">obra?</span>
              </h2>
              <p className="text-neutral-400 mb-10 text-lg leading-relaxed">
                Deixe os detalhes connosco. Preencha o formulário e a nossa equipa de orçamentação entrará em contacto em menos de 24 horas.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5 text-neutral-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all duration-300 shadow-lg">
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-lg font-medium group-hover:text-white transition-colors">+351 900 000 000</span>
                </div>
                <div className="flex items-center gap-5 text-neutral-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all duration-300 shadow-lg">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-lg font-medium group-hover:text-white transition-colors">geral@ruiobras.pt</span>
                </div>
                <div className="flex items-center gap-5 text-neutral-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all duration-300 shadow-lg">
                    <MapPin className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-lg font-medium group-hover:text-white transition-colors">Lisboa & Margem Sul</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950/50 rounded-[2rem] p-8 border border-white/5 shadow-2xl backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-6 text-white">Solicitar Orçamento</h3>
              <div className="space-y-4">
                <Input 
                  placeholder="Nome Completo" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-neutral-900/50 border-white/10 h-14 text-white placeholder:text-neutral-500 focus-visible:ring-amber-500 focus-visible:border-amber-500 rounded-xl"
                  disabled={isLoading}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Telefone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-neutral-900/50 border-white/10 h-14 text-white placeholder:text-neutral-500 focus-visible:ring-amber-500 focus-visible:border-amber-500 rounded-xl"
                    disabled={isLoading}
                  />
                  <Input 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-neutral-900/50 border-white/10 h-14 text-white placeholder:text-neutral-500 focus-visible:ring-amber-500 focus-visible:border-amber-500 rounded-xl"
                    disabled={isLoading}
                  />
                </div>
                <Textarea 
                  placeholder="Descreva brevemente o seu projeto..." 
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="bg-neutral-900/50 border-white/10 min-h-[140px] text-white placeholder:text-neutral-500 focus-visible:ring-amber-500 focus-visible:border-amber-500 rounded-xl resize-none"
                  disabled={isLoading}
                />
                <Button 
                  onClick={onSubmit}
                  className="w-full h-14 mt-4 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(217,119,6,0.3)] hover:shadow-[0_15px_40px_rgba(217,119,6,0.5)] text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "A enviar..." : "Enviar Pedido"}
                </Button>
                
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center font-medium mt-4">
                      Pedido enviado com sucesso! Entraremos em contacto brevemente.
                    </motion.div>
                  )}
                  {isError && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center font-medium mt-4">
                      Ocorreu um erro ao enviar. Por favor, tente novamente ou use o telefone.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Restructured */}
      <footer className="pt-20 pb-10 bg-neutral-950 border-t border-white/5 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center">
                <Hammer className="w-4 h-4 text-neutral-950" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                RUI<span className="text-amber-500">OBRAS</span>
              </span>
            </a>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Especialistas em remodelações integrais e construção civil. Transformamos espaços com qualidade, rigor e excelência.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-400/50 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-400/50 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-400/50 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#serviços" className="text-neutral-400 hover:text-amber-400 transition-colors">Serviços</a></li>
              <li><a href="#processo" className="text-neutral-400 hover:text-amber-400 transition-colors">Processo de Trabalho</a></li>
              <li><a href="#contactos" className="text-neutral-400 hover:text-amber-400 transition-colors">Pedir Orçamento</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Serviços</h4>
            <ul className="space-y-3">
              <li className="text-neutral-400">Remodelações Integrais</li>
              <li className="text-neutral-400">Design & Arquitetura</li>
              <li className="text-neutral-400">Pichelaria & Eletricidade</li>
              <li className="text-neutral-400">Carpintaria de Luxo</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Contactos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>Lisboa, Portugal <br/> Margem Sul</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span>+351 900 000 000</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <span>geral@ruiobras.pt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} RuiObras - Construção e Remodelações. Todos os direitos reservados.
          </p>
          <p className="text-neutral-500 text-sm flex items-center gap-1">
            Desenvolvido por <a href="#" className="text-white font-medium hover:text-amber-400 transition-colors">CMTecnologia Elite</a>
          </p>
        </div>
      </footer>
    </main>
  );
}