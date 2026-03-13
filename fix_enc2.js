const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(/\{.*?\.map\(\(item\) => \(\n\s*<a\n\s*key=\{item\}/g, '{["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item) => (\n              <a\n                key={item}');

code = code.replace(/href=\{.*?item \=\=\= .*?\}/g, 'href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : `/#${item.toLowerCase()}`}');

code = code.replace(/\{.*?\.map\(\(item, i\) => \(\n\s*<motion\.a\n\s*initial/g, '{["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item, i) => (\n              <motion.a\n                initial');

fs.writeFileSync('app/page.tsx', code, 'utf8');
