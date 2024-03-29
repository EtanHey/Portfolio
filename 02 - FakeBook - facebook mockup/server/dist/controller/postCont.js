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
exports.deletePost = exports.searchPosts = exports.createNewPost = exports.getOthersPostsList = exports.getPostsList = void 0;
const postModel_1 = __importDefault(require("../model/postModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const secret = process.env.JWT_SECRET;
const getPostsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rest = req.cookies["currentUserInfo"];
        const userInfo = jwt_simple_1.default.decode(rest, secret);
        const userId = userInfo.loginData.result._id;
        if (userId) {
            let currentUsersPostsList = yield postModel_1.default.find({ ownerId: userId });
            res.send(currentUsersPostsList);
            // const decoded = jwt.decode(userId, secret)
            // const {userId, role} = decoded;
        }
        else {
            throw new Error("no userId yet");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPostsList = getPostsList;
const getOthersPostsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { profileId } = data;
        const rest = req.cookies["currentUserInfo"];
        const userInfo = jwt_simple_1.default.decode(rest, secret);
        const userId = userInfo.loginData.result._id;
        if (userId) {
            let otherUsersPostsList = yield postModel_1.default.find({ ownerId: profileId });
            res.send(otherUsersPostsList);
            // const decoded = jwt.decode(userId, secret)
            // const {userId, role} = decoded;
        }
        else {
            throw new Error("no userId yet");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOthersPostsList = getOthersPostsList;
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rest = req.cookies["currentUserInfo"];
        const cookies = jwt_simple_1.default.decode(rest, secret);
        const newPostInfo = req.body;
        const newPostOwnerInfo = jwt_simple_1.default.decode(req.cookies["currentUserInfo"], secret)
            .loginData.result;
        const { firstName, lastName } = newPostOwnerInfo;
        const { ownerId, content, time } = newPostInfo;
        if (!ownerId || !content || !time || !firstName || !lastName)
            throw new Error(`missing something in createNewPost -server side (postCont)`);
        const newPost = new postModel_1.default({
            ownerId,
            content,
            time,
            ownerFirstName: firstName,
            ownerLastName: lastName,
        });
        yield newPost.save();
        res.send({ newPost });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createNewPost = createNewPost;
const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.body;
        if (!searchTerm)
            throw new Error(`Search term not found in searchPosts -postCont.ts`);
        const postSearchList = yield postModel_1.default.find({ ownerFirstName: searchTerm } || {
            ownerLastName: searchTerm,
        } || { content: searchTerm } || {
            time: searchTerm,
        }).collation({
            locale: "en_US",
            strength: 1,
        });
        const postSearchListIds = postSearchList.map((post) => {
            return post._id;
        });
        res.send(postSearchListIds);
    }
    catch (error) {
        console.log(error.message);
        res.send({ error: error.message });
    }
});
exports.searchPosts = searchPosts;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.body._id;
        const { deletedCount } = yield postModel_1.default.deleteOne({ _id: postId });
        if (deletedCount === 1) {
            res.send({ ok: true });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=postCont.js.map