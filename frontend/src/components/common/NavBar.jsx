

import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Avatar from "../../../public/avatars/boy1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Logout successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Logout Failed");
    },
  });
  
  // const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <nav className="bg-black px-8 py-4 flex justify-between items-center">
      {/* Left Side: Logo */}
      <div className="text-transparent text-3xl font-extrabold bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500">
        Fit Kit Guide
      </div>
      
     

      {/* Center: Links (Hidden on mobile, shown on desktop) */}
      <div className={`space-x-6 text-2xl ${isOpen ? "block" : "hidden"} md:flex`}>
        <Link to="/Exercises">
          <a className="text-gray-300 hover:text-orange-500">Training</a>
        </Link>
        <Link to="/DiscoveryPage">
          <a className="text-gray-300 hover:text-orange-500">Discovery</a>
        </Link>
        <Link to="/DashBoardPage">
          <a className="text-gray-300 hover:text-orange-500">Dashboard</a>
        </Link>
      </div>

      {/* Right Side: Profile Icon */}
      <div className="text-orange-500">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src={Avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
            <Link to="/DashBoardPage">
                   <a className="justify-between">Profile</a>
            </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
       {/* Mobile Bottom Navbar */}
       <div className="fixed bottom-0 left-0 right-0 bg-black flex justify-around py-4 md:hidden">
         <Link to="/Exercises">
           <a className="text-gray-300 hover:text-orange-500">Training</a>
         </Link>
         <Link to="/DiscoveryPage">
           <a className="text-gray-300 hover:text-orange-500">Discovery</a>
         </Link>
         <Link to="/DashBoardPage">
           <a className="text-gray-300 hover:text-orange-500">Dashboard</a>
         </Link>
       </div>
    </nav>
  );
};

export default Navbar;
