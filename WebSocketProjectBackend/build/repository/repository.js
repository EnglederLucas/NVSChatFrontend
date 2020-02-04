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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mariadb = __importStar(require("mariadb"));
var Repository = /** @class */ (function () {
    function Repository() {
        this.pool = mariadb.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'websocketdb',
            connectionLimit: 5
        });
    }
    Repository.prototype.findAllMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messages = Array();
                        return [4 /*yield*/, this.pool
                                .query("SELECT id, message from message")
                                .then(function (rows) { messages = rows; })
                                .catch(function (err) { console.log('error in findAll'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                messages ? resolve(messages) : reject(messages);
                            })];
                }
            });
        });
    };
    Repository.prototype.findAllUsersNew = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("SELECT userid, username from user")];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_1 = _a.sent();
                        console.log('error in findAll');
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.findUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {};
                        return [4 /*yield*/, this.pool
                                .query("SELECT userid, username FROM user WHERE userid=" + id)
                                .then(function (row) { user = row; })
                                .catch(function (err) { console.log('error in findUserById'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                user ? resolve(user) : reject(user);
                            })];
                }
            });
        });
    };
    Repository.prototype.findGroupById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        group = {};
                        return [4 /*yield*/, this.pool
                                .query("SELECT groupId, groudName FROM user WHERE userid=" + id)
                                .then(function (row) { group = row; })
                                .catch(function (err) { console.log('error in findUserById'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                group ? resolve(group) : reject(group);
                            })];
                }
            });
        });
    };
    Repository.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool
                            .query("SELECT userId, userName from user")];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users.map(function (row) {
                                return { userId: row.userId, userName: row.userName };
                            })];
                }
            });
        });
    };
    Repository.prototype.getUserByName = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            var users, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool
                            .query("SELECT userId, userName from user WHERE username=?", userName)];
                    case 1:
                        users = _a.sent();
                        user = { userId: users[0].userId, userName: users[0].userName };
                        return [2 /*return*/, user];
                }
            });
        });
    };
    Repository.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var users, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool
                            .query("SELECT userId, userName from user WHERE userId=?", id)];
                    case 1:
                        users = _a.sent();
                        user = { userId: users[0].userId, userName: users[0].userName };
                        return [2 /*return*/, user];
                }
            });
        });
    };
    Repository.prototype.getGroupById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var groups, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool
                            .query("SELECT groupId, groupName FROM websocketdb.`group` WHERE groupId=?", id)];
                    case 1:
                        groups = _a.sent();
                        group = { groupId: groups[0].groupId, groupName: groups[0].groupName };
                        return [2 /*return*/, group];
                }
            });
        });
    };
    Repository.prototype.login = function (loginReq) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool
                            .query("SELECT userId, userName from user WHERE username=? and password=?", [loginReq.userName, loginReq.password])];
                    case 1:
                        users = _a.sent();
                        if (users.length != 1)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Repository.prototype.getGroupsByUserId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool
                            .query("SELECT groupName, groupId FROM websocketdb.groupuser gp Natural JOIN websocketdb.group g WHERE gp.userid = ?", id)];
                    case 1:
                        groups = _a.sent();
                        return [2 /*return*/, groups.map(function (row) { return { groupId: row.groupId, groupName: row.groupName }; })];
                }
            });
        });
    };
    Repository.prototype.getReceiversById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var users, groups, receivers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers()];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, this.getGroupsByUserId(id)];
                    case 2:
                        groups = _a.sent();
                        receivers = [];
                        users.forEach(function (user) {
                            receivers.push({ name: user.userName, id: user.userId, isGroup: false });
                        });
                        groups.forEach(function (group) {
                            receivers.push({ name: group.groupName, id: group.groupId, isGroup: true });
                        });
                        return [2 /*return*/, receivers];
                }
            });
        });
    };
    Repository.prototype.getAllMessagesById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var m, remessages, i, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.pool.query("SELECT id,message,sender,receiver,isGroup FROM message WHERE sender=? or receiver=?", [id, id])];
                    case 1:
                        m = _d.sent();
                        remessages = [];
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < m.length)) return [3 /*break*/, 6];
                        _b = (_a = remessages).push;
                        _c = { message: m[i].message, messageId: m[i].id };
                        return [4 /*yield*/, this.getReceiverById(m[i].sender, 0)];
                    case 3:
                        _c.sender = _d.sent();
                        return [4 /*yield*/, this.getReceiverById(m[i].receiver, m[i].isGroup)];
                    case 4:
                        _b.apply(_a, [(_c.receiver = _d.sent(), _c)]);
                        _d.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, remessages];
                }
            });
        });
    };
    Repository.prototype.insertMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var done;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        done = false;
                        return [4 /*yield*/, this.pool
                                .query("INSERT  INTO message VALUE (null,?,?,?,?) ", [message.message, message.sender.id, message.receiver.isGroup ? 1 : 0, message.receiver.id])
                                .then(function () { done = true; })
                                .catch(function (err) {
                                console.log('error in insertUser');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                done ? resolve() : reject();
                            })];
                }
            });
        });
    };
    Repository.prototype.getReceiverById = function (id, isGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var receiver, group, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(isGroup == 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getGroupById(id)];
                    case 1:
                        group = _a.sent();
                        receiver = { name: group.groupName, id: group.groupId, isGroup: true };
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getUserById(id)];
                    case 3:
                        user = _a.sent();
                        receiver = { name: user.userName, id: user.userId, isGroup: false };
                        _a.label = 4;
                    case 4: return [2 /*return*/, receiver];
                }
            });
        });
    };
    Repository.prototype.insertUser = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var done;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        done = false;
                        return [4 /*yield*/, this.pool
                                .query("INSERT  INTO user VALUE (?,?) ", [u.userId, u.userName])
                                .then(function () { done = true; })
                                .catch(function (err) {
                                console.log('error in insertUser');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                done ? resolve() : reject();
                            })];
                }
            });
        });
    };
    Repository.prototype.updateUserById = function (id, u) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {};
                        return [4 /*yield*/, this.pool
                                .query("UPDATE user SET username=? WHERE userid=?", [u.userName, id])
                                .then(function (row) { user = row; })
                                .catch(function (err) { console.log('error in findUserById'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                user ? resolve(user) : reject(user);
                            })];
                }
            });
        });
    };
    Repository.prototype.deleteUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var done;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        done = false;
                        return [4 /*yield*/, this.pool
                                .query("DELETE FROM user WHERE userid=?", [id])
                                .then(function () { done = true; })
                                .catch(function (err) { console.log('error in findById'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                done ? resolve() : reject();
                            })];
                }
            });
        });
    };
    Repository.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var done;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        done = false;
                        return [4 /*yield*/, this.pool
                                .query("DELETE FROM user")
                                .then(function () { done = true; })
                                .catch(function (err) { console.log('error in deleteAll'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                done ? resolve() : reject();
                            })];
                }
            });
        });
    };
    return Repository;
}());
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map