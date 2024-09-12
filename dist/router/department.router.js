"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const department_controller_1 = require("../controllers/department.controller");
const departmentRouter = express_1.default.Router();
departmentRouter.post("/create/:id", department_controller_1.createNewDepartment);
departmentRouter.get("/getAllDepartmentNames", department_controller_1.getAllDepartmentNames);
departmentRouter.get("/getSubDepartments/:id", auth_controller_1.GetAllSubDepartments);
departmentRouter.get("/getDepartmentParts/:id", auth_controller_1.getPartsByDepartmentId);
exports.default = departmentRouter;
//# sourceMappingURL=department.router.js.map