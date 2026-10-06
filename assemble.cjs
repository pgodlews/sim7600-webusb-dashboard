/* Copyright (c) 2026 Piotr Godlewski. SPDX-License-Identifier: MIT */
const fs=require('node:fs');
const template=fs.readFileSync(__dirname+'/src/index.template.html','utf8');
const css=fs.readFileSync(__dirname+'/src/style.css','utf8');
const js=fs.readFileSync(__dirname+'/src/app.js','utf8');
fs.writeFileSync(__dirname+'/index.html',template.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+css+'</style>').replace('<script type="module" src="app.js"></script>',()=>'<script type="module">'+js.replace(/<\/script/gi,'<\\/script')+'</script>'));
console.log('Standalone dashboard assembled');
