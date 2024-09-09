import express from "express"
import { createPart, updatePart } from "../controllers/part.controller";
const partRouter = express.Router();


partRouter.post("/create/:id", createPart);
partRouter.put("/update/:id", updatePart);

export default partRouter;