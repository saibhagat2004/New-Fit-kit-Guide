// import { Link } from "react-router-dom";
// import { useState,useEffect } from "react";

// // import XSvg from "../../../components/svgs/X";
// //import from react icons
// import { MdOutlineMail } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
// import { MdPassword } from "react-icons/md";
// //import { MdDriveFileRenameOutline } from "react-icons/md";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
// 	useEffect(() => {
// 		const card = document.querySelector('.card');
// 		if (card) {
// 		  card.onmousemove = e => {
// 			const rect = card.getBoundingClientRect();
// 			const x = e.clientX - rect.left;
// 			const y = e.clientY - rect.top;
	
// 			card.style.setProperty('--mouse-x', `${x}px`);
// 			card.style.setProperty('--mouse-y', `${y}px`);
// 		  };
// 		}
// 	  }, []);
// 	const [formData, setFormData] = useState({
// 		email:"",
// 		username: "",
// 		fullName: "",
// 		password: "",
// 	});
// 	const queryClient= useQueryClient();
// 	const { mutate, isError, isPending, error } = useMutation({
// 		mutationFn: async ({ email, username, fullName, password }) => {
// 			try {
// 				const res = await fetch("/api/auth/signup", {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({ email, username, fullName, password }),
// 				});

// 				const data = await res.json();
// 				if (!res.ok) throw new Error(data.error || "Failed to create account");
// 				console.log(data);
// 				return data;
// 			} catch (error) {
// 				console.error(error);
// 				throw error;
// 			}
// 		},
// 		onSuccess: () => {
// 			toast.success("Account created successfully");

// 			{
// 				/* Added this line below, after recording the video. I forgot to add this while recording, sorry, thx. */
// 				queryClient.invalidateQueries({ queryKey: ["authUser"] })

// 			}
// 		},
// 	});

// 	const handleSubmit = (e) => {  //Event Object: The e parameter in the function represents the event object. This object contains information about the event, including the target element that triggered the event (e.target).
// 		e.preventDefault();  // stop the default action of an event from occurring. In the context of a form submission, the default action is to send the form data to the server and reload the page.
// 		mutate(formData);
// 	};

// 	const handleInputChange = (e) => {   //Event Object: The e parameter in the function represents the event object. This object contains information about the event, including the target element that triggered the event (e.target).
// 		setFormData({ ...formData, [e.target.name]: e.target.value });  //email : value of email
// 	};


// 	return (
//        <>
//   <div className="hero bg-base-200 min-h-screen">
//     <div className="hero-content flex-col lg:flex-row">
//       <div className="text-center lg:text-left min-w-20">
//         <h1 className="text-5xl font-bold">Fit Kit Guide</h1>
//         <p className="py-6 font-extrabold">
//           Unlock your full potential and take the first step towards a healthier, stronger you.
//         </p>
//       </div>
//       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:ml-auto">
//         <form className="card-body" onSubmit={handleSubmit}>
// 		<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
// 		<div className="form-control my-2">
//             <label className="label">
//               <div className="relative w-full">
//                 <MdOutlineMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
//                 <input
//                   type="email"
//                   placeholder="Email         eg. user@gmail.com"
//                   name="email"
//                   onChange={handleInputChange}
//                   value={formData.email}
//                   className="input input-bordered pl-10 w-full"
//                   style={{ boxSizing: "border-box" }}
//                   required
//                 />
//               </div>
//             </label>
//           </div>
// 		  <div className="form-control my-2">
//             <label className="label">
//               <div className="relative w-full">
//                 <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="username"
//                   name="username"
//                   onChange={handleInputChange}
//                   value={formData.username}
//                   className="input input-bordered pl-10 w-full"
//                   style={{ boxSizing: "border-box" }}
//                   required
//                 />
//               </div>
//             </label>
//           </div>
// 		  {/* <div className="form-control my-2">
//             <label className="label">
//               <div className="relative w-full">
//                 <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   name="fullName"
//                   onChange={handleInputChange}
//                   value={formData.fullName}
//                   className="input input-bordered pl-10 w-full"
//                   style={{ boxSizing: "border-box" }}
//                   required
//                 />
//               </div>
//             </label>
//           </div> */}

//           <div className="form-control my-2">
//             <label className="label">
//               <div className="relative w-full">
//                 <MdPassword className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
//                 <input
//                   type="password"
//                   placeholder="password"
//                   name="password"
//                   onChange={handleInputChange}
//                   value={formData.password}
//                   className="input input-bordered pl-10 w-full"
//                   style={{ boxSizing: "border-box" }}
//                   required
//                 />
//               </div>
//             </label>
//           </div>

//           <div className="form-control mt-6 w-full">
//             <button
//               className="btn bg-orange-gradient text-white hover:bg-orange-gradient-hover w-full"
//               type="submit"
//             >
//               {isPending ? "Loading..." : "Sign Up"}
//             </button>
//             {isError && <p className="text-red-500">{error.message}</p>}
//           </div>

// 		  <div className='flex flex-col gap-2 mt-4'>
// 					<p className='text-white text-lg'>Already Have Account</p>
// 					<Link to='/login'>
// 						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Login</button>
// 					</Link>
// 				</div>
//         </form>
//       </div>
//     </div>
//   </div>
// </>

// 	)
// };
// export default SignUpPage;



import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  useEffect(() => {
    const card = document.querySelector(".card");
    if (card) {
      card.onmousemove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {     mutate: SignUpMutation, isError, isPending, error } = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return response;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    SignUpMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);
	  console.log(credentialResponseDecode);
      const googleUser = {
        email: credentialResponseDecode.email,
        googleId: credentialResponseDecode.sub,
		profilePicture: credentialResponseDecode.picture,
		fullName: credentialResponseDecode.name,
      };
	   console.log(googleUser);
      SignUpMutation(googleUser);
    } catch (error) {
      toast.error("Google login failed");
    }
  };



  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left min-w-20">
          <h1 className="text-5xl font-bold">Fit Kit Guide</h1>
          <p className="py-6 font-extrabold">
            Unlock your full potential and take the first step towards a healthier, stronger you.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:ml-auto">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-extrabold text-white">Join today.</h1>

            {/* Email Input */}
            <div className="form-control my-2">
              <label className="label">
                <div className="relative w-full">
                  <MdOutlineMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email eg. user@gmail.com"
                    name="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    className="input input-bordered pl-10 w-full"
                    required
                  />
                </div>
              </label>
            </div>

            {/* Username Input */}
            <div className="form-control my-2">
              <label className="label">
                <div className="relative w-full">
                  <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInputChange}
                    value={formData.username}
                    className="input input-bordered pl-10 w-full"
                    required
                  />
                </div>
              </label>
            </div>

            {/* Password Input */}
            <div className="form-control my-2">
              <label className="label">
                <div className="relative w-full">
                  <MdPassword className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    value={formData.password}
                    className="input input-bordered pl-10 w-full"
                    required
                  />
                </div>
              </label>
            </div>

            {/* Sign Up Button */}
            <div className="form-control mt-6 w-full">
              <button
                className="btn bg-orange-gradient text-white hover:bg-orange-gradient-hover w-full"
                type="submit"
              >
                {isPending ? "Loading..." : "Sign Up"}
              </button>
              {isError && <p className="text-red-500">{error.message}</p>}
            </div>

            {/* Divider */}
            <div className="my-4 justify-center text-center">OR</div>

            <div className="flex justify-center items-center  ">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google login failed")} />
            </div>

            {/* Login Redirect */}
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-white text-lg">Already Have Account</p>
              <Link to="/login">
                <button className="btn rounded-full btn-primary text-white btn-outline w-full">Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
