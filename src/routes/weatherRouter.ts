import { weatherController } from "@/src/controllers/weather/weatherController";
import { Router } from "express";

export const weatherRouter = Router();

weatherRouter.get("/weather", weatherController); // Add Controllers and Sanitize the inputs
