/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { compareSync } from "bcryptjs";

const LoginPage = ({ onGuestLogin }) => {
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

  const [formData, setFormData] = useState({ username: "", password: "" });
  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
	mutationFn: async (data) => {
		const res = await fetch("/api/auth/login", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(data),
		});
		const response = await res.json();
		if (!res.ok) throw new Error(response.error || "Login failed");
		return response;
    },
    onSuccess: () => {
      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

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
      loginMutation(googleUser);
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
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
            <h1 className="text-4xl font-extrabold text-white">Let's go.</h1>
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

            <div className="form-control mt-6 w-full">
              <button className="btn bg-orange-gradient text-white hover:bg-orange-gradient-hover w-full" type="submit">
                {isPending ? "Loading..." : "Login"}
              </button>
              <button onClick={onGuestLogin} className="btn rounded-full btn-primary text-white btn-outline w-full mt-5">
                Login as Guest
              </button>
              {isError && <p className="text-red-500">{error.message}</p>}
            </div>

            <div className="my-4 justify-center text-center">OR</div>
            <div className="flex justify-center items-center  ">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google login failed")} />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="text-white text-lg">{"Don't"} have an account?</p>
              <Link to="/signup">
                <button className="btn rounded-full btn-primary text-white btn-outline w-full">Sign up</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
