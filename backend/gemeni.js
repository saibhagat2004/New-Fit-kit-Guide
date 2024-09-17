
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// async function run() {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const targetedArea = ["chest"];
//         const equipmentAvailable = ["dumbell", "barbell"];
//         const difficulty = "Intermediate";
        
//         const prompt = `
//             You are a fitness assistant. Generate an exercise plan in JSON format using these parameters:
//             - Targeted Body Parts: ${JSON.stringify(targetedArea)}
//             - Equipment: ${JSON.stringify(equipmentAvailable)}
//             - Difficulty: ${JSON.stringify(difficulty)}
            
//             Format:
//             {
//                 "warmUp": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes in array", "reps": "Based on difficulty" } ],
//                 "primary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
//                 "secondary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
//                 "coolDown": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ]
//             }
            
//             Provide 1 warm-up, 3 primary, 2 secondary, and 1 cooldown exercise. Only return the JSON and nothing else.
//         `;

//         // Generate content from the model
//         const result = await model.generateContent(prompt);
//         const responseText = await result.response.text();
// 		console.log(responseText)

//         // Trim any unwanted text outside the JSON block
//         const jsonStart = responseText.indexOf("{");
//         const jsonEnd = responseText.lastIndexOf("}") + 1;
        
//         if (jsonStart === -1 || jsonEnd === -1) {
//             throw new Error("No valid JSON found in the response.");
//         }

//         // Extract and parse the JSON
//         const jsonString = responseText.slice(jsonStart, jsonEnd);
//         const exercisePlan = JSON.parse(jsonString);
        
//         // Now you can access the data
//         console.log(exercisePlan);

//         // // Example: Access the warm-up exercise
//         // console.log("Warm-up Exercise:", exercisePlan.warmUp);
// 		console.log(exercisePlan.warmUp[0].common_mistakes[0]);
// 		console.log(exercisePlan.warmUp[0].common_mistakes[1]);
//     } catch (error) {
//         console.error("Error generating exercise plan:", error);
//     }
// }

// run();


// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// async function run() {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const targetedArea = ["chest"];
//         const equipmentAvailable = ["dumbell", "barbell"];
//         const difficulty = "Intermediate";
        
//         const prompt = `
//             You are a fitness assistant. Generate an exercise plan in JSON format using these parameters:
//             - Targeted Body Parts: ${JSON.stringify(targetedArea)}
//             - Equipment: ${JSON.stringify(equipmentAvailable)}
//             - Difficulty: ${JSON.stringify(difficulty)}
            
//             Format:
//             {
//                 "warmUp": [
//                     {
//                         "name": "Exercise name",
//                         "instruction": "Brief instruction",
//                         "common_mistakes": ["Mistake 1", "Mistake 2", "Mistake 3"],
//                         "reps": "Based on difficulty"
//                     }
//                 ],
//                 "primary": [
//                     {
//                         "name": "Exercise name",
//                         "instruction": "Brief instruction",
//                         "common_mistakes": ["Mistake 1", "Mistake 2", "Mistake 3"],
//                         "reps": "Based on difficulty"
//                     },
//                     { "name": "...", "instruction": "...", "common_mistakes": ["..."], "reps": "..." }
//                 ],
//                 "secondary": [
//                     { "name": "...", "instruction": "...", "common_mistakes": ["..."], "reps": "..." }
//                 ],
//                 "coolDown": [
//                     { "name": "Exercise name", "instruction": "Brief instruction", "common_mistakes": ["Mistake 1", "Mistake 2", "Mistake 3"], "reps": "Based on difficulty" }
//                 ]
//             }
            
//             Ensure that the common_mistakes array contains actual mistakes. Do not repeat the warm-up exercise at the end of the response. Only return the JSON.
//         `;

//         // Generate content from the model
//         const result = await model.generateContent(prompt);
//         const responseText = await result.response.text();

//         // Trim any unwanted text outside the JSON block
//         const jsonStart = responseText.indexOf("{");
//         const jsonEnd = responseText.lastIndexOf("}") + 1;
        
//         if (jsonStart === -1 || jsonEnd === -1) {
//             throw new Error("No valid JSON found in the response.");
//         }

//         // Extract and parse the JSON
//         const jsonString = responseText.slice(jsonStart, jsonEnd);
//         const exercisePlan = JSON.parse(jsonString);
        
//         // Now you can access the data
//         console.log(exercisePlan);

//         // Example: Access the warm-up exercise
//         console.log("Warm-up Exercise:", exercisePlan.warmUp);
//     } catch (error) {
//         console.error("Error generating exercise plan:", error);
//     }
// }

// run();
