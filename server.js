const express = require("express");
const http = require("http");
const path = require("path");
const WebSocket = require("ws");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let rooms = {}; // { roomId: [sockets...] }

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);
            const { type, roomId } = data;

            switch (type) {
                case "join":
                    if (!rooms[roomId]) {
                        rooms[roomId] = [];
                    }
                    rooms[roomId].push(ws);
                    ws.roomId = roomId;

                    // Notificar a los demás en la sala
                    rooms[roomId].forEach(client => {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ type: "user-joined" }));
                        }
                    });
                    break;

                case "signal":
                    // Reenviar señal a todos menos al emisor
                    rooms[roomId]?.forEach(client => {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(data));
                        }
                    });
                    break;
            }
        } catch (err) {
            console.error("Error:", err);
        }
    });

    ws.on("close", () => {
        if (ws.roomId && rooms[ws.roomId]) {
            rooms[ws.roomId] = rooms[ws.roomId].filter(client => client !== ws);
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor de señalización en http://localhost:${PORT}`);
});
