const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "client.html");
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Brak client.html");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server });
const clients = new Map();

function sendJson(ws, obj) {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj));
}

wss.on("connection", (ws) => {
  clients.set(ws, { channel: 19, nick: "Kierowca" });
  sendJson(ws, { type: "info", text: "Połączono z serwerem CB." });

  ws.on("message", (message, isBinary) => {
    const sender = clients.get(ws);
    if (!sender) return;

    if (!isBinary) {
      let data;
      try {
        data = JSON.parse(message.toString());
      } catch {
        return;
      }

      if (data.type === "join") {
        sender.channel = Number(data.channel || 19);
        sender.nick = data.nick || "Kierowca";
        sendJson(ws, { type: "info", text: `Jesteś na kanale ${sender.channel}.` });
        return;
      }

      if (data.type === "ping") {
        for (const [client, info] of clients.entries()) {
          if (client !== ws && info.channel === sender.channel) {
            sendJson(client, { type: "info", text: `${sender.nick} zrobił test na kanale ${sender.channel}.` });
          }
        }
        return;
      }

      if (data.type === "audioHeader") return;
    }

    if (isBinary) {
      for (const [client, info] of clients.entries()) {
        if (client !== ws && info.channel === sender.channel && client.readyState === WebSocket.OPEN) {
          client.send(message, { binary: true });
        }
      }
    }
  });

  ws.on("close", () => clients.delete(ws));
});

server.listen(PORT, () => {
  console.log(`CB Radio działa na porcie ${PORT}`);
});
