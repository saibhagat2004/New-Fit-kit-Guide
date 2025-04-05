// import { generateTokenAndSetCookie } from '../generateToken.js'
// import User from '../models/user.model.js';
// import bcrypt from 'bcryptjs';

// export const signup = async (req, res) => {
// 	try {
// 		const { fullName = "", username, email, password } = req.body; // fullName is optional, defaults to an empty string

// 		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 		if (!emailRegex.test(email)) {
// 			return res.status(400).json({ error: "Invalid email format" });
// 		}

// 		const existingUser = await User.findOne({ username });
// 		if (existingUser) {
// 			return res.status(400).json({ error: "Username is already taken" });
// 		}

// 		const existingEmail = await User.findOne({ email });
// 		if (existingEmail) {
// 			return res.status(400).json({ error: "Email is already taken" });
// 		}

// 		if (password.length < 6) {
// 			return res.status(400).json({ error: "Password must be at least 6 characters long" });
// 		}

// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		const newUser = new User({
// 			fullName, // Can be empty or provided later
// 			username,
// 			email,
// 			password: hashedPassword,
// 		});

// 		if (newUser) {
// 			generateTokenAndSetCookie(newUser._id, res);
// 			await newUser.save();

// 			res.status(201).json({
// 				_id: newUser._id,
// 				fullName: newUser.fullName,
// 				username: newUser.username,
// 				email: newUser.email,
// 				followers: newUser.followers,
// 				following: newUser.following,
// 				profileImg: newUser.profileImg,
// 				coverImg: newUser.coverImg,
// 			});
// 		} else {
// 			res.status(400).json({ error: "Invalid user data" });
// 		}
// 	} catch (error) {
// 		console.log("Error in signup controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };

// export const login = async (req, res) => {
//     try {
//       const { username, password } = req.body;
  
//       if (!username || !password) {
//         return res.status(400).json({ error: "Username and password are required" });
//       }
  
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(400).json({ error: "Invalid username or password" });
//       }
  
//       const isPasswordCorrect = await bcrypt.compare(password, user.password);
//       if (!isPasswordCorrect) {
//         return res.status(400).json({ error: "Invalid username or password" });
//       }
  
//       generateTokenAndSetCookie(user._id, res);
  
//       return res.status(200).json({
//         _id: user._id,
//         fullName: user.fullName,
//         username: user.username, // Changed from newUser to user
//         email: user.email,
//         profileImg: user.profileImg,
//       });
  
//     } catch (error) {
//       console.log("Error in login controller", error.message);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
  

// export const logout = async (req, res) => {
//     try {
//       res.cookie("jwt", "", { maxAge: 0 });  //"": This is the value of the cookie. Setting it to an empty string effectively removes the token from the cookie.
//       //                                     { maxAge: 0 }: This option sets the maximum age of the cookie in milliseconds. Setting maxAge to 0 instructs the browser to delete the cookie immediately.
//       res.status(200).json({ message: "Logged out successfully" });
//     } catch (error) {
//       console.log("Error in logout controller", error.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };

// export const getMe= async (req,res)=>{
//     try {
//         const user =await User.findById(req.user._id).select( "-password"); //The req.user object is attached by the protectRoute middleware.
//         if(!user){
//             return res.status(404).json({error:"User not found"})
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.log("Error in getMe controller", error.message);
//          res.status(500).json({ error: "Internal Server Error" });  
//         }
// };



import { generateTokenAndSetCookie } from '../generateToken.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// export const signup = async (req, res) => {
//     try {
//         const { fullName = "", username, email, password, googleId, profilePicture } = req.body;

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({ error: "Invalid email format" });
//         }
//         let newUser;
//         if (googleId) {
//             newUser = new User({
//                 fullName,
//                 email,
//                 googleId,
//                 profilePicture: profilePicture || "",
//                 username: username || "", // Default to an empty string if username is not provided

//             });
//         } else {
//             const existingEmail = await User.findOne({ email });
//             if (existingEmail) {
//                 return res.status(400).json({ error: "Email is already taken" });
//             }
//             if (!username || !password || password.length < 6) {
//                 return res.status(400).json({ error: "Username and password are required, and password must be at least 6 characters long" });
//             }
            
//             const existingUser = await User.findOne({ username });
//             if (existingUser) {
//                 return res.status(400).json({ error: "Username is already taken" });
//             }

//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);

//             newUser = new User({
//                 fullName,
//                 username,
//                 email,
//                 password: hashedPassword,
//             });
//         }

//         await newUser.save();
//         generateTokenAndSetCookie(newUser._id, res);

//         res.status(201).json({
//             _id: newUser._id,
//             fullName: newUser.fullName,
//             username: newUser.username || "", 
//             email: newUser.email,
//             profilePicture: newUser.profilePicture,
//         });
//     } catch (error) {
//         console.log("Error in signup controller", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

export const signup = async (req, res) => {
    try {
        const { fullName = "", username, email, password, googleId, profilePicture } = req.body;
        console.log("Signup request body:", req.body);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        let newUser;

        if (googleId) {
            // Check if a user with the given email already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                // If the user exists and has a Google ID, authenticate them
                if (existingUser.googleId) {
                    generateTokenAndSetCookie(existingUser._id, res);
                    return res.status(200).json({
                        _id: existingUser._id,
                        fullName: existingUser.fullName,
                        username: existingUser.username || "",
                        email: existingUser.email,
                        profilePicture: existingUser.profilePicture,
                    });
                } else {
                    // If the user exists but does not have a Google ID, update their account with Google details
                    existingUser.googleId = googleId;
                    existingUser.profilePicture = profilePicture || existingUser.profilePicture;
                    await existingUser.save();

                    generateTokenAndSetCookie(existingUser._id, res);
                    return res.status(200).json({
                        _id: existingUser._id,
                        fullName: existingUser.fullName,
                        username: existingUser.username || "",
                        email: existingUser.email,
                        profilePicture: existingUser.profilePicture,
                    });
                }
            }

            // If no user exists, create a new account
            const generatedUsername = fullName
                ? fullName.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now()
                : "user_" + Date.now();

            newUser = new User({
                fullName,
                email,
                googleId,
                profilePicture: profilePicture || "",
                username: username || generatedUsername, // Assign a unique username if not provided
            });
        } else {
            // Handle regular signup
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ error: "Email is already taken" });
            }

            if (!username || !password || password.length < 6) {
                return res.status(400).json({ error: "Username and password are required, and password must be at least 6 characters long" });
            }

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: "Username is already taken" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            newUser = new User({
                fullName,
                username,
                email,
                password: hashedPassword,
            });
        }

        if (newUser) {
            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username || "",
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const {username, email, password, googleId, fullName, profilePicture } = req.body;
        console.log("Login request body:", req.body);
        let user;
        if (googleId) {
            user = await User.findOne({ email });
            if (!user) {
                // Generate a unique username based on the user's full name or email
                const generatedUsername = fullName
                    ? fullName.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now()
                    : "user_" + Date.now();
        
                user = new User({
                    fullName,
                    email,
                    googleId,
                    profilePicture: profilePicture || "",
                    username: generatedUsername, // Assign a unique username
                });
        
                try {
                    await user.save();
                    console.log("New Google user saved:", user);
                } catch (error) {
                    console.error("Error saving Google user:", error.message);
                    return res.status(500).json({ error: "Failed to save Google user" });
                }
            }
        }
        else {
              user= await User.findOne({ username });
              console.log("User found:", user);
              if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
              }
            
            if (!user || !user.password) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: "Invalid email or password" });
            }
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username || "",
            email: user.email,
            profilePicture: user.profilePicture,
        });
        console.log("Login successful:", user.fullName);
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
