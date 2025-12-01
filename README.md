# Simple Next.js App

This repository contains a minimal Next.js application and a Dockerfile to build a production image.

Features

- Single page at `/` that fetches from `/api/hello`.

Run locally (development)

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build and run production locally

```bash
npm install
npm run build
npm start
# open http://localhost:3000
```

Build Docker image

```bash
docker build -t simple-nextjs-app .
docker run -p 3000:3000 simple-nextjs-app
# open http://localhost:3000
```
