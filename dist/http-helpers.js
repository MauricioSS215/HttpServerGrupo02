"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJSON = sendJSON;
exports.sendText = sendText;
exports.notFound = notFound;
exports.normalizePath = normalizePath;
function sendJSON(res, data, status = 200) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}
function sendText(res, message, status = 200) {
    res.writeHead(status, { "Content-Type": "text/plain" });
    res.end(message);
}
function notFound(res) {
    sendText(res, "Not found", 404);
}
function normalizePath(path) {
    return path.replace(/\/+$/, "") || "/";
}
