const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace dark shadows with glossy/neon-glow amber shadows
content = content.replace(/shadow-\[0_20px_50px_-12px_rgba\(0,0,0,0\.5\)\]/g, 'shadow-[0_0_30px_rgba(217,119,6,0.15)] border-white/20');
content = content.replace(/hover:shadow-\[0_30px_60px_-15px_rgba\([^)]+\)\]/g, 'hover:shadow-[0_0_50px_rgba(217,119,6,0.5)]');

// Replace some background tones
content = content.replace(/bg-neutral-900\/60/g, 'bg-white/5 backdrop-blur-3xl');

fs.writeFileSync(filePath, content);
console.log('Replaced shadows and backgrounds in page.tsx');
