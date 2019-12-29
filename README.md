# Jajanken

## Why ?

To introduce myself to ML  
Heavily inspired by [victorqribeiro/jokenpo](https://github.com/victorqribeiro/jokenpo/)

## How ?

### Stack

* Typescript
* Next.js
* Preact
* TailwindCSS

### AI

Ported /u/victorqribeiro's code to Typescript

### PWA

SW thanks to next-offline, all assets are cached  

### Optimizations

Inline base64 images

```sh
cat bg.png | base64 | tr -d '\n' > bg.png.b64
```