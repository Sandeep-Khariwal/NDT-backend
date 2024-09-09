import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export const createNewDepartment = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params
        const {name,email,password} = req.body
        const userService = new AuthService()

        const departResponse = await userService.SignUp(name,email,password)
        
        if(departResponse["status"] === 200){
            const newDepartmentID = departResponse["user"]._id
            const response = await userService.addNewDeparmentInChain(id,newDepartmentID)
            res.status(200).json("created")
        } else {
            res.status(500).json("Error")
        }

    } catch (error) {
        console.log(error);
        
    }
}

export const getAllDepartmentNames = async(_,res:Response) =>{
    console.log("called get");
    
    try {
        const userService = new AuthService()
        const response = await userService.getAllDepartmentNames()
        if(response["status"] === 200){
            res.status(200).json(response["departmentNames"])
        } else {
            res.status(500).json("Error")
        }
    } catch (error) {
        console.log(error);
    }
}