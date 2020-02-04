"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(sender, receiver, message, messageId, isGroupMessage) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.messageId = messageId;
        this.isGroupMessage = isGroupMessage;
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=Message.js.map