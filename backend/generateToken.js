import jwt from 'jsonwebtoken';

export const  generateTokenAndSetCookie=(userId,res)=>{
   const token=jwt.sign({userId},process.env.JWT_SECRET,{
       expiresIn:'15d'                //This means that the token will expire 2 days after it's generated, and the user will need a new token to continue being authenticated.
   })

   res.cookie("jwt", token, {
   maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days in milliseconds      //This means that the cookie containing the JWT will be stored on the client’s browser for 2 days. If the user visits the site again within this period, the browser will still have the token to send along with requests.
   httpOnly: true,                    // Prevents client-side JavaScript from accessing the cookie
   sameSite: "strict",                // Ensures the cookie is sent only to the same site
   secure: process.env.NODE_ENV !== "development",  // Ensures the cookie is sent over HTTPS in production
});
} 


//JWT theory
//JSON Web Tokens (JWT) are used for securely transmitting information between parties as a JSON object.
// This information can be verified and trusted because it is digitally signed. JWTs are commonly used for authentication and authorization purposes.
// When a user logs in, a JWT is generated and sent to the client, which then includes the token in subsequent requests to access protected resources. 
//This approach is stateless, meaning the server does not need to store session information, which can improve scalability and performance. Additionally, JWTs can contain custom claims, allowing for flexible and granular access control.

