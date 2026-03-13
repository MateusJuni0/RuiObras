const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(/bg-white\/5 backdrop-blur-3xl border border-white\/10 backdrop-blur-2xl/g, 'bg-white/5 border border-white/10 backdrop-blur-3xl');
code = code.replace(/shadow-\[0_30px_80px_-20px_rgba\(0,0,0,0\.7\)\]/g, 'shadow-[0_0_80px_rgba(217,119,6,0.2)] border border-amber-500/20');
code = code.replace(/bg-neutral-900\/40/g, 'bg-white/5 backdrop-blur-3xl');

// Ensure correct strings for menu, because of previous bad encodings
code = code.replace(/\{.*?\.map\(\(item\) => \(\n\s*<a\n\s*key=\{item\}/g, '{["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item) => (\n              <a\n                key={item}');
code = code.replace(/\{.*?\.map\(\(item, i\) => \(\n\s*<motion\.a\n\s*initial/g, '{["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item, i) => (\n              <motion.a\n                initial');
code = code.replace(/href=\{.*?item \=\=\= .*?\}/g, 'href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : `/#${item.toLowerCase()}`}');

// One more check for the links
code = code.replace(/Servios/g, 'Serviços');
code = code.replace(/Portflio/g, 'Portfólio');
code = code.replace(/Oramento/g, 'Orçamento');
code = code.replace(/Extraordinrio/g, 'Extraordinário');
code = code.replace(/Comear/g, 'Começar');

fs.writeFileSync('app/page.tsx', code, 'utf8');
