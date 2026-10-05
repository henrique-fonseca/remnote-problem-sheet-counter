import {build} from 'esbuild';
import {mkdir,copyFile,writeFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const name of ['index','counter']){
  await build({entryPoints:[`src/${name}.${name==='counter'?'tsx':'ts'}`],bundle:true,format:'iife',platform:'browser',target:'es2020',outfile:`dist/${name}-sandbox.js`,minify:true,define:{'process.env.NODE_ENV':'"production"'}});
  await copyFile(`dist/${name}-sandbox.js`,`dist/${name}.js`);
}
await copyFile('manifest.json','dist/manifest.json');
await writeFile('dist/index.html',`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:transparent}button,input{font:inherit}progress{display:block}</style></head><body><script>const name=new URLSearchParams(location.search).get('widgetName');if(['index','counter'].includes(name)){const s=document.createElement('script');s.src=name+'-sandbox.js';document.body.append(s);}else document.body.textContent='Widget name missing.';</script></body></html>`);
