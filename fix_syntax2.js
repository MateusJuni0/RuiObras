const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// The error shows: `/#${item.toLowerCase()}`} `}` }
// Let's replace the whole block exactly.
code = code.replace(/href=\{item === "Portfólio" \? "\/portfolio" : item === "Garantias" \? "\/garantias" : \`\/\#\$\{item\.toLowerCase\(\)\}\`\}\`\}\}/g, 'href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : `/#${item.toLowerCase()}`}');
code = code.replace(/href=\{item === "Portfólio" \? "\/portfolio" : item === "Garantias" \? "\/garantias" : \`\/\#\$\{item\.toLowerCase\(\)\}\`\}\}\}/g, 'href={item === "Portfólio" ? "/portfolio" : item === "Garantias" ? "/garantias" : `/#${item.toLowerCase()}`}');

// Fallback replace for everything that matches `{item === ... }`} or similar
code = code.replace(/\`\/\#\$\{item\.toLowerCase\(\)\}\`\}\`\}\}/g, '\`/#\${item.toLowerCase()}\`}');

fs.writeFileSync('app/page.tsx', code, 'utf8');
