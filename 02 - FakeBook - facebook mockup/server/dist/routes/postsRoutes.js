"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postCont_1 = require("../controller/postCont");
router
    .get('/get-posts-list', postCont_1.getPostsList)
    .post('/get-others-posts-list', postCont_1.getOthersPostsList)
    .post('/create-new-post', postCont_1.createNewPost)
    .post('/delete-post', postCont_1.deletePost)
    .post('/search-posts', postCont_1.searchPosts);
exports.default = router;
//# sourceMappingURL=postsRoutes.js.map