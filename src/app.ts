import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import "./database/mongoose";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => res.json("Meet agile API"));
routes(app);

export default app;
