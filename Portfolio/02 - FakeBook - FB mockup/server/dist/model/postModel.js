"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    ownerId: String,
    content: String,
    time: String,
    ownerFirstName: String,
    ownerLastName: String,
});
const Post = mongoose_1.default.model("posts", PostSchema);
exports.default = Post;
//# sourceMappingURL=postModel.js.map