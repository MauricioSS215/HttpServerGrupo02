import { ServerResponse } from "http";

export function sendJSON(res: ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

export function sendText(res: ServerResponse, message: string, status = 200) {
  res.writeHead(status, { "Content-Type": "text/plain" });
  res.end(message);
}

export function notFound(res: ServerResponse) {
  sendText(res, "Not found", 404);
}

export function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}
