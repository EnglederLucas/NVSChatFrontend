"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(sender_id, receiver_id, message, message_id) {
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.message = message;
        this.message_id = message_id;
    }
    return Message;
}());
exports.Message = Message;
