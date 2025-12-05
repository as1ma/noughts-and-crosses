# noughts-and-crosses

# github pages: https://as1ma.github.io/noughts-and-crosses/ 

1. `npm install gh-pages --save-dev`
2. In the package.json file add these lines before "build": "vite build",

```
"predeploy": "npm run build",
"deploy": "gh-pages -d dist",
```

3. In the vite.config.js file, add this line before `plugins: [react()],`

`base: "/YOUR_REPOSITORY_NAME",`

4. In terminal type: `npm run deploy`
