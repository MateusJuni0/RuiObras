const fs = require('fs');

const filePath = 'app/page.tsx';
let code = fs.readFileSync(filePath, 'utf8');

code = code.replace(/Servios/g, 'Serviços');
code = code.replace(/Portflio/g, 'Portfólio');

fs.writeFileSync(filePath, code, 'utf8');
console.log("Fixed encoding");
