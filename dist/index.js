"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
console.log("asdasdasdasd");
const app = (0, express_1.default)();
require('dotenv').config({ path: 'src/.env' });
const PORT = process.env.PORT;
app.get("/", (req, res) => {
    res.send("teste");
});
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
});
