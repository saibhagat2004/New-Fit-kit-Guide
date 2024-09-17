 //server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
// import openai  from "openai"; 
import bodyParser from 'body-parser';
// import {v2 as cloudinary} from "cloudinary"
import connectMongoDB  from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routers/auth.route.js"
import exerciseRouter from "./routers/exercise.route.js"

dotenv.config(); //use to read .env content
// cloudinary.config(
//     {
//          cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//          api_key:process.env.CLOUDINARY_API_KEY,
//          api_secret: process.env.CLOUDINARY_API_SECRET
//      }
// );

const app = express();
app.use(bodyParser.json());
const PORT=process.env.PORT || 5000
const __dirname =path.resolve()

app.use(express.json({limit:"5mb"}));  //for parse req.body     also make sure limit limit should not me to large as it can be missuse  and can be attack.
app.use(express.urlencoded({extended:true})); //to parse from data(urlencoded)
  
app.use(cookieParser());  // parses cookies attached to the client request object, 
                          //making them accessible via req.cookies. 

app.use("/api/auth",authRoutes);
app.use("/api/exercise",exerciseRouter);

// // OpenAI Configuration
// // const configuration = new Configuration({
// // 	apiKey: process.env.OPENAI_API_KEY, // Use your OpenAI API Key
// //   });
//   const openai = new OpenAIApi(configuration);



  // Route for Exercise Recommendation
  app.post('/api/exercise/recommendation', async (req, res) => {
	const { targetedArea, equipmentAvailable, difficulty } = req.body;
  
	try {
	  // Build the prompt for OpenAI
	  const prompt = `You are a fitness assistant. Generate an exercise plan in JSON format using these parameters:
	  - Targeted Body Parts: ${JSON.stringify(targetedArea)}
	  - Equipment: ${JSON.stringify(equipmentAvailable)}
	  - Difficulty: ${JSON.stringify(difficulty)}
	  
	  Format:
	  {
		"warmUp": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
		"primary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
		"secondary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
		"coolDown": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ]
	  }
	  
	  Provide 1 warm-up, 3 primary, 2 secondary, and 1 cooldown exercise. Only return the JSON.`;
	  
    
	  // Call the OpenAI API
	  const response =  await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		prompt: prompt,
		max_tokens: 200, // Keep it small to minimize token consumption
		temperature: 0.5, // Adjust creativity level
	  });
  
	  const aiResponse = response.data.choices[0].text.trim();
  
	  // Send the AI response back
	  res.status(200).json(JSON.parse(aiResponse));
	} catch (error) {
	  console.error("Error fetching exercise recommendation:", error);
	  res.status(500).json({ error: "Failed to fetch exercise recommendation" });
	}
  });
  
  

 
 if (process.env.NODE_ENV === "production") {         //if we not hit our endpoint run this
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
});


