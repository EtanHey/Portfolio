"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
app.use(cors_1.default());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
    }
});
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});
server.listen("3001", () => {
    console.log("Server running!");
});
