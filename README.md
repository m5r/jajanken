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

Inline small images ({rock,paper,scissors}.png) with base64

```shell script
cat rock.png | base64 | tr -d '\n' > rock.png.b64
```

---

Serve the background as webp instead of png when supported

```shell script
./bin/cwebp ~/app/jajanken/public/static/images/bg.png -o ~/app/jajanken/public/static/images/bg.webp -q 90 -m 6
```