import express from "express"
import { getAllDepartmentParts, getPartsByDepartmentId, signin, signup } from "../controllers/auth.controller";
const authRouter = express.Router();


authRouter.post("/signup", signup); 
authRouter.post("/login", signin);
// authRouter.post("/createDepartment/:id", signin);
// authRouter.post("/getDepartmentParts/:id", getPartsByDepartmentId);
// authRouter.post("/getAllDepartmentParts", getAllDepartmentParts);

export default authRouter;