const fs = require('fs');

const filePath = 'app/page.tsx';
let code = fs.readFileSync(filePath, 'utf8');

const navRegex = /\{\["Serviços", "Processo", "Garantia", "Contactos"\]\.map\(\(item/g;
code = code.replace(navRegex, '{["Serviços", "Processo", "Portfólio", "Garantias", "Contactos"].map((item');

const hrefRegex = /href=\{\`#\$\{item\.toLowerCase\(\)\}\`\}/g;
code = code.replace(hrefRegex, 'href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : `/#${item.toLowerCase()}`}');

fs.writeFileSync(filePath, code);
console.log("Updated navigation links");
