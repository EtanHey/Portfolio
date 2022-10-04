"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const MONGODB_URI = process.env.MONGODB_URI;
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
mongoose_1.default
    .connect(`${MONGODB_URI}`)
    .then(() => {
    console.log("connected to Mongoose");
})
    .catch((err) => {
    console.log("Failed to connect to Mongoose:");
    console.log(err.message);
});
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.use("/api/users", userRoutes_1.default);
const postsRoutes_1 = __importDefault(require("./routes/postsRoutes"));
app.use("/api/posts", postsRoutes_1.default);
app.use(express_1.default.static("./client/build"));
app.use("/*", express_1.default.static("./client/build"));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map