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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = require("crypto");
const auth_model_1 = __importDefault(require("../models/auth.model"));
const jwtToken_1 = require("../middleware/jwtToken");
class AuthService {
    SignUp(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield auth_model_1.default.findOne({
                    email: email,
                    isDeleted: { $ne: true },
                });
                if (existingUser) {
                    return { status: 500, message: "User already exists" };
                }
                const saltRounds = 10;
                const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
                const user = new auth_model_1.default();
                user._id = `DPRT-${(0, crypto_1.randomUUID)()}`;
                user.email = email;
                user.password = hashedPassword;
                user.name = name;
                yield user.save();
                return { user, status: 200 };
            }
            catch (error) {
                return error;
            }
        });
    }
    SignIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_model_1.default.findOne({
                    email: email,
                });
                if (!user) {
                    return {
                        status: 500,
                        message: "Invalid credentials. Please try again.",
                    };
                }
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    return { status: 500, message: "Invalid email or password" };
                }
                const token = (0, jwtToken_1.generateAccessToken)({ email });
                return { token, user, status: 200 };
            }
            catch (error) {
                error = new Error("Something went wrong");
                error["status"] = 500;
                return error;
            }
        });
    }
    AddPartInDepartment(id, partId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_model_1.default.findByIdAndUpdate(id, {
                    $push: {
                        departmentParts: partId,
                    },
                }, { new: true });
                return { status: 200 };
            }
            catch (error) {
                error = new Error("Something went wrong");
                error["status"] = 500;
                return error;
            }
        });
    }
    getPartsByDepartmentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parts = yield auth_model_1.default.findById(id).populate([
                    {
                        path: "departmentParts",
                    },
                ]);
                console.log("parts are : ", parts);
                return { parts: parts, status: 200 };
            }
            catch (error) {
                return error;
            }
        });
    }
    getSubDepartmentsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("id is : ", id);
            try {
                const subDepartments = yield auth_model_1.default.findById(id).populate([
                    {
                        path: "subDepartments",
                        select: ["_id", "name", "departmentParts"],
                    },
                ]);
                return { subDepartments: subDepartments, status: 200 };
            }
            catch (error) {
                return error;
            }
        });
    }
    getAllSubDepartmentsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subDepartments = yield auth_model_1.default.findById(id).populate([
                    {
                        path: "subDepartments",
                        select: "_id name departmentParts",
                    },
                ]);
                return { subDepartments: subDepartments, status: 200 };
            }
            catch (error) {
                return error;
            }
        });
    }
    addNewDeparmentInChain(id, departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_model_1.default.findByIdAndUpdate(id, {
                    $push: {
                        subDepartments: departmentId,
                    },
                }, { new: true });
                return { status: 200 };
            }
            catch (error) {
                return error;
            }
        });
    }
    getAllDepartmentNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departmentNames = yield auth_model_1.default.find({ admin: { $ne: true } }, { name: 1, _id: 0 });
                return { departmentNames: departmentNames, status: 200 };
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map