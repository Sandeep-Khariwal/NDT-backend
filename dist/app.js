"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./router/auth.router"));
const part_router_1 = __importDefault(require("./router/part.router"));
const department_router_1 = __importDefault(require("./router/department.router"));
const database_1 = require("./database/database");
const app = (0, express_1.default)();
const port = 8080;
const VERSION = "v1";
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: ['https://ndt-frontend.vercel.app/', 'https://ndt-frontend.vercel.app']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(`/api/${VERSION}/auth`, auth_router_1.default);
app.use(`/api/${VERSION}/part`, part_router_1.default);
app.use(`/api/${VERSION}/department`, department_router_1.default);
// connect database
(0, database_1.DataBase)();
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map