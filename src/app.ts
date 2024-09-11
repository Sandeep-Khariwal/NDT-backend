import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import { connect } from 'mongoose';
import cors from "cors";
import authRouter from './router/auth.router';
import partRouter from './router/part.router';
import departmentRouter from './router/department.router';
import { DataBase } from './database/database';
const app = express();
const port = 8080;

const VERSION = "v1"

app.use(cors());
app.use(cors({
  origin: ['https://ndt-frontend-2frenfh0f-sandeep-khariwals-projects.vercel.app','https://ndt-frontend-2frenfh0f-sandeep-khariwals-projects.vercel.app/']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(`/api/${VERSION}/auth`, authRouter);
app.use(`/api/${VERSION}/part`, partRouter);
app.use(`/api/${VERSION}/department`, departmentRouter);

// connect database
DataBase()

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});