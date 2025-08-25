"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const http_helpers_1 = require("./http-helpers");
const store_1 = require("./store");
const userStore = new store_1.UserStore();
const server = (0, http_1.createServer)((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = (0, http_helpers_1.normalizePath)(url.pathname);
    if (req.method === "GET" && path === "/usuarios") {
        (0, http_helpers_1.sendJSON)(res, userStore.getUsers());
        return;
    }
    // cualquier otra ruta
    (0, http_helpers_1.notFound)(res);
});
server.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});
