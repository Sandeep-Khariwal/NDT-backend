import { Request, Response } from "express";
import PartService from "../services/part.service";
import AuthService from "../services/auth.service";

export const createPart = async (req: Request, res: Response) => {
  try {
    const part = req.body;
    const {id} = req.params
    const partService = new PartService();
    const departmentSevice = new AuthService();
    const partResponse = await partService.createDepartmentPart(part);
    const partId = partResponse["part"]._id;

    const response = await departmentSevice.AddPartInDepartment(
      id,
      partId
    );

    if (response["status"] === 200) {
      res.status(200).json("Part created");
    } else{
      res.status(500).json("error")
    }
  } catch (error) {
    error = new Error("Something went wrong");
    error["status"] = 500;
    return error;
  }
};
export const updatePart = async (req: Request, res: Response) => {
  try {
    const {status} = req.body;
    const {id} = req.params
    console.log("status : ", status);
    
    const partService = new PartService();
    const response = await partService.updatePart(id,status)
  console.log("response : ", response);
  
    if (response["status"] === 200) {
      res.status(200).json("Part updated");
    } else {
      res.status(500).json(response)
    }
  } catch (error) {
    error = new Error("Something went wrong");
    error["status"] = 500;
    return error;
  }
};
