import { ServerResponse } from "http";
/**
 * Send a JSON response.
 * @param res - The HTTP server response.
 * @param data - The data to send as JSON.
 * @param status - The HTTP status code (default: 200).
 */
export function sendJSON(res: ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

/**
 * Send a text response.
 * @param res - The HTTP server response.
 * @param message - The text message to send.
 * @param status - The HTTP status code (default: 200).
 */
export function sendText(res: ServerResponse, message: string, status = 200) {
  res.writeHead(status, { "Content-Type": "text/plain" });
  res.end(message);
}

/**
 * Send a 404 Not Found response.
 * @param res - The HTTP server response.
 */
export function notFound(res: ServerResponse) {
  sendText(res, "Not found", 404);
}

/**
 * Normalize a URL path.
 * @param path - The URL path to normalize.
 * @returns The normalized URL path.
 */
export function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}
