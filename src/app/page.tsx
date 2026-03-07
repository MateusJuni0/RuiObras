// [PROJECT LOG] - MISSÃO CONCLUÍDA - RUI SANTOS CONSTRUÇÃO
// PADRÃO ELITE ALCANÇADO - MARÇO 2026
// AUDITADO POR DANTE: OK
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import {
  PencilRuler,
  Paintbrush,
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
  FileCheck,
  Menu,
  X,
  Layers,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectDetails: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Nome completo é obrigatório.';
    if (!formData.phone.trim()) errors.phone = 'Telefone é obrigatório.';
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido.';
    }
    if (!formData.projectDetails.trim()) errors.projectDetails = 'Descrição do projeto é obrigatória.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // In a real application, you would send formData to a backend
      console.log('Form submitted:', formData);

      setIsSuccess(true);
      setFormData({ // Reset form
        fullName: '',
        phone: '',
        email: '',
        projectDetails: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contactos", href: "#contactos" },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-neutral-950/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="relative group z-50">
            <div className="font-serif text-xl md:text-2xl tracking-widest uppercase text-white font-semibold flex items-center gap-2">
              <span className="w-8 h-8 md:w-10 md:h-10 border border-primary/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-500">
                R
              </span>
              <span>Rui Santos<span className="text-primary ml-2 font-light">Construção</span></span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest">
            {navLinks.map((link, i) => (
              <Magnetic key={i} intensity={0.2}>
                <a href={link.href} className="text-neutral-300 hover:text-white transition-colors uppercase relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-primary hover:after:scale-x-100 after:transition-transform after:origin-left">
                  {link.name}
                </a>
              </Magnetic>
            ))}
            <Magnetic intensity={0.3}>
              <a href="#contactos">
                <Button className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-xs px-6 py-5 hover:bg-white hover:text-black transition-all">
                  Orçamento
                </Button>
              </a>
            </Magnetic>
          </div>

          <button className="md:hidden z-50 text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map((link, i) => (
              <motion.a 
                key={i} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="text-2xl font-serif text-white uppercase tracking-widest hover:text-primary transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a 
              href="#contactos" 
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-8 border border-primary text-primary px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-colors"
            >
              Pedir Orçamento
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden w-full">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000"
            alt="Arquitetura Elite"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center md:items-start text-center md:text-left mt-20">
          <Reveal delay={0.1}>
            <Badge variant="outline" className="border-primary/50 text-primary tracking-widest uppercase px-4 py-1 text-xs mb-8 bg-neutral-950/50 backdrop-blur-md">
              Excelência & Construção Premium
            </Badge>
          </Reveal>
          
          <Reveal delay={0.2} width="100%">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] max-w-4xl">
              A Arte da <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white italic">Transformação</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
              Obras e remodelações residenciais e comerciais de alto padrão em Lisboa e arredores. Elevamos a construção civil à sua forma mais pura.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Magnetic intensity={0.2}>
                <a href="#contactos">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-white hover:text-black text-primary-foreground rounded-none uppercase tracking-widest h-14 px-10 transition-all duration-300">
                    Pedir Orçamento <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </Magnetic>
              <Magnetic intensity={0.2}>
                <a href="#portfolio">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest h-14 px-10 transition-all duration-300 backdrop-blur-sm">
                    Ver Projetos
                  </Button>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="sobre" className="py-32 bg-neutral-950 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal delay={0.1}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-primary"></div>
                  <h2 className="text-primary tracking-widest uppercase text-xs font-semibold">Quem Somos</h2>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">Mestres na<br/>Construção</h3>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-neutral-400 mb-8 font-light leading-relaxed text-lg">
                  Com mais de uma década a transformar espaços, combinamos o rigor técnico com o olhar estético. Desde o licenciamento aos acabamentos de luxo, coordenamos todas as etapas para entregar a sua visão, de forma impecável.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="border-l border-primary/50 pl-6 group">
                    <div className="text-5xl font-serif text-white group-hover:text-primary transition-colors">30+</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest mt-2">Projetos Executados</div>
                  </div>
                  <div className="border-l border-primary/50 pl-6 group">
                    <div className="text-5xl font-serif text-white group-hover:text-primary transition-colors">12+</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest mt-2">Anos de Mestria</div>
                  </div>
                </div>
              </Reveal>
            </div>

            <motion.div 
              className="relative h-[500px] md:h-[700px] w-full mt-10 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                alt="Arquitetura de interiores" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 z-10 relative"
              />
              <div className="absolute -inset-4 border border-primary/20 transform translate-x-4 translate-y-4 -z-0" />
              <div className="absolute -inset-4 border border-white/5 transform -translate-x-4 -translate-y-4 -z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos" className="py-32 bg-neutral-900 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24 flex flex-col items-center">
            <Reveal>
              <h2 className="text-primary tracking-widest uppercase text-xs font-semibold mb-4">A Nossa Especialidade</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-serif text-4xl md:text-6xl text-white">Serviços de Excelência</h3>
            </Reveal>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Projetos & Licenciamento", desc: "Acompanhamento integral desde o desenho técnico à aprovação camarária.", icon: PencilRuler },
              { title: "Ladrilhos & Azulejos", desc: "Aplicação profissional de cerâmica, mármores e porcelanatos de luxo.", icon: Layers },
              { title: "Pladur & Divisórias", desc: "Desenho e execução de tetos falsos, iluminação oculta e divisórias acústicas.", icon: FileCheck },
              { title: "Pinturas & Acabamentos", desc: "Renovação visual completa, texturas especiais e acabamentos imaculados.", icon: Paintbrush },
              { title: "Canalização Avançada", desc: "Sistemas hidráulicos modernos, águas e esgotos totalmente certificados.", icon: Droplets },
              { title: "Eletricidade & Domótica", desc: "Instalações elétricas seguras, quadros técnicos e casas inteligentes.", icon: Zap },
              { title: "Carpintaria à Medida", desc: "Móveis planeados, roupeiros embutidos e acabamentos em madeira pura.", icon: Hammer },
              { title: "Remodelação de Cozinhas", desc: "Design funcional com mobiliário sofisticado e eletrodomésticos integrados.", icon: Utensils },
              { title: "Casas de Banho Spa", desc: "Renovação total com louças premium, bases de duche e luxo absoluto.", icon: Bath },
            ].map((srv, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <Card className="bg-neutral-950/50 backdrop-blur-sm border-white/5 p-8 rounded-none hover:bg-neutral-900 hover:border-primary/50 transition-all duration-500 group h-full">
                  <srv.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" strokeWidth={1} />
                  <h4 className="text-xl font-serif text-white mb-4 group-hover:text-primary transition-colors">{srv.title}</h4>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">{srv.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32 bg-neutral-950">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <Reveal>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-primary"></div>
                  <h2 className="text-primary tracking-widest uppercase text-xs font-semibold">Obras Realizadas</h2>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="font-serif text-4xl md:text-6xl text-white">Nosso Portfólio</h3>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Button variant="link" className="text-primary hover:text-white uppercase tracking-widest p-0 flex items-center gap-2">
                Ver Galeria Completa <ChevronRight className="w-4 h-4" />
              </Button>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80", title: "Cozinha Minimalista" },
              { img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80", title: "Casa de Banho em Mármore" },
              { img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", title: "Sala de Estar Contemporânea" },
              { img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", title: "Fachada Restaurada" },
              { img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80", title: "Cozinha Integrada" },
              { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", title: "Espaço Comercial Premium" },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="relative group overflow-hidden h-[400px] cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h4 className="text-2xl font-serif text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h4>
                  <div className="w-0 h-px bg-primary mt-4 transition-all duration-700 group-hover:w-16"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-32 bg-neutral-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <h3 className="font-serif text-4xl md:text-5xl text-white">O Padrão Elite</h3>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: ShieldCheck, title: "Garantia Total", desc: "Tranquilidade a longo prazo" },
              { icon: CheckCircle2, title: "Qualidade Premium", desc: "Materiais de 1ª linha" },
              { icon: Clock, title: "Rigor no Prazo", desc: "Entregas sem atrasos" },
              { icon: ThumbsUp, title: "Confiança Absoluta", desc: "Centenas de clientes satisfeitos" },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex flex-col items-center group">
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-neutral-950 group-hover:border-primary/50 transition-colors duration-500">
                    <item.icon className="text-primary w-8 h-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                  </div>
                  <h5 className="text-white font-medium text-lg mb-2">{item.title}</h5>
                  <p className="text-neutral-500 text-sm">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <section id="contactos" className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <Reveal>
                <h2 className="text-primary tracking-widest uppercase text-xs font-semibold mb-4">Inicie o seu Projeto</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="font-serif text-4xl md:text-5xl text-white mb-8">Materialize a sua Visão</h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-neutral-400 font-light mb-12 text-lg leading-relaxed max-w-lg">
                  A excelência aguarda. Fale connosco hoje para discutirmos os detalhes da sua remodelação ou construção de raiz.
                </p>
              </Reveal>
              
              <div className="space-y-8">
                <Reveal delay={0.3}>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                      <Phone className="text-primary w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Telefone</div>
                      <span className="text-white tracking-wider text-lg">+351 963 604 042</span>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                      <Mail className="text-primary w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Email</div>
                      <span className="text-white tracking-wider text-lg">rui.santos.construcao@gmail.com</span>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.5}>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                      <MapPin className="text-primary w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Localização</div>
                      <span className="text-white tracking-wider text-lg">Lisboa e Arredores, Portugal</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.3}>
              <Card className="bg-neutral-900 border-white/5 p-8 md:p-12 rounded-none">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-neutral-400">Nome Completo</label>
                      <Input
                        id="fullName"
                        name="fullName"
                        className="bg-neutral-950 border-white/5 rounded-none focus-visible:ring-primary focus-visible:border-primary h-14 text-white placeholder:text-neutral-700"
                        placeholder="O seu nome"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="phone" className="text-xs uppercase tracking-widest text-neutral-400">Telefone</label>
                      <Input
                        id="phone"
                        name="phone"
                        className="bg-neutral-950 border-white/5 rounded-none focus-visible:ring-primary focus-visible:border-primary h-14 text-white placeholder:text-neutral-700"
                        placeholder="+351"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-400">Email</label>
                    <Input
                      id="email"
                      name="email"
                      className="bg-neutral-950 border-white/5 rounded-none focus-visible:ring-primary focus-visible:border-primary h-14 text-white placeholder:text-neutral-700"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="projectDetails" className="text-xs uppercase tracking-widest text-neutral-400">Sobre o Projeto</label>
                    <Textarea
                      id="projectDetails"
                      name="projectDetails"
                      className="bg-neutral-950 border-white/5 rounded-none focus-visible:ring-primary focus-visible:border-primary min-h-[160px] resize-none text-white placeholder:text-neutral-700 p-4"
                      placeholder="Descreva brevemente a sua visão..."
                      value={formData.projectDetails}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {formErrors.projectDetails && <p className="text-red-500 text-xs mt-1">{formErrors.projectDetails}</p>}
                  </div>
                  <Magnetic intensity={0.1}>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-white hover:text-black rounded-none uppercase tracking-widest h-16 text-sm transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? 'A Enviar...' : 'Enviar Pedido de Orçamento'}
                    </Button>
                  </Magnetic>
                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 p-4 bg-green-900/30 text-green-400 rounded-md flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Pedido enviado com sucesso! Entraremos em contacto brevemente.
                      </motion.div>
                    )}
                    {isError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 p-4 bg-red-900/30 text-red-400 rounded-md flex items-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        Ocorreu um erro ao enviar o pedido. Por favor, tente novamente.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-neutral-950 py-12 text-center text-neutral-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-serif text-xl tracking-widest uppercase text-white font-semibold flex items-center gap-2 opacity-50">
            <span className="w-8 h-8 border border-primary/50 flex items-center justify-center text-primary">
              R
            </span>
            <span>Rui Santos</span>
          </div>
          <p className="tracking-widest uppercase text-xs">&copy; {new Date().getFullYear()} Rui Santos Construção. Todos os direitos reservados.</p>
          <div className="text-xs tracking-widest uppercase">
            Desenvolvido por <span className="text-white">CMTecnologia</span>
          </div>
        </div>
      </footer>
    </main>
  );
}