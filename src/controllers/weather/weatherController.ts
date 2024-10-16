import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const weatherController = async (req: Request, res: Response) => {
  const location = req.query.location;

  if (!location) {
    res.status(400).json({ error: "Location parameter is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;

    // Make the request to WeatherAPI
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: apiKey,
          q: location,
        },
      }
    );

    // Send the weather data as a response
    res.status(200).json({
      location: response.data.location.name,
      currentTemp: response.data.current.temp_c,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
