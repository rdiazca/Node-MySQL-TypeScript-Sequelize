"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const connection_1 = __importDefault(require("../mysql/connection"));
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.dbConnection();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Conectado');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    listen(callback) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }
    static init(port) {
        return new Server(port);
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
}
exports.default = Server;
//const path = require('path');
//const app = express();
// const publicPath = path.resolve(__dirname, '../public');
// const port = process.env.PORT || 3000;
// app.use(express.static(publicPath));
// app.listen(port, (err) => {
//     if(err) throw new Error(err);
//     console.log(`Servidor corriendo en el puerto ${port}`);
// });
