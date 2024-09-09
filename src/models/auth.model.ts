import mongoose, { model } from "mongoose";
import { UserModel } from "../interfaces/auth.interface";

const UserSchema = new mongoose.Schema<UserModel>({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subDepartments: {
    type: [String],
    default:[],
    ref:"dept"
  },
  departmentParts: {
    type: [String],
    default:[],
    ref:"part"
  },
  admin:{
    type:Boolean,
    default:false
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

export default model<UserModel>("dept", UserSchema);
