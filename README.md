# Mi App Web con WebSockets

Esta aplicación combina **frontend estático** (HTML, CSS, JS) y un **backend en Node.js con Express y WebSockets (Socket.IO)**. Está lista para ejecutarse localmente o desplegarse en cualquier servidor que soporte Node.js.

<img width="1914" height="444" alt="image" src="https://github.com/user-attachments/assets/90742dcc-f80d-4f09-bcc3-1143db8be657" />
<img width="1917" height="444" alt="image" src="https://github.com/user-attachments/assets/0bf0ab12-af07-47ad-8907-608fcb0eb76e" />

---

## 📁 Estructura del proyecto

```
/mi-app
│
├─ server.js           # Servidor Express + WebSocket
├─ package.json
└─ public/             # Frontend estático
    ├─ index.html
    ├─ style.css
    └─ script.js
```

* **public/**: Carpeta con todo el frontend.
* **server.js**: Backend que sirve archivos estáticos y maneja WebSockets.

---

## ⚙️ Requisitos

* Node.js v18 o superior
* NPM
* Dependencias del proyecto:

  ```bash
  npm install express socket.io
  ```

---

## 💻 Instalación y ejecución local

1. Clona el repositorio o descarga el proyecto.
2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor:

```bash
node server.js
```

> **Nota:** Si muestra algo raro ejecuta con `npx serve .` para ejecutar la app, ya que solo sirve archivos estáticos y no ejecuta el backend ni WebSockets.
Si aun asi no va saca el index.html de la carpeta public y ejecuta `npx serve .`.

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

   > El puerto puede cambiar según la configuración de tu entorno (usa `process.env.PORT` si es necesario).

---

## 🌐 Despliegue en un servidor

1. **Sube todo el proyecto** al servidor que soporte Node.js.
2. Asegúrate de instalar dependencias con `npm install`.
3. Ejecuta el servidor usando `node server.js` o un gestor de procesos como **PM2**.
4. Si usas un servicio que asigna el puerto automáticamente (Render, Heroku, Railway, Fly.io, etc.):

```js
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
```

5. Abre la URL pública del servidor para acceder al frontend.

---

## 🔗 Conexión WebSocket desde el frontend

En `public/script.js`:

```js
const socket = io(); // Se conecta al mismo host automáticamente

socket.emit('mensaje', 'Hola desde el cliente');

socket.on('respuesta', (data) => {
  console.log('Respuesta del servidor:', data);
});
```

* No necesitas cambiar la URL si el frontend y el backend están en el mismo dominio/host.
* Si el frontend está en otro dominio, cambia a:

```js
const socket = io('https://tu-servidor.com');
```

---

## 📝 Notas importantes

* Asegúrate de que la carpeta **public/** exista y contenga `index.html`.
* Para SPA (rutas internas en frontend), usa:

```js
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

* **No uses `npx serve .` para ejecutar la app**, ya que solo sirve archivos estáticos y no ejecuta el backend ni WebSockets.
* Este proyecto funciona tanto en **local** como en cualquier **servidor Node.js compatible**.

---

## 🚀 Listo para usar

¡Eso es todo! Al abrir la URL de tu servidor deberías ver tu aplicación funcionando con WebSockets activos.
