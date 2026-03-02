"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  PencilRuler,
  Paintbrush,
  Wrench,
  Zap,
  Droplets,
  Hammer,
  Utensils,
  Bath,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  ThumbsUp,
  FileCheck
} from "lucide-react";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-widest uppercase text-white font-semibold">
            Obras<span className="text-primary ml-2">Oliveira</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#sobre" className="hover:text-primary transition-colors uppercase">Sobre</a>
            <a href="#servicos" className="hover:text-primary transition-colors uppercase">Serviços</a>
            <a href="#portfolio" className="hover:text-primary transition-colors uppercase">Portfólio</a>
            <Button className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-xs px-6 py-5 hover:bg-white hover:text-black transition-all">
              Orçamento
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/5a46f351-c4c1-4786-ba80-9ebfa29075ce.png"
            alt="Hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeIn} className="mb-6">
              <Badge variant="outline" className="border-primary text-primary tracking-widest uppercase px-4 py-1 text-xs">
                Garantia de 5 Anos
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeIn} className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              A Arte da <span className="text-primary italic">Transformação</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Excelência em obras e remodelações residenciais e comerciais em Lisboa e arredores. Elevamos o padrão da construção civil.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-white hover:text-black text-primary-foreground rounded-none uppercase tracking-widest h-14 px-8">
                Pedir Orçamento
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none uppercase tracking-widest h-14 px-8">
                Ver Projetos
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="sobre" className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            >
              <h2 className="text-primary tracking-widest uppercase text-sm font-semibold mb-3">Quem Somos</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Mestres na Construção & Remodelação</h3>
              <p className="text-neutral-400 mb-6 font-light leading-relaxed">
                Mais de uma década a transformar espaços com rigor, criatividade e confiança. Da planta à chave na mão em Lisboa e arredores.
                A Obras Oliveira coordena todas as etapas — desde a elaboração de projetos e licenciamento até acabamentos finais e entrega de imóveis prontos a habitar.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="border-l border-primary pl-4">
                  <div className="text-4xl font-serif text-white">30+</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wide mt-1">Projetos</div>
                </div>
                <div className="border-l border-primary pl-4">
                  <div className="text-4xl font-serif text-white">12+</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wide mt-1">Anos Exp.</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative h-[600px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80" 
                alt="Sobre nós" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border border-primary/30 transform translate-x-4 translate-y-4 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos" className="py-24 bg-neutral-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          >
            <h2 className="text-primary tracking-widest uppercase text-sm font-semibold mb-3">O Que Fazemos</h2>
            <h3 className="font-serif text-4xl text-white">Serviços de Excelência</h3>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { title: "Projetos & Licenciamento", desc: "Desde o desenho técnico até à aprovação das licenças.", icon: PencilRuler },
              { title: "Ladrilhos & Azulejos", desc: "Aplicação profissional de cerâmica e porcelanatos.", icon: Layers },
              { title: "Pladur & Divisórias", desc: "Criação de ambientes com tetos falsos e divisórias.", icon: FileCheck },
              { title: "Pinturas Especiais", desc: "Renovação visual completa com acabamento perfeito.", icon: Paintbrush },
              { title: "Canalização", desc: "Sistemas hidráulicos, águas e esgotos certificados.", icon: Droplets },
              { title: "Eletricidade", desc: "Instalações elétricas modernas e quadros técnicos.", icon: Zap },
              { title: "Carpintaria", desc: "Móveis sob medida e acabamentos em madeira pura.", icon: Hammer },
              { title: "Remodelação de Cozinhas", desc: "Design funcional, mobiliário moderno e sofisticado.", icon: Utensils },
              { title: "Casas de Banho", desc: "Renovação com louças premium e luxo absoluto.", icon: Bath },
            ].map((srv, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <Card className="bg-neutral-950 border-white/5 p-8 rounded-none hover:border-primary/50 transition-colors group">
                  <srv.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                  <h4 className="text-xl font-serif text-white mb-3">{srv.title}</h4>
                  <p className="text-neutral-400 font-light">{srv.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          >
            <div>
              <h2 className="text-primary tracking-widest uppercase text-sm font-semibold mb-3">Obras Realizadas</h2>
              <h3 className="font-serif text-4xl text-white">Nosso Portfólio</h3>
            </div>
            <Button variant="link" className="text-primary hover:text-white mt-4 md:mt-0 uppercase tracking-widest">
              Ver Todos →
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80", title: "Cozinha Moderna Lisboa" },
              { img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80", title: "Casa de Banho Elegante" },
              { img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80", title: "Sala de Estar Premium" },
              { img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", title: "Fachada Restaurada" },
              { img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=80", title: "Cozinha Clássica Porto" },
              { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", title: "Escritório Corporativo" },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="relative group overflow-hidden h-80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div>
                    <h4 className="text-xl font-serif text-white">{item.title}</h4>
                    <div className="w-12 h-px bg-primary mt-3 transition-all duration-500 group-hover:w-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-neutral-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="font-serif text-3xl text-white">O Padrão Oliveira</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: ShieldCheck, title: "Garantia 5 Anos" },
              { icon: CheckCircle2, title: "Equipa Certificada" },
              { icon: Clock, title: "Pontualidade" },
              { icon: ThumbsUp, title: "150+ Referências" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-4 bg-neutral-950">
                  <item.icon className="text-primary w-6 h-6" />
                </div>
                <h5 className="text-white font-medium">{item.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <section id="contactos" className="py-24 bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-primary tracking-widest uppercase text-sm font-semibold mb-3">Contato</h2>
              <h3 className="font-serif text-4xl text-white mb-6">Solicite um Orçamento</h3>
              <p className="text-neutral-400 font-light mb-10">
                A sua visão merece ser construída por especialistas. Fale connosco hoje para discutirmos o seu próximo grande projeto.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="text-primary w-5 h-5" />
                  <span className="text-white tracking-wide">+351 961 227 666</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-primary w-5 h-5" />
                  <span className="text-white tracking-wide">oliveiraobras0@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-primary w-5 h-5" />
                  <span className="text-white tracking-wide">Lisboa e Arredores, Portugal</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-neutral-900 border-white/10 p-8 rounded-none">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-neutral-400">Nome</label>
                      <Input className="bg-neutral-950 border-white/10 rounded-none focus-visible:ring-primary h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-neutral-400">Telefone</label>
                      <Input className="bg-neutral-950 border-white/10 rounded-none focus-visible:ring-primary h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-neutral-400">Email</label>
                    <Input className="bg-neutral-950 border-white/10 rounded-none focus-visible:ring-primary h-12" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-neutral-400">Mensagem / Projeto</label>
                    <Textarea className="bg-neutral-950 border-white/10 rounded-none focus-visible:ring-primary min-h-[120px] resize-none" />
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-white hover:text-black rounded-none uppercase tracking-widest h-14">
                    Enviar Pedido
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-neutral-950 py-8 text-center text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Obras Oliveira. Todos os direitos reservados. Transformação e Qualidade.</p>
      </footer>
    </main>
  );
}

// Temporary icon component since 'Layers' wasn't imported from lucide
function Layers(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  );
}
