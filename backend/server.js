 //server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
// import {v2 as cloudinary} from "cloudinary"
import connectMongoDB  from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routers/auth.route.js"
import exerciseRouter from "./routers/exercise.route.js"
import userRouter from "./routers/user.route.js"

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
app.use("/api/users",userRouter);

 
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


