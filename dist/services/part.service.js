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
const status_enum_1 = require("./../enums/status.enum");
const crypto_1 = require("crypto");
const part_model_1 = __importDefault(require("../models/part.model"));
class PartService {
    createDepartmentPart(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("data : ", data);
            try {
                const existingPart = yield part_model_1.default.findOne({
                    heatNumber: data.heatNumber,
                });
                if (existingPart) {
                    throw new Error("Part already exists");
                }
                const part = new part_model_1.default();
                const now = new Date();
                const datePart = now.toISOString().split("T")[0];
                const timePart = now.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });
                part._id = `PRT-${(0, crypto_1.randomUUID)()}`;
                part.name = data.partName;
                part.heatNumber = data.heatNumber;
                part.status = status_enum_1.Status.ACCEPTED;
                part.incomingDate = datePart + " " + timePart;
                part.incomingTime = datePart + " " + timePart;
                part.department = data.department;
                part.releaseDate = "-";
                const createdPart = yield part.save();
                return { part, status: 200 };
            }
            catch (error) {
                console.log(error);
                return { error: error.message, status: 500 };
            }
        });
    }
    updatePart(partId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedStatus;
                let updateFields = {};
                const now = new Date();
                switch (status) {
                    case status_enum_1.Status.ACCEPTED:
                        updatedStatus = status_enum_1.Status.ACCEPTED;
                        const incomingDate1 = now.toISOString().split("T")[0];
                        const timePart = now.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        });
                        updateFields.incomingDate = incomingDate1 + " " + timePart;
                        updateFields.releaseDate = "-";
                        break;
                    case status_enum_1.Status.RELEASE:
                        updatedStatus = status_enum_1.Status.RELEASE;
                        const datePart = now.toISOString().split("T")[0];
                        const timePart1 = now.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        });
                        updateFields.releaseDate = datePart + " " + timePart1;
                        break;
                    case status_enum_1.Status.HOLD:
                    default:
                        const datePart1 = now.toISOString().split("T")[0];
                        const timePart2 = now.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        });
                        updateFields.partDate = datePart1 + " " + timePart2;
                        updatedStatus = status_enum_1.Status.HOLD;
                        updateFields.releaseTime = "-";
                        updateFields.releaseDate = "-";
                        break;
                }
                // Add status to the update fields
                updateFields.status = updatedStatus;
                yield part_model_1.default.findByIdAndUpdate(partId, {
                    $set: updateFields,
                }, { new: true });
                return { status: 200, message: "updated" };
            }
            catch (error) {
                return { status: 500, error };
            }
        });
    }
}
exports.default = PartService;
//# sourceMappingURL=part.service.js.map