import { Status } from "./../enums/status.enum";
import { randomUUID } from "crypto";
import Part from "../models/part.model";
import { PartInterface } from "../interfaces/part.interface";

export default class PartService {
  public async createDepartmentPart(data: {
    partName: string;
    heatNumber: string;
    department: string;
  }) {
    console.log("data : ", data);

    try {
      const existingPart = await Part.findOne({
        heatNumber: data.heatNumber,
      });
      if (existingPart) {
        throw new Error("Part already exists");
      }
      const part = new Part();
      const now = new Date();
      const datePart = now.toISOString().split("T")[0];
      const timePart =  now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      part._id = `PRT-${randomUUID()}`;
      part.name = data.partName;
      part.heatNumber = data.heatNumber;
      part.status = Status.ACCEPTED;
      part.incomingDate = datePart  + " " + timePart;
      part.incomingTime = datePart  + " " + timePart;
      part.department = data.department;
      part.releaseDate = "-";

      const createdPart = await part.save();

      return { part, status: 200 };
    } catch (error) {
      console.log(error);

      return { error: error.message, status: 500 };
    }
  }

  public async updatePart(partId: string, status: string) {
    try {
      let updatedStatus: Status;
      let updateFields: any = {};
      const now = new Date();

      switch (status) {
        case Status.ACCEPTED:
          updatedStatus = Status.ACCEPTED;
  
          const incomingDate1 = now.toISOString().split("T")[0];
          const timePart = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          updateFields.incomingDate = incomingDate1!!  + " " + timePart;
          updateFields.releaseDate = "-"
          break;
        case Status.RELEASE:
          updatedStatus = Status.RELEASE;
          const datePart = now.toISOString().split("T")[0];
          const timePart1 =  now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });

          updateFields.releaseDate = datePart  + " " + timePart1;
          break;
        case Status.HOLD:
        default:
          const datePart1 = now.toISOString().split("T")[0];
          const timePart2: string =  now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          updateFields.partDate = datePart1 + " " + timePart2;
          updatedStatus = Status.HOLD;
          updateFields.releaseTime = "-";
           updateFields.releaseDate = "-"
          break;
      }

      // Add status to the update fields
      updateFields.status = updatedStatus;

      await Part.findByIdAndUpdate(
        partId,
        {
          $set: updateFields,
        },
        { new: true }
      );
      return { status: 200, message: "updated" };
    } catch (error) {
      return { status: 500, error };
    }
  }
}
