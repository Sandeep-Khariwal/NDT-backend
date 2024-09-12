"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = express_1.default.Router();
authRouter.post("/signup", auth_controller_1.signup);
authRouter.post("/login", auth_controller_1.signin);
// authRouter.post("/createDepartment/:id", signin);
// authRouter.post("/getDepartmentParts/:id", getPartsByDepartmentId);
// authRouter.post("/getAllDepartmentParts", getAllDepartmentParts);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map