const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// The faulty string: 
// {["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item) => (
//   <a
//     key={item}
//     href={...}
code = code.replace(/\{\["Servi\S*os", "Processo", "Portf\S*lio", "Garantias", "Contactos"\]\.map\(\(item\) => \(\n\s*<a\n\s*key=\{item\}\n\s*href=\{.*?\n\s*className=/g,
`{["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item) => (
              <a
                key={item}
                href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : \`/#\${item.toLowerCase()}\`}
                className=`);

code = code.replace(/\{\["Servi\S*os", "Processo", "Portf\S*lio", "Garantias", "Contactos"\]\.map\(\(item, i\) => \(\n\s*<motion\.a\n\s*initial=\{\{ opacity: 0, y: 20 \}\}\n\s*animate=\{\{ opacity: 1, y: 0 \}\}\n\s*transition=\{\{ delay: i \* 0\.1 \}\}\n\s*key=\{item\}\n\s*href=\{.*?\n\s*onClick=/g,
`{["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={item}
                href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : \`/#\${item.toLowerCase()}\`}
                onClick=`);

// Fallbacks for corrupted symbols
code = code.replace(/Or\S*amento/g, 'Orçamento');
code = code.replace(/Extraordin\S*rio/g, 'Extraordinário');
code = code.replace(/Come\S*ar/g, 'Começar');

fs.writeFileSync('app/page.tsx', code, 'utf8');
