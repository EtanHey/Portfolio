"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userCont_1 = require("../controller/userCont");
router
    .post('/add-new-user', userCont_1.addUser)
    .post('/login-user', userCont_1.loginUser)
    .post('/search-users', userCont_1.searchUsers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map