import mongoose, { model } from "mongoose";
import { PartInterface } from "../interfaces/part.interface";
import { Status } from "../enums/status.enum";

const PartSchema = new mongoose.Schema<PartInterface>({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  heatNumber: {
    type: String,
    required: true,
    unique:true
  },
  incomingTime: {
    type: String,
    required: true,
  },
  releaseTime: {
    type: String,
  },
  holdTime: {
    type: String,
  },
  incomingDate: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  status: {
    type: String,
    enum: Status,
    default: Status.ACCEPTED,
  },
},{ autoIndex: false });

export default model<PartInterface>("part", PartSchema);
