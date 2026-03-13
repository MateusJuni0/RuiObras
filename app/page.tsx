"use client";

import { useEffect, useState, useRef } from "react";
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
  ChevronRight,
  Clock,
  Sparkles,
  Layers
} from "lucide-react";

const GlowOrb = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-[120px] opacity-30 ${className}`} />
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <main className="min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GlowOrb className="w-[600px] h-[600px] bg-amber-600/20 top-[-20%] left-[-10%]" />
        <GlowOrb className="w-[800px] h-[800px] bg-neutral-800/40 bottom-[-20%] right-[-10%]" />
      </div>

      {/* Navigation - Glassmorphism */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-neutral-950/50 backdrop-blur-xl border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Magnetic>
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                <Hammer className="w-4 h-4 text-neutral-950" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                RUI<span className="text-amber-500">OBRAS</span>
              </span>
            </a>
          </Magnetic>

          <div className="hidden md:flex items-center gap-8">
            {["Serviços", "Processo", "Garantia", "Contactos"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-neutral-400 hover:text-amber-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <Magnetic>
              <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-full px-6 transition-all duration-300">
                Orçamento
              </Button>
            </Magnetic>
          </div>

          <button
            className="md:hidden text-neutral-300"
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
            {["Serviços", "Processo", "Garantia", "Contactos"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenu(false)}
                className="text-2xl font-heading text-neutral-300 hover:text-amber-500"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Remodelações de Alto Padrão em Portugal</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500">
              Construímos o <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Extraordinário.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 font-light">
              Elevamos o conceito de remodelação. Design contemporâneo, execução milimétrica e materiais premium para espaços que inspiram.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic>
                <Button className="h-14 px-8 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-full text-lg transition-all duration-300 shadow-[0_0_40px_rgba(217,119,6,0.3)]">
                  Começar Projeto <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Magnetic>
              <Button variant="outline" className="h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full text-lg backdrop-blur-md">
                Ver Portfólio
              </Button>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* Bent Grid / Bento Box - Os Nossos Serviços */}
      <section id="serviços" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              A Arte da <span className="text-amber-500">Transformação</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl">
              Dominamos todas as disciplinas da construção para garantir uma entrega chave-na-mão sem falhas.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:h-[800px]">
          
          {/* Card 1: Remodelações Integrais (Large) */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-10" />
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-600/40 via-transparent to-transparent" />
            
            <div className="relative z-20">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-3xl font-heading font-bold mb-3 text-white">Remodelações Integrais</h3>
              <p className="text-neutral-400 line-clamp-2">
                Do conceito à entrega das chaves. Transformamos apartamentos, moradias e espaços comerciais por completo.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Design & Planeamento */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-1 md:row-span-1 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500" />
            <Ruler className="w-8 h-8 text-neutral-300 mb-4" />
            <h3 className="text-xl font-heading font-bold mb-2 text-white">Design & Arquitetura</h3>
            <p className="text-neutral-500 text-sm">Projetos 3D e licenciamentos.</p>
          </motion.div>

          {/* Card 3: Eletricidade & Canalização (Vertical) */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-1 md:row-span-2 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden flex flex-col group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent z-0" />
            <div className="relative z-10 flex-1">
              <Zap className="w-8 h-8 text-amber-400 mb-4" />
              <Droplets className="w-8 h-8 text-blue-400 mb-4" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-heading font-bold mb-2 text-white">Infraestruturas</h3>
              <p className="text-neutral-500 text-sm">
                Redes elétricas, canalização, pichelaria e climatização com materiais de última geração.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Pintura Premium */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-1 md:row-span-1 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
            <Paintbrush className="w-8 h-8 text-neutral-300 mb-4" />
            <h3 className="text-xl font-heading font-bold mb-2 text-white">Acabamentos</h3>
            <p className="text-neutral-500 text-sm">Pinturas, estuques e microcimento.</p>
          </motion.div>

          {/* Card 5: Carpintaria (Wide) */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-1 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden flex items-center justify-between group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 to-transparent z-0" />
            <div className="relative z-10 max-w-sm">
              <h3 className="text-2xl font-heading font-bold mb-2 text-white">Carpintaria de Luxo</h3>
              <p className="text-neutral-500 text-sm">Cozinhas por medida, roupeiros embutidos e soalhos flutuantes.</p>
            </div>
            <div className="relative z-10 hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Hammer className="w-6 h-6 text-amber-400" />
            </div>
          </motion.div>

          {/* Card 6: 15 Anos Experiência (Wide) */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-1 rounded-3xl bg-neutral-900/40 border border-amber-500/20 backdrop-blur-xl p-8 relative overflow-hidden flex items-center justify-between group"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-amber-600/10 to-transparent z-0" />
            <div className="relative z-10">
              <h3 className="text-4xl font-heading font-black mb-1 text-white flex items-center gap-2">
                15<span className="text-amber-500">+</span> <span className="text-2xl text-neutral-400 font-bold">Anos</span>
              </h3>
              <p className="text-neutral-500 text-sm font-medium">De Excelência e Confiança no Mercado.</p>
            </div>
            <div className="relative z-10">
              <ShieldCheck className="w-12 h-12 text-amber-500 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* O Processo - Glass Timeline */}
      <section id="processo" className="py-24 relative z-10">
        <div className="absolute inset-0 bg-neutral-900/20 border-y border-white/5 backdrop-blur-3xl" />
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
              <Reveal key={i} delay={i * 0.2}>
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                  <div className="text-6xl font-heading font-black text-white/5 absolute top-4 right-4">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{item.title}</h3>
                  <p className="text-neutral-400 relative z-10">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Garantia & CTA */}
      <section id="contactos" className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto z-10 relative">
        <div className="rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-2xl p-8 md:p-16 relative overflow-hidden">
          <GlowOrb className="w-[400px] h-[400px] bg-amber-600/20 top-0 left-0" />
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                Pronto para iniciar a sua <span className="text-amber-500">obra?</span>
              </h2>
              <p className="text-neutral-400 mb-8">
                Deixe os detalhes connosco. Preencha o formulário e a nossa equipa de orçamentação entrará em contacto em menos de 24 horas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <span>+351 900 000 000</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Mail className="w-4 h-4 text-amber-500" />
                  </div>
                  <span>geral@ruiobras.pt</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin className="w-4 h-4 text-amber-500" />
                  </div>
                  <span>Lisboa & Margem Sul</span>
                </div>
              </div>
            </div>

              <div className="space-y-2">
                <Input 
                  name="fullName"
                  placeholder="Nome Completo" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-neutral-950/50 border-white/10 h-12 text-white placeholder:text-neutral-500 focus-visible:ring-amber-500"
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  name="phone"
                  placeholder="Telefone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-neutral-950/50 border-white/10 h-12 text-white placeholder:text-neutral-500 focus-visible:ring-amber-500"
                  disabled={isLoading}
                />
                <Input 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-neutral-950/50 border-white/10 h-12 text-white placeholder:text-neutral-500 focus-visible:ring-amber-500"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Textarea 
                  name="projectDetails"
                  placeholder="Descreva brevemente o seu projeto..." 
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="bg-neutral-950/50 border-white/10 min-h-[120px] text-white placeholder:text-neutral-500 focus-visible:ring-amber-500"
                  disabled={isLoading}
                />
              </div>
              <Button 
                onClick={onSubmit}
                className="w-full h-12 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "A enviar..." : "Solicitar Orçamento"}
              </Button>
              {isSuccess && <p className="text-green-500 text-center text-sm">Pedido enviado com sucesso!</p>}
              {isError && <p className="text-red-500 text-center text-sm">Erro ao enviar pedido. Tente novamente.</p>}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 relative z-10">
        <p className="text-neutral-500 text-sm">
          © {new Date().getFullYear()} RuiObras - Construção e Remodelações. Desenvolvido por <span className="text-white">CMTecnologia Elite</span>.
        </p>
      </footer>
    </main>
  );
}