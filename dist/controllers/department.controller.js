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
exports.getAllDepartmentNames = exports.createNewDepartment = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
const createNewDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const userService = new auth_service_1.default();
        const departResponse = yield userService.SignUp(name, email, password);
        if (departResponse["status"] === 200) {
            const newDepartmentID = departResponse["user"]._id;
            const response = yield userService.addNewDeparmentInChain(id, newDepartmentID);
            res.status(200).json("created");
        }
        else {
            res.status(500).json("Error");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createNewDepartment = createNewDepartment;
const getAllDepartmentNames = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("called get");
    try {
        const userService = new auth_service_1.default();
        const response = yield userService.getAllDepartmentNames();
        if (response["status"] === 200) {
            res.status(200).json(response["departmentNames"]);
        }
        else {
            res.status(500).json("Error");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllDepartmentNames = getAllDepartmentNames;
//# sourceMappingURL=department.controller.js.map