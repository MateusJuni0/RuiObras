const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(/href=\{item === "Portfólio" \? "\/portfolio" : item === "Garantias" \? "\/garantias" : \`\/\#\$\{item\.toLowerCase\(\)\}\`\}\`\}\}/g, 'href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : `/#${item.toLowerCase()}`}');

fs.writeFileSync('app/page.tsx', code, 'utf8');
