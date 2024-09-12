import { bcrypt } from 'bcrypt';

import { randomUUID } from "crypto";
import User from "../models/auth.model";
import { generateAccessToken } from "../middleware/jwtToken";

export default class AuthService {
  public async SignUp(name: string, email: string, password: string) {
    try {
      const existingUser = await User.findOne({
        email: email,
        isDeleted: { $ne: true },
      });
      if (existingUser) {
        return { status: 500, message: "User already exists" };
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new User();
      user._id = `DPRT-${randomUUID()}`;
      user.email = email;
      user.password = hashedPassword;
      user.name = name;
      await user.save();
      return { user, status: 200 };
    } catch (error) {
      return error;
    }
  }

  public async SignIn(email: string, password: string) {
    try {
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return {
          status: 500,
          message: "Invalid credentials. Please try again.",
        };
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return { status: 500, message: "Invalid email or password" };
      }
      const token = generateAccessToken({ email });

      return { token, user, status: 200 };
    } catch (error) {
      error = new Error("Something went wrong");
      error["status"] = 500;
      return error;
    }
  }

  public async AddPartInDepartment(id: string, partId: string) {
    try {
      await User.findByIdAndUpdate(
        id,
        {
          $push: {
            departmentParts: partId,
          },
        },
        { new: true }
      );

      return { status: 200 };
    } catch (error) {
      error = new Error("Something went wrong");
      error["status"] = 500;
      return error;
    }
  }

  public async getPartsByDepartmentId(id: string) {
    try {
      const parts = await User.findById(id).populate([
        {
          path: "departmentParts",
        },
      ]);
  console.log("parts are : ", parts);
  
      return { parts: parts, status: 200 };
    } catch (error) {
      return error;
    }
  }

  public async getSubDepartmentsById(id: string) {
    console.log("id is : ", id);

    try {
      const subDepartments = await User.findById(id).populate([
        {
          path: "subDepartments",
          select: ["_id", "name", "departmentParts"],
        },
      ]);

      return { subDepartments: subDepartments, status: 200 };
    } catch (error) {
      return error;
    }
  }

  public async getAllSubDepartmentsById(id: string) {
    try {
      const subDepartments = await User.findById(id).populate([
        {
          path: "subDepartments",
          select: "_id name departmentParts",
        },
      ]);

      return { subDepartments: subDepartments, status: 200 };
    } catch (error) {
      return error;
    }
  }

  public async addNewDeparmentInChain(id: string, departmentId: string) {
    try {
      await User.findByIdAndUpdate(
        id,
        {
          $push: {
            subDepartments: departmentId,
          },
        },
        { new: true }
      );

      return { status: 200 };
    } catch (error) {
      return error;
    }
  }

  public async getAllDepartmentNames() {
    try {
      const departmentNames = await User.find(
        { admin: { $ne: true } },
        { name: 1, _id: 0 }
      );

      return { departmentNames: departmentNames, status: 200 };
    } catch (error) {
      return error;
    }
  }
}
