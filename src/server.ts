import { createServer } from "http";
import { normalizePath, sendJSON, notFound } from "./http-helpers";
import { UserStore } from "./store";

const userStore = new UserStore();

const server = createServer((req, res) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const path = normalizePath(url.pathname);

  if (req.method === "GET" && path === "/usuarios") {
    sendJSON(res, userStore.getUsers());
    return;
  }

  // cualquier otra ruta
  notFound(res);
});

server.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
