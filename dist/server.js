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
    if (req.method === "POST" && path === "/usuarios") {
        let body = "";
        req.on("data", parte => {
            body += parte;
        });
        req.on("end", () => {
            try {
                const newUser = JSON.parse(body);
                const createdUser = userStore.addUser(newUser); //aca se agrega el usuario al store
                (0, http_helpers_1.sendJSON)(res, createdUser, 201);
            }
            catch (e) {
                res.statusCode = 400;
                res.end("Invalid JSON");
            }
        });
        return;
    }
    if (req.method === "PUT" && path.startsWith("/usuarios/")) { //si el metodo es PUT y la ruta empieza con /usuarios/ e
        const id = Number(url.pathname.split("/")[2]);
        let body = "";
        req.on("data", partePut => {
            body += partePut;
        });
        req.on("end", () => {
            try {
                const user = JSON.parse(body);
                const updatedUser = userStore.updateUser(id, user);
                if (updatedUser) {
                    (0, http_helpers_1.sendJSON)(res, updatedUser);
                }
                else {
                    (0, http_helpers_1.sendJSON)(res, { error: "Usuario no encontrado" }, 404);
                }
            }
            catch (err) {
                (0, http_helpers_1.sendJSON)(res, { error: "Datos inválidos" }, 400);
            }
        });
        return;
    }
    if (req.method === "DELETE" && path.startsWith("/usuarios/")) {
        const id = Number(url.pathname.split("/")[2]);
        const deletedUser = userStore.deleteUser(id);
        if (deletedUser) {
            (0, http_helpers_1.sendJSON)(res, { mensaje: `Usuario: ${JSON.stringify(deletedUser)} ha sido eliminado`, usuario: deletedUser });
        }
        else {
            (0, http_helpers_1.sendJSON)(res, { error: "Usuario no encontrado" }, 404);
        }
        return;
    }
    // cualquier otra ruta
    (0, http_helpers_1.notFound)(res);
});
server.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});
