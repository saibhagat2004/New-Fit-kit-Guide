// import Exercise from '../models/exercise.model.js'; // Import the Exercise model

import ExercisePlan from '../models/exercise.model.js'; // Import the ExercisePlan model

export const getExercisePlan = async (req, res) => {
  const { exercisePlanName } = req.query; // Get the exercise plan name from query params
  console.log(exercisePlanName)
  try {
    // Assuming each document has keys like lowerBodyExercisePlan, fullBodyExercisePlan, etc.
    const exercisePlan = await ExercisePlan.findOne({ [exercisePlanName]: { $exists: true } }); // Search for a plan by the key
    console.log(exercisePlan)
    console.log({ [exercisePlanName]: { $exists: true } });
    console.log( exercisePlan[exercisePlanName])
    if (exercisePlan) {
      console.log(Object.keys(exercisePlan)); // Logs the keys of the exercisePlan object
    }
    console.log(exercisePlan.absExercisePlan); // Directly check for the property

    if (exercisePlan && exercisePlan[exercisePlanName]) {
      // Return the specific exercise plan by key'
      // console.log(exercisePlan[exercisePlanName])
      res.status(200).json(exercisePlan[exercisePlanName]);
    } else {
      res.status(404).json({ message: "Exercise Plan Not Found" });
    }
  } catch (error) {
    console.error("Error in getExercisePlan controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



import { GoogleGenerativeAI } from "@google/generative-ai";

// export const FilterExercise = async (req, res) => {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     // Destructure values from req.body and ensure they are arrays
//     console.log(req.body)
//     const { targetedArea, equipmentAvailable, difficulty, age } = req.body;
//     console.log(targetedArea, equipmentAvailable, difficulty)

//     // Validate that targetedArea and equipmentAvailable are arrays
//     if (!Array.isArray(targetedArea) || !Array.isArray(equipmentAvailable)) {
//       return res.status(400).json({ error: "targetedArea and equipmentAvailable should be arrays." });
//     }
//     const prompt = `
//         You are a fitness assistant. Generate an exercise plan in JSON format using these parameters:
//         - Targeted Body Parts: ${JSON.stringify(targetedArea)}
//         - Equipment: ${JSON.stringify(equipmentAvailable)}
//         - Difficulty: ${JSON.stringify(difficulty)}
//         - Age : ${JSON.stringify(age)}
         
//         Suggest exercises based on the available equipment, including those that require the equipment and those that require no equipment. For users of older age, recommend exercises that are safe and minimize risk of injury due to weak bones.
//         Format:
//         {
//             "warmUp": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes in array", "reps": "Based on difficulty" } ],
//             "primary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
//             "secondary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
//             "coolDown": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ]
//         }
        
//         Provide 1 warm-up, 3 primary, 2 secondary, and 1 cooldown exercise. Only return the JSON and nothing else.
//         **If Equipment: None or No or  empty, ensure that all exercises suggested do not require any equipment.**
        
//     `;

//     // Generate content from the model
//     const result = await model.generateContent(prompt);
//     const responseText = await result.response.text();

//     const jsonStart = responseText.indexOf("{");
//     const jsonEnd = responseText.lastIndexOf("}") + 1;

//     if (jsonStart === -1 || jsonEnd === -1) {
//       throw new Error("No valid JSON found in the response.");
//     }

//     const jsonString = responseText.slice(jsonStart, jsonEnd);
//     const exercisePlan = JSON.parse(jsonString);

//     // Send the generated exercise plan to the client
//     res.status(200).json(exercisePlan);

//   } catch (error) {
//     console.error("Error generating exercise plan:", error);
//     res.status(500).json({ error: "Failed to generate exercise plan." });
//   }
// };

const exerciseImages = {
  "Jumping Jacks": "https://i.gifer.com/DVfS.gif",
  "Squats": "https://media1.tenor.com/m/1NY6qOs30XIAAAAC/goblet-squad.gif",
  "Squat": "https://media1.tenor.com/m/1NY6qOs30XIAAAAC/goblet-squad.gif",
  "Bodyweight Squats": "https://media1.tenor.com/m/1NY6qOs30XIAAAAC/goblet-squad.gif",
  "Push-Ups": "https://i.gifer.com/756z.gif",
  "Push-ups": "https://i.gifer.com/756z.gif",
  "Bent-over Dumbbell Rows": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXJzbWg1eGc1amQ4ZHV4b3ptNjk1a3JzY3pkMHljcmVwZ3V3cWdjNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHM9hzerMdVjYWI/giphy.webp",
  "Lunges": "https://i.gifer.com/RThk.gif",
  "Overhead Press": "https://i.pinimg.com/originals/2e/43/e0/2e43e04410c77c1824e132bc852979fe.gif",
  "Child's Pose":"data:image/jpeg;base64,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",
  "Bodyweight Push-Ups":"https://i.gifer.com/756z.gif",
  "Dumbbell Bench Press":"https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbellbenchpress-1457043820.gif",
  "Dumbbell Chest Press":"https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbellbenchpress-1457043820.gif",
  "Incline Dumbbell Press": "https://cdn.jefit.com/assets/img/exercises/gifs/31.gif",
  "Dumbbell Incline Press": "https://cdn.jefit.com/assets/img/exercises/gifs/31.gif",
  "Dumbbell Incline Bench Press": "https://cdn.jefit.com/assets/img/exercises/gifs/31.gif",
  "Dumbbell Flyes":"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Chest-Fly.gif?resize=600%2C600&ssl=1",
  "Incline Dumbbell Flyes":"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Chest-Fly.gif?resize=600%2C600&ssl=1",
  "Chest Flyes":"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Chest-Fly.gif?resize=600%2C600&ssl=1",
  "Chest Press":"https://i.pinimg.com/originals/f4/72/94/f47294c0af7d4dc0e55b83a6ce56167b.gif",
  "Arm Circles":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlfj9NPkkDEm-aa4_WcM1Y9sJ5Q4Vj2Vbrpg&s",
  "Dumbbell Row":"https://i.pinimg.com/originals/b0/01/2e/b0012e05f4bb0c758ca0ba3f36ce0ae8.gif",
  "Dumbbell Rows":"https://i.pinimg.com/originals/b0/01/2e/b0012e05f4bb0c758ca0ba3f36ce0ae8.gif",
  "Shoulder Press":"https://media.tenor.com/ZR-_3Mxq0gYAAAAM/arnold-press.gif",
  "Chest Stretch":"https://i.pinimg.com/originals/27/ab/05/27ab0500493dcc4ab6fcc7ee3fbc84cb.gif",
  "Chest Stretches":"https://i.pinimg.com/originals/27/ab/05/27ab0500493dcc4ab6fcc7ee3fbc84cb.gif",
  "Static Chest Stretch":"https://i.pinimg.com/originals/27/ab/05/27ab0500493dcc4ab6fcc7ee3fbc84cb.gif",
  "Bird Dog":"https://media.tenor.com/6nO5406JCHIAAAAM/bird-dog.gif",
  "Plank":"data:image/jpeg;base64,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",
  "Bicycle Crunches":"https://media.tenor.com/Jopm0JiwtdsAAAAM/egsersiz.gif",
  "Russian Twists":"https://i.pinimg.com/originals/b2/cc/5d/b2cc5d7320fd54d6e341078b5a2b93fa.gif",
  "Dumbbell Russian Twist":"https://i.pinimg.com/originals/b2/cc/5d/b2cc5d7320fd54d6e341078b5a2b93fa.gif",
  "Side Plank":"data:image/jpeg;base64,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",
  "Leg Raises":"https://media.tenor.com/IDGUQ-6TBpEAAAAM/leg-lifts.gif",
  "Cat-Cow Stretch":"https://media1.giphy.com/media/JdtyfG3ZSE8iOlDs64/giphy.gif?cid=6c09b9529l67bjf1x2dn9op581o7xbwkfj8wq5rw0xurl8yx&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "Cat-Cow":"https://media1.giphy.com/media/JdtyfG3ZSE8iOlDs64/giphy.gif?cid=6c09b9529l67bjf1x2dn9op581o7xbwkfj8wq5rw0xurl8yx&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "Calf Raises":"data:image/jpeg;base64,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",
  "Quad Stretches":"https://cdn.jefit.com/assets/img/exercises/gifs/921.gif",
  "Glute Bridges":"https://images-prod.healthline.com/hlcmsresource/images/topic_centers/Fitness-Exercise/648x364_5_Glute_Bridge_Variations_Press_Through_Toes.gif,",
  "Crunches":"https://media.tenor.com/6rP6fTuJaJcAAAAM/crunch-ab.gif",
  "Dumbbell Squats":"https://fitnessprogramer.com/wp-content/uploads/2023/09/Dumbbell-Squat.gif",
  "Static Stretching":"https://post.healthline.com/wp-content/uploads/2020/09/400x400-Seated_Hamstring_Stretch.gif",
  "Dumbbell Bicep Curls":"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Concentration-curl.gif?resize=600%2C600&ssl=1",
  "Tricep Dips":"https://cdn.shopify.com/s/files/1/0449/8453/3153/files/Bench_Dips.gif?v=1722411995",
  "Dumbbell Lunges":"https://cdn.jefit.com/assets/img/exercises/gifs/136.gif",
  "Dumbbell Lateral Raises":"https://cdn.jefit.com/assets/img/exercises/gifs/32.gif",
  "Dumbbell Push-Ups":"https://gymvisual.com/img/p/2/0/3/0/5/20305.gif",
  "Lateral Raises":"https://cdn.jefit.com/assets/img/exercises/gifs/32.gif",
  "Dumbbell Tricep Extensions":"https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbelloverheadtricepsextension-1456956005.gif?crop=1xw:1xh;center,top&resize=1200:*",
  "Barbell Row":"https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/barbellrow-1457038583.gif",
  "Barbell Rows":"https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/barbellrow-1457038583.gif",
  "Stretching":"https://media2.giphy.com/media/WT4C8L1GaOwbHZkVZ2/giphy.gif?cid=6c09b952416avasu102r266hd5wkujgzmgsgs36wf46fs6m5&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
  "Barbell Bicep Curls":"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/12/Barbell-biceps-curl.gif?resize=600%2C600&ssl=1",
  "V-Ups":"https://hips.hearstapps.com/hmg-prod/images/workouts/2016/08/vupfull-1472154765.gif?",
  "Bicycle Crunches": "https://media.tenor.com/Jopm0JiwtdsAAAAM/egsersiz.gif",
  "Child Pose":"https://www.vinyasayogaashram.com/blog/wp-content/uploads/2023/02/Child-Pose.jpg" ,
  "Fluttter Kicks":"https://i.pinimg.com/originals/26/a7/50/26a750b15b8e6f3b05976b406d52f7b1.gif ",
  "Plank":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyYs6lWr7YZcu0RzN88MDLcXddrQiVENrLyA&s",
};

const enrichExercisePlan = (exercisePlan) => {
  const addImage = (exercises) =>
    exercises.map((exercise) => ({
      ...exercise,
      imageUrl: exerciseImages[exercise.name] || null, // Add image URL or null if not found eg. exerciseImages[Jumping Jacks]-> imgUrl
    }));

  return {
    warmUp: addImage(exercisePlan.warmUp),
    primary: addImage(exercisePlan.primary),
    secondary: addImage(exercisePlan.secondary),
    coolDown: addImage(exercisePlan.coolDown),
  };
};

export const FilterExercise = async (req, res) => {
  try {


    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);  // Initialize the Google Generative AI client using the provided API key from environment variables

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });   // Retrieve the specific generative AI model (in this case, "gemini-pro") to generate content


    // Destructure values from req.body and ensure they are arrays
    const { targetedArea, equipmentAvailable, difficulty, age } = req.body;
    console.log(targetedArea, equipmentAvailable, difficulty)

    // Validate that targetedArea and equipmentAvailable are arrays
    if (!Array.isArray(targetedArea) || !Array.isArray(equipmentAvailable)) {
      return res.status(400).json({ error: "targetedArea and equipmentAvailable should be arrays." });
    }

    const prompt = `
    You are a fitness assistant. Generate an exercise plan in JSON format using these parameters:
    - Targeted Body Parts: ${JSON.stringify(targetedArea)}
    - Available Equipment: ${JSON.stringify(equipmentAvailable)}
    - Difficulty Level: ${JSON.stringify(difficulty)}
    - User's Age: ${JSON.stringify(age)}
     
    Your primary goal is to recommend exercises that are practical for home workouts. Avoid exercises requiring complex gym equipment. Use only the equipment specified by the user.
    Ensure the recommendations are suitable for the user's age and difficulty level:
    - For older users, focus on low-impact exercises to minimize injury risk.
    - For younger users, include a mix of strength, flexibility, and endurance exercises.

    ### IMPORTANT:
    - Use simple, standardized exercise names (e.g., "Push-Ups" instead of "Bodyweight Push-Ups" or "Push-ups"). Avoid variations, synonyms, or alternative names. Use the most commonly recognized name for each exercise to ensure consistency. 

    Format the response as follows:
    {
        "warmUp": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": ["Mistake 1", "Mistake 2", "Mistake 3"], "reps": "Based on difficulty" } ],
        "primary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": ["Mistake 1", "Mistake 2", "Mistake 3"], "reps": "Based on difficulty" } ],
        "secondary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": ["Mistake 1", "Mistake 2", "Mistake 3"], "reps": "Based on difficulty" } ],
        "coolDown": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": ["Mistake 1", "Mistake 2", "Mistake 3"], "reps": "Based on difficulty" } ]
    }

    Recommendations:
    - Include 1 warm-up, 3 primary, 2 secondary, and 1 cooldown exercise.
    - If the available equipment is empty, ensure all exercises require no equipment or use easily accessible household items.
    - Consider user preferences for targeted body parts and difficulty when recommending exercises. 
    - Ensure clear and concise instructions for each exercise.
    
    Return only the JSON output without any additional text or explanation.
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
    const exercisePlanWithImages = enrichExercisePlan(exercisePlan);

    // Send the generated exercise plan to the client
    res.status(200).json(exercisePlanWithImages);

  } catch (error) {
    console.error("Error generating exercise plan:", error);
    res.status(500).json({ error: "Failed to generate exercise plan." });
  }
};




export const getAllExercises = async (req, res) => {
  try {
    // Fetch all documents from the ExercisePlan collection
    const exercisePlans = await ExercisePlan.find({}); 

    if (exercisePlans.length > 0) {
      // Return all exercise plans
      res.status(200).json(exercisePlans);
    } else {
      res.status(404).json({ message: "No Exercise Plans Found" });
    }
  } catch (error) {
    console.error("Error in getAllExercises controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





import UserActivity from '../models/userActivitySchema.model.js';

const storeUserActivity = async (req, res) => {
  try {
    const { id: userId } = req.params; // Extract userId from route params
    const { exercisePlanName, date, count } = req.body;

    // Ensure all fields are provided
    if (!userId || !exercisePlanName || !date || !count) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new UserActivity entry
    const newActivity = new UserActivity({
      userId, // Associate the activity with the user
      exercisePlanName,
      date: new Date(date), // Store as a Date object
      count,
    });

    // Save the activity in the database
    await newActivity.save();

    return res.status(201).json({ message: 'Activity stored successfully' });
  } catch (error) {
    console.error('Error storing activity:', error);
    return res.status(500).json({ error: 'Server error while storing activity' });
  }
};


const getUserActivities = async (req, res) => {
  try {
    const { id: userId } = req.params; // Extract userId from route params

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch activities for the specific user
    // const userActivities = await UserActivity.find({ userId }, { date: 1 }); // Fetch only the `date` field
    
    const userActivities = await UserActivity.find(
      { userId }, 
      { exercisePlanName: 1, date: 1, _id: 0 } // Project exercisePlanName and date fields, exclude _id
    );
    return res.status(200).json(userActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return res.status(500).json({ error: 'Failed to fetch user activities.' });
  }
};

export { getUserActivities,storeUserActivity };

