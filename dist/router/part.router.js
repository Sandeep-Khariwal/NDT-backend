"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const part_controller_1 = require("../controllers/part.controller");
const partRouter = express_1.default.Router();
partRouter.post("/create/:id", part_controller_1.createPart);
partRouter.put("/update/:id", part_controller_1.updatePart);
exports.default = partRouter;
//# sourceMappingURL=part.router.js.map