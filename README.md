# Web Videochat (WebRTC + WebSocket)

[Español](#español) · [English](#english)

---

## Español

### Índice

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Cómo funciona](#cómo-funciona)
- [Despliegue](#despliegue)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Problemas frecuentes](#problemas-frecuentes)
- [Licencia](#licencia)

### Descripción

Aplicación de videollamada en el navegador que combina un **frontend estático** (HTML, CSS y JavaScript) con un **backend en Node.js** usando **Express 5** y **WebSockets nativos** mediante la librería `ws`.

El servidor no procesa vídeo ni audio: solo sirve los archivos estáticos y actúa como **intermediario de señalización** para que dos navegadores puedan negociar una conexión **WebRTC** peer-to-peer.

### Características

- **Videollamada peer-to-peer** con WebRTC, sin servidor de medios.
- **Señalización por WebSocket** en el mismo host que sirve la página.
- **Salas**: los mensajes se reenvían solo a los demás miembros de la misma `roomId`.
- **Sin build**: un único `index.html` con el CSS y el JS en línea.
- **Protocolo automático**: usa `wss://` si la página se sirve por HTTPS.
- **Puerto configurable** con la variable `PORT`.

### Tecnologías

| Capa | Tecnología |
|---|---|
| Servidor | Node.js + Express 5 |
| Tiempo real | `ws` (WebSocket nativo) |
| Cliente | HTML5, CSS3, JavaScript |
| Medios | WebRTC (`RTCPeerConnection`) |

### Requisitos

- **Node.js 22.23.4+, 24.22.1+ o 26.12.1+**. El repositorio incluye `.nvmrc` y `.npmrc` con `engine-strict`, así que `npm install` **falla** si usas una versión fuera de ese rango. Node 18 y 20 están fuera de soporte.
- npm.
- Un navegador moderno con soporte de WebRTC (Chrome, Firefox, Edge o Safari).

### Instalación y ejecución

```bash
git clone https://github.com/alberto2005-coder/web_videochat.git
cd web_videochat
npm install
node server.js
```

Abre [http://localhost:3000](http://localhost:3000). El puerto se toma de `process.env.PORT` y vale `3000` por defecto.

> **Importante:** entra siempre por la URL del servidor. Si usas `npx serve .` solo se sirven archivos estáticos: no hay backend ni WebSocket y la videollamada no funciona.

### Cómo funciona

1. Al cargar la página, el cliente abre un WebSocket contra el mismo host:

   ```js
   const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
   const ws = new WebSocket(`${wsProtocol}//${window.location.host}`);
   ws.onopen = () => ws.send(JSON.stringify({ type: 'join', roomId: 'sala-123' }));
   ```

2. El servidor guarda la conexión en la sala indicada y **retransmite** los mensajes `join` y `signal` al resto de participantes de esa sala.
3. Con esos mensajes, los navegadores intercambian la oferta, la respuesta y los candidatos ICE de WebRTC.
4. Una vez establecida la conexión, el vídeo y el audio viajan directamente entre los navegadores.

### Despliegue

1. Sube el proyecto completo a cualquier host que soporte Node.js.
2. Ejecuta `npm install`.
3. Arranca con `node server.js` o con un gestor de procesos como **PM2**.
4. Si la plataforma asigna el puerto automáticamente (Render, Railway, Fly.io, Heroku…), el código ya lo respeta:

   ```js
   const PORT = process.env.PORT || 3000;
   server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
   ```

### Estructura del proyecto

```text
web_videochat/
├── server.js          # Express + servidor WebSocket (señalización)
├── package.json       # Dependencias y rango de Node permitido
├── .nvmrc             # Versión de Node fijada
├── .npmrc             # Activa engine-strict
├── public/
│   └── index.html     # HTML + CSS + JS (WebRTC y WebSocket)
├── LICENSE
└── README.md
```

### Problemas frecuentes

- **La página carga pero no conecta**: estás sirviendo la carpeta con un servidor estático. Usa `node server.js`.
- **`npm install` falla con `engine-strict`**: cambia de versión de Node (`nvm use`) al rango admitido.
- **No se ven ni se oyen los demás**: revisa los permisos de cámara y micrófono del navegador y que la página se sirva por HTTPS (WebRTC lo exige fuera de `localhost`).
- **Rutas internas del frontend con Express 5**: usa un comodín con nombre, `app.get('/*splat', ...)`.

### Licencia

Este proyecto se distribuye bajo la **licencia MIT**. Consulta [LICENSE](LICENSE).

---

## English

### Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Install and run](#install-and-run)
- [How it works](#how-it-works)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

### Overview

A browser video-call app that combines a **static frontend** (HTML, CSS and JavaScript) with a **Node.js backend** built on **Express 5** and **native WebSockets** via the `ws` library.

The server never handles video or audio: it only serves the static files and acts as a **signaling relay** so two browsers can negotiate a peer-to-peer **WebRTC** connection.

### Features

- **Peer-to-peer video calls** over WebRTC, with no media server.
- **WebSocket signaling** on the same host that serves the page.
- **Rooms**: messages are forwarded only to the other members of the same `roomId`.
- **No build step**: a single `index.html` with inline CSS and JS.
- **Automatic protocol**: uses `wss://` when the page is served over HTTPS.
- **Configurable port** through the `PORT` variable.

### Tech stack

| Layer | Technology |
|---|---|
| Server | Node.js + Express 5 |
| Realtime | `ws` (native WebSocket) |
| Client | HTML5, CSS3, JavaScript |
| Media | WebRTC (`RTCPeerConnection`) |

### Requirements

- **Node.js 22.23.4+, 24.22.1+ or 26.12.1+**. The repo ships `.nvmrc` and `.npmrc` with `engine-strict`, so `npm install` **fails** on any other version. Node 18 and 20 are out of support.
- npm.
- A modern browser with WebRTC support (Chrome, Firefox, Edge or Safari).

### Install and run

```bash
git clone https://github.com/alberto2005-coder/web_videochat.git
cd web_videochat
npm install
node server.js
```

Open [http://localhost:3000](http://localhost:3000). The port comes from `process.env.PORT` and defaults to `3000`.

> **Important:** always go through the server URL. `npx serve .` only serves static files: there is no backend and no WebSocket, so the call will not work.

### How it works

1. On load, the client opens a WebSocket against the same host:

   ```js
   const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
   const ws = new WebSocket(`${wsProtocol}//${window.location.host}`);
   ws.onopen = () => ws.send(JSON.stringify({ type: 'join', roomId: 'sala-123' }));
   ```

2. The server keeps the connection in the given room and **relays** `join` and `signal` messages to the other participants of that room.
3. With those messages, browsers exchange the WebRTC offer, answer and ICE candidates.
4. Once connected, video and audio flow directly between browsers.

### Deployment

1. Upload the whole project to any Node.js-capable host.
2. Run `npm install`.
3. Start it with `node server.js` or a process manager such as **PM2**.
4. If the platform assigns the port automatically (Render, Railway, Fly.io, Heroku…), the code already handles it:

   ```js
   const PORT = process.env.PORT || 3000;
   server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

### Project structure

```text
web_videochat/
├── server.js          # Express + WebSocket signaling server
├── package.json       # Dependencies and allowed Node range
├── .nvmrc             # Pinned Node version
├── .npmrc             # Enables engine-strict
├── public/
│   └── index.html     # HTML + CSS + JS (WebRTC and WebSocket)
├── LICENSE
└── README.md
```

### Troubleshooting

- **Page loads but never connects**: you are serving the folder with a static server. Use `node server.js`.
- **`npm install` fails with `engine-strict`**: switch Node (`nvm use`) to a supported version.
- **No video or audio from the other side**: check camera/microphone permissions and make sure the page is served over HTTPS (WebRTC requires it outside `localhost`).
- **Frontend routes with Express 5**: use a named wildcard, `app.get('/*splat', ...)`.

### License

This project is released under the **MIT License**. See [LICENSE](LICENSE).
