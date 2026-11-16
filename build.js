// Membangun Kelinciku menjadi satu berkas index.html yang bisa dibuka langsung atau dipasang di GitHub Pages.
// Jalankan: npm run build
const esbuild = require('esbuild');
const fs = require('fs');

// 1. Gabungkan semua berkas JSX menjadi satu skrip. React dimuat dari CDN sebagai variabel global.
const bundle = esbuild.buildSync({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  format: 'iife',
  write: false,
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  target: 'es2019',
  legalComments: 'none',
});
const js = bundle.outputFiles[0].text;
if (js.includes('</script')) throw new Error('Bundle berisi penutup tag script');

// 2. Baca CSS, lalu salin aturan layar sempit dengan awalan .as-phone
//    supaya tombol "Ponsel" di bilah atas bisa menampilkan tata letak ponsel di layar lebar.
let css = fs.readFileSync('src/styles.css', 'utf8');
const blockOf = (query) => {
  const open = css.indexOf('{', css.indexOf(query));
  let depth = 1;
  let i = open + 1;
  while (depth) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    i++;
  }
  return css.slice(open + 1, i - 1);
};
const phoneCopy = ['@media (max-width:899px)', '@media (max-width:640px)']
  .map((query) => blockOf(query).replace(/([^{}]+)\{([^{}]*)\}/g, (m, sel, decl) =>
    sel.trim().split(',').map((s) => '.as-phone ' + s.trim()).join(',') + '{' + decl + '}'))
  .join('\n');
css += '\n' + phoneCopy + '\n';

// 3. Tulis halaman akhir.
const RESET = ':root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}';
const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>${RESET}</style><title>Kelinciku</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap">
<style>
${css}</style>
</head><body><div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>
${js}</script>
</body></html>
`;
fs.writeFileSync('index.html', html);
console.log('index.html dibuat,', Math.round(html.length / 1024), 'KB');
