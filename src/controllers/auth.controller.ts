import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("login : ",email, password);
  
  const authServiceInstance = new AuthService();
  const response = await authServiceInstance.SignIn(email, password);
  if (response["status"] !== 200) {
    res.status(response["status"]).json({ message: response["message"] });
  } else if (response["status"] === 200) {
    res.status(200).json({ ...response });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const authServiceInstance = new AuthService();

    const response = await authServiceInstance.SignUp(name, email, password);
    if (response["status"] !== 200) {
      res.status(201).json({ message: response["message"] });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);

    res.json(error);
  }
};

export const GetAllSubDepartments = async(req: Request, res: Response) =>{
  // getSubDepartmentsById
  const { id } = req.params;
  const authServiceInstance = new AuthService();

  const response = await authServiceInstance.getSubDepartmentsById(id);

  if (response["status"] === 200) {
    res.status(200).json(response["subDepartments"]);
  } else {
    res.status(400).json(response);
  }
}

export const getPartsByDepartmentId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authServiceInstance = new AuthService();

  const response = await authServiceInstance.getPartsByDepartmentId(id);

  if (response["status"] === 200) {
    res.status(200).json(response["parts"]);
  } else {
    res.status(400).json(response);
  }
};

export const getAllDepartmentParts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authServiceInstance = new AuthService();

  const response = await authServiceInstance.getAllSubDepartmentsById(id);

  if (response["status"] === 200) {
    res.status(200).json(response["subDepartments"]);
  } else {
    res.status(400).json(response);
  }
};
