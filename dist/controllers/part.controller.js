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
exports.updatePart = exports.createPart = void 0;
const part_service_1 = __importDefault(require("../services/part.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const createPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const part = req.body;
        const { id } = req.params;
        const partService = new part_service_1.default();
        const departmentSevice = new auth_service_1.default();
        const partResponse = yield partService.createDepartmentPart(part);
        const partId = partResponse["part"]._id;
        const response = yield departmentSevice.AddPartInDepartment(id, partId);
        if (response["status"] === 200) {
            res.status(200).json("Part created");
        }
        else {
            res.status(500).json("error");
        }
    }
    catch (error) {
        error = new Error("Something went wrong");
        error["status"] = 500;
        return error;
    }
});
exports.createPart = createPart;
const updatePart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const { id } = req.params;
        console.log("status : ", status);
        const partService = new part_service_1.default();
        const response = yield partService.updatePart(id, status);
        console.log("response : ", response);
        if (response["status"] === 200) {
            res.status(200).json("Part updated");
        }
        else {
            res.status(500).json(response);
        }
    }
    catch (error) {
        error = new Error("Something went wrong");
        error["status"] = 500;
        return error;
    }
});
exports.updatePart = updatePart;
//# sourceMappingURL=part.controller.js.map