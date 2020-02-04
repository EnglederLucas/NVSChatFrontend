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
            database: 'person',
            connectionLimit: 5
        });
    }
    // find all users
    Repository.prototype.findAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users = Array();
                        return [4 /*yield*/, this.pool
                                .query("SELECT user_id, user_name from user")
                                .then(function (rows) { users = rows; })
                                .catch(function (err) { console.log('error in findAll'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                users ? resolve(users) : reject(users);
                            })];
                }
            });
        });
    };
    // find all users - Alternative
    Repository.prototype.findAllUsersNew = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("SELECT user_id, user_name from user")];
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
    // find a user by id (primary key)
    Repository.prototype.findUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {};
                        return [4 /*yield*/, this.pool
                                .query("SELECT user_id, user_name FROM user WHERE user_id=" + id)
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
    // insert a new user
    Repository.prototype.insertUser = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var done;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        done = false;
                        return [4 /*yield*/, this.pool
                                .query("INSERT  INTO user VALUE (?,?) ", [u.user_id, u.user_name])
                                .then(function () { done = true; })
                                .catch(function (err) { console.log('error in insertUser'); })];
                    case 1:
                        _a.sent(); // handle error
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                done ? resolve() : reject();
                            })];
                }
            });
        });
    };
    // update a user by id (primary key)
    Repository.prototype.updateUserById = function (id, u) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {};
                        return [4 /*yield*/, this.pool
                                .query("UPDATE user SET user_name=? WHERE user_id=?", [u.user_name, id])
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
    // delete a user by id (primary key)
    Repository.prototype.deleteUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var done;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        done = false;
                        return [4 /*yield*/, this.pool
                                .query("DELETE FROM user WHERE user_id=?", [id])
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
    // delete all users
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
