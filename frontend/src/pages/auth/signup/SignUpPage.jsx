import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

// import XSvg from "../../../components/svgs/X";
//import from react icons
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
//import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
	useEffect(() => {
		const card = document.querySelector('.card');
		if (card) {
		  card.onmousemove = e => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
	
			card.style.setProperty('--mouse-x', `${x}px`);
			card.style.setProperty('--mouse-y', `${y}px`);
		  };
		}
	  }, []);
	const [formData, setFormData] = useState({
		email:"",
		username: "",
		fullName: "",
		password: "",
	});
	// const {mutate,isError,isPending,error}=useMutation({
	// 	mutationFn: async (email,username,fullName, password) => {
	// 		try {
	// 			const res= await fetch("/api/auth/signup",{
	// 				method:'POST',
	// 				headers:{
	// 					"Content-Type":"application/json"
	// 				},
	// 				body: JSON.stringify({email,username,fullName,password})
	// 			});
	// 			// if(!res.ok) throw new Error("Something Went wrong");
	// 			const data= await res.json()
	// 			if(data.error) throw new Error(data.error)
	// 			console.log(data)
	// 			return data;
	// 		} catch (error) {
	// 			console.log(error);
	// 			toast.error(error.message)
	// 		}
	// 	}
	// })
	// const queryClient = useQueryClient();
	const queryClient= useQueryClient();
	const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ email, username, fullName, password }) => {
			try {
				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, username, fullName, password }),
				});

				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
				return data;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");

			{
				/* Added this line below, after recording the video. I forgot to add this while recording, sorry, thx. */
				queryClient.invalidateQueries({ queryKey: ["authUser"] })

			}
		},
	});

	const handleSubmit = (e) => {  //Event Object: The e parameter in the function represents the event object. This object contains information about the event, including the target element that triggered the event (e.target).
		e.preventDefault();  // stop the default action of an event from occurring. In the context of a form submission, the default action is to send the form data to the server and reload the page.
		mutate(formData);
	};

	const handleInputChange = (e) => {   //Event Object: The e parameter in the function represents the event object. This object contains information about the event, including the target element that triggered the event (e.target).
		setFormData({ ...formData, [e.target.name]: e.target.value });  //email : value of email
	};


	return (
       <>
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
		<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
		<div className="form-control my-2">
            <label className="label">
              <div className="relative w-full">
                <MdOutlineMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="input input-bordered pl-10 w-full"
                  style={{ boxSizing: "border-box" }}
                  required
                />
              </div>
            </label>
          </div>
		  <div className="form-control my-2">
            <label className="label">
              <div className="relative w-full">
                <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={handleInputChange}
                  value={formData.username}
                  className="input input-bordered pl-10 w-full"
                  style={{ boxSizing: "border-box" }}
                  required
                />
              </div>
            </label>
          </div>
		  {/* <div className="form-control my-2">
            <label className="label">
              <div className="relative w-full">
                <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  onChange={handleInputChange}
                  value={formData.fullName}
                  className="input input-bordered pl-10 w-full"
                  style={{ boxSizing: "border-box" }}
                  required
                />
              </div>
            </label>
          </div> */}

          <div className="form-control my-2">
            <label className="label">
              <div className="relative w-full">
                <MdPassword className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  className="input input-bordered pl-10 w-full"
                  style={{ boxSizing: "border-box" }}
                  required
                />
              </div>
            </label>
          </div>

          <div className="form-control mt-6 w-full">
            <button
              className="btn bg-orange-gradient text-white hover:bg-orange-gradient-hover w-full"
              type="submit"
            >
              {isPending ? "Loading..." : "Sign Up"}
            </button>
            {isError && <p className="text-red-500">{error.message}</p>}
          </div>

		  <div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>Already Have Account</p>
					<Link to='/login'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Login</button>
					</Link>
				</div>
        </form>
      </div>
    </div>
  </div>
</>

	)
};
export default SignUpPage;



