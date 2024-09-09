import express from "express"
import { GetAllSubDepartments, getPartsByDepartmentId } from "../controllers/auth.controller";
import { createNewDepartment, getAllDepartmentNames } from "../controllers/department.controller";
const departmentRouter = express.Router();

departmentRouter.post("/create/:id", createNewDepartment);
departmentRouter.get("/getAllDepartmentNames", getAllDepartmentNames);
departmentRouter.get("/getSubDepartments/:id", GetAllSubDepartments);
departmentRouter.get("/getDepartmentParts/:id", getPartsByDepartmentId);

export default departmentRouter;