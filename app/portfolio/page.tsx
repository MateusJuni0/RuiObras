"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const images = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

export default function PortfolioPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="mb-12">
        <Link href="/" className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Início
        </Link>
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 filter drop-shadow-[0_0_30px_rgba(217,119,6,0.3)]">
            Portfólio Premium
          </h1>
          <p className="text-xl text-neutral-400 mt-4 max-w-2xl font-light">
            Explore os nossos projetos mais exclusivos. Uma galeria de excelência, design e precisão.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((img, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <motion.div
              className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 shadow-[0_0_30px_rgba(217,119,6,0.1)] hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Projeto ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-500 backdrop-blur-md shadow-[0_0_20px_rgba(217,119,6,0.5)]">
                  <ZoomIn className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neutral-950/90 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-amber-500/20 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300 shadow-[0_0_30px_rgba(217,119,6,0.2)]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Projeto Ampliado"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-[0_0_100px_rgba(217,119,6,0.3)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
