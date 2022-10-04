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
exports.isUserLoggedIn = exports.searchUsers = exports.loginUser = exports.addUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const secret = process.env.JWT_SECRET;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { firstName, lastName, email, password, gender, birthDate } = req.body;
        if (!firstName || !lastName)
            throw new Error("something missing on addUser - server side");
        const anEmail = yield userModel_1.default.findOne({ email: email }).collation({
            locale: "en_US",
            strength: 1,
        });
        if (anEmail) {
            let registerData = {
                message: `${anEmail.email} is already registered under ${anEmail.username}`,
            };
            res.send({ registerData });
            return;
        }
        if (!anEmail) {
            const newUser = new userModel_1.default({
                firstName,
                lastName,
                email,
                password,
                gender,
                birthDate,
            });
            const result = yield newUser.save();
            let registerData = {
                result: result,
                message: `${email} is now registered, you can proceed to login`,
            };
            res.send({ registerData });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.addUser = addUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = req.body;
        const { username, password } = userData;
        // what should i do so the user can log in with either their username or email?
        // if (username.includes("@")) {
        //   let email = username;
        //   const lookup = await user
        //     .findOne({ email: email })
        //     .collation({ locale: "en_US", strength: 1 });
        // }else{
        const emailLookup = yield userModel_1.default.findOne({ email: username }).collation({
            locale: "en_US",
            strength: 2,
        });
        if (!emailLookup) {
            let loginData = {
                message: `found no user in emailLookup, loginUser -server side (userCont)`,
            };
            res.send({ loginData });
        }
        if (emailLookup) {
            let email = emailLookup.email;
            const verified = yield userModel_1.default.findOne({ email: email, password: password });
            if (!verified) {
                let loginData = {
                    message: `Welcome back ${emailLookup.username}, thats not the password`,
                };
                res.send({ loginData });
            }
            if (verified) {
                //FIXME can add different info types for different needs.
                const verifiedUserPersonalInfo = {
                    firstName: verified.firstName,
                    lastName: verified.lastName,
                    id: verified._id,
                    ok: true,
                };
                const result = verified;
                let loginData = {
                    result: result,
                    verifiedUserPersonalInfo: verifiedUserPersonalInfo,
                    message: "welcome back, get out of this modal and wander around your recent posts",
                };
                const payload = { loginData };
                const encryptedInfo = jwt_simple_1.default.encode(payload, secret);
                res.cookie("currentUserInfo", encryptedInfo, {});
                res.send({ loginData });
                return;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.body;
        const userSearchList = yield userModel_1.default.find({ firstName: searchTerm } || { lastName: searchTerm } || {
            email: searchTerm,
        }).collation({
            locale: "en_US",
            strength: 1,
        });
        const userSearchListIds = userSearchList.map((user) => {
            return user;
        });
        res.send(userSearchListIds);
    }
    catch (error) {
        console.log(error.message);
        res.send({ error: error.message });
    }
});
exports.searchUsers = searchUsers;
const isUserLoggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.cookies.currentUserInfo;
        if (!cookie) {
            res.send({ ok: false });
            return;
        }
        const currentUserInfo = jwt_simple_1.default.decode(cookie, secret).loginData.verifiedUserPersonalInfo;
        const currentUser = yield userModel_1.default.findById(currentUserInfo.id, { password: 0 });
        if (!currentUser) {
            res.send({ ok: false, message: 'no user was found using your cookies' });
            return;
        }
        res.send({ currentUser, ok: true });
    }
    catch (error) {
        console.log(error.message);
        res.send({ error: error.message });
    }
});
exports.isUserLoggedIn = isUserLoggedIn;
//# sourceMappingURL=userCont.js.map