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
exports.getAllDepartmentParts = exports.getPartsByDepartmentId = exports.GetAllSubDepartments = exports.signup = exports.signin = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("login : ", email, password);
    const authServiceInstance = new auth_service_1.default();
    const response = yield authServiceInstance.SignIn(email, password);
    if (response["status"] !== 200) {
        res.status(response["status"]).json({ message: response["message"] });
    }
    else if (response["status"] === 200) {
        res.status(200).json(Object.assign({}, response));
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const authServiceInstance = new auth_service_1.default();
        const response = yield authServiceInstance.SignUp(name, email, password);
        if (response["status"] !== 200) {
            res.status(201).json({ message: response["message"] });
        }
        else {
            res.status(200).json(response);
        }
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.signup = signup;
const GetAllSubDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // getSubDepartmentsById
    const { id } = req.params;
    const authServiceInstance = new auth_service_1.default();
    const response = yield authServiceInstance.getSubDepartmentsById(id);
    if (response["status"] === 200) {
        res.status(200).json(response["subDepartments"]);
    }
    else {
        res.status(400).json(response);
    }
});
exports.GetAllSubDepartments = GetAllSubDepartments;
const getPartsByDepartmentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const authServiceInstance = new auth_service_1.default();
    const response = yield authServiceInstance.getPartsByDepartmentId(id);
    if (response["status"] === 200) {
        res.status(200).json(response["parts"]);
    }
    else {
        res.status(400).json(response);
    }
});
exports.getPartsByDepartmentId = getPartsByDepartmentId;
const getAllDepartmentParts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const authServiceInstance = new auth_service_1.default();
    const response = yield authServiceInstance.getAllSubDepartmentsById(id);
    if (response["status"] === 200) {
        res.status(200).json(response["subDepartments"]);
    }
    else {
        res.status(400).json(response);
    }
});
exports.getAllDepartmentParts = getAllDepartmentParts;
//# sourceMappingURL=auth.controller.js.map