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
  if (req.method === "POST" && path === "/usuarios") {
    let body = "";
    req.on("data", parte => { //Escucha los fragmentos de datos recibidos y los concatena en body.
      body += parte;
    });
    req.on("end", () => {
      try {
        const newUser = JSON.parse(body);
        const createdUser = userStore.addUser(newUser); //aca se agrega el usuario al store
        sendJSON(res, createdUser, 201);
      } catch (e) {
        res.statusCode = 400;
        res.end("Invalid JSON");
      }
    });
    return;
  }

  if (req.method === "PUT" && path.startsWith("/usuarios/")){ //si el metodo es PUT y la ruta empieza con /usuarios/ e
    const id = Number(url.pathname.split("/")[2]);
    let body = "";
    req.on("data", partePut => { //Escucha los datos recibidos y los concatena en body.
      body += partePut;
    });
    req.on("end", () => {
      try {
        const user = JSON.parse(body);
        const updatedUser = userStore.updateUser(id, user);
        if (updatedUser) {
          sendJSON(res, updatedUser);
        } else {
          sendJSON(res, { error: "Usuario no encontrado" }, 404);
        }
      } catch (err) {
        sendJSON(res, { error: "Datos inválidos" }, 400);
      }
    });
    return;
  }
  if (req.method === "DELETE" && path.startsWith("/usuarios/")) {
  const id = Number(url.pathname.split("/")[2]);
  const deletedUser = userStore.deleteUser(id);
  if (deletedUser) {
    sendJSON(res, { mensaje: `Usuario: ${JSON.stringify(deletedUser)} ha sido eliminado`, usuario: deletedUser });
  } else {
    sendJSON(res, { error: "Usuario no encontrado" }, 404);
  }
  return;
}
  // cualquier otra ruta
  notFound(res);
});

server.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
