import Exercise from '../models/exercise.model.js'; // Import the Exercise model
export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find(); // Fetch all exercises from the Exercise collection
        res.status(200).json(exercises);
    } catch (error) {
        console.log("Error in getExercises controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

import { GoogleGenerativeAI } from "@google/generative-ai";

export const FilterExercise = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Destructure values from req.body and ensure they are arrays
    console.log(req.body)
    const { targetedArea, equipmentAvailable, difficulty } = req.body;
    console.log(targetedArea, equipmentAvailable, difficulty)

    // Validate that targetedArea and equipmentAvailable are arrays
    if (!Array.isArray(targetedArea) || !Array.isArray(equipmentAvailable)) {
      return res.status(400).json({ error: "targetedArea and equipmentAvailable should be arrays." });
    }
    const prompt = `
        You are a fitness assistant. Generate an exercise plan in JSON format using these parameters:
        - Targeted Body Parts: ${JSON.stringify(targetedArea)}
        - Equipment: ${JSON.stringify(equipmentAvailable)}
        - Difficulty: ${JSON.stringify(difficulty)}
        

        Format:
        {
            "warmUp": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes in array", "reps": "Based on difficulty" } ],
            "primary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
            "secondary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
            "coolDown": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ]
        }
        
        Provide 1 warm-up, 3 primary, 2 secondary, and 1 cooldown exercise. Only return the JSON and nothing else.
    `;

    // Generate content from the model
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON found in the response.");
    }

    const jsonString = responseText.slice(jsonStart, jsonEnd);
    const exercisePlan = JSON.parse(jsonString);

    // Send the generated exercise plan to the client
    res.status(200).json(exercisePlan);

  } catch (error) {
    console.error("Error generating exercise plan:", error);
    res.status(500).json({ error: "Failed to generate exercise plan." });
  }
};
