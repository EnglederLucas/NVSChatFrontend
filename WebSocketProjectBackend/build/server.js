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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var repository_1 = require("./repository/repository");
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.repo = new repository_1.Repository();
        console.log('ctortest');
        this.app = express_1.default();
        this.server = http_1.createServer(this.app);
        this.port = 3030;
        this.io = socket_io_1.default(this.server);
        this.listen();
    }
    ChatServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Runing server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            var loggedIn = false;
            socket.on('login', function (login) { return __awaiter(_this, void 0, void 0, function () {
                var res, user, rooms;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            loggedIn = false;
                            return [4 /*yield*/, this.repo.login(login)];
                        case 1:
                            loggedIn = _a.sent();
                            res = { success: false, err: "login failed", user: { id: -1, name: "default", isGroup: false } };
                            if (!loggedIn) return [3 /*break*/, 4];
                            console.log('login with: ' + login.userName);
                            return [4 /*yield*/, this.repo.getUserByName(login.userName)];
                        case 2:
                            user = _a.sent();
                            res = { success: true, err: "", user: { id: user.userId, name: user.userName, isGroup: false } }; //Log in 
                            socket.emit('login', res);
                            return [4 /*yield*/, this.repo.getGroupsByUserId(user.userId)];
                        case 3:
                            rooms = _a.sent();
                            rooms.forEach(function (element) {
                                socket.join(element.groupName); //join groups
                            });
                            socket.join(login.userName); //join room named like userName
                            socket.on('message', function (message) {
                                console.log('message: ' + JSON.stringify(message));
                                _this.repo.insertMessage(message);
                                var rstring = message.receiver.name;
                                socket.to(message.receiver.name).emit('message', message);
                            });
                            socket.on('receivers', function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var receivers;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(JSON.stringify(user));
                                            return [4 /*yield*/, this.repo.getReceiversById(user.id)];
                                        case 1:
                                            receivers = _a.sent();
                                            console.log('sending receivers in receiver call ' + receivers);
                                            socket.emit('receivers', receivers); //send receivers
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            socket.on('allmessages', function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var allmessages;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(JSON.stringify(user));
                                            return [4 /*yield*/, this.repo.getAllMessagesById(user.id)];
                                        case 1:
                                            allmessages = _a.sent();
                                            console.log('sending messages in message call ' + allmessages);
                                            socket.emit('allmessages', allmessages); //send receivers
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [3 /*break*/, 5];
                        case 4:
                            socket.emit('login', res);
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    return ChatServer;
}());
exports.ChatServer = ChatServer;
//# sourceMappingURL=server.js.map