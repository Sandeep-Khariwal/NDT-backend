import mongoose from "mongoose";

export const DataBase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL as string).then(() => {
      console.log("database connected successfully");
    });
  } catch (error) {
    console.log("error while connecting to the database", error);
  }
};
