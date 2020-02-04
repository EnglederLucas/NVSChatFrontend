"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.app = express_1.default();
        this.server = http_1.createServer(this.app);
        this.port = process.env.PORT || ChatServer.PORT;
        this.io = socket_io_1.default(this.server);
    }
    ChatServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('TEST: Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
        });
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    ChatServer.PORT = 8080;
    return ChatServer;
}());
exports.ChatServer = ChatServer;
