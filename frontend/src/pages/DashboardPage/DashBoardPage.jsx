

import Navbar from "../../components/common/NavBar";
import BMICalculator from "./BMIcalculator";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Heatmap from "../../components/heapmap";

function DashboardPage() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // Hover effect code
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

  return (
    <>
      <Navbar /> 
<div className="bg-black min-h-screen text-gray-200 h-screen">
  <div className="container mx-auto py-8">
    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
      {/* Profile Section */}
      <div className="col-span-4 sm:col-span-3">
        <div className="card bg-gray-800 shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105 hover:bg-gray-700 hover:shadow-2xl"
          style={{
            background: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 165, 0, 0.2), transparent 50%)"
          }}>
          <div className="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/94.jpg"
              className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
              alt="Profile Picture"
            />
            <h1 className="text-xl font-bold">{authUser?.username}</h1>
            <p className="text-gray-400">Software Developer</p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <a
                href="#"
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
              >
                Contact
              </a>
              <a
                href="#"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
              >
                Resume
              </a>
            </div>
          </div>
          <hr className="my-6 border-t border-gray-300" />
          <div className="flex flex-col">
            <span className="text-gray-400 uppercase font-bold tracking-wider mb-2">
              Skills
            </span>
            <ul>
              <li className="mb-2">JavaScript</li>
              <li className="mb-2">React</li>
              <li className="mb-2">Node.js</li>
              <li className="mb-2">HTML/CSS</li>
              <li className="mb-2">Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dashboard Main Content */}
      <div className="col-span-4 sm:col-span-9">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>

          {/* Daily Workout Progress Tracker */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Today's Progress</h3>
            <p className="text-gray-400">Calories Burned: 500 kcal | Time Spent: 45 mins</p>
          </div>

          {/* BMI Calculator */}
          {/* <BMICalculator /> */}
          <div className="col-span-4 sm:col-span-9">
              <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                {/* Heatmap Component */}
                <Heatmap />

                {/* Existing BMI Calculator */}
                <BMICalculator />

                {/* Other content like experience, skills, etc. */}
              </div>
            </div>

          {/* Goals Section */}
          <div className="mt-6">
            <h3 className="font-bold text-lg">Your Goals</h3>
            <p className="text-gray-400">Weight Gain: 5kg | Current Weight: 50kg</p>
          </div>

          {/* Recommended Exercises */}
          <div className="mt-6">
            <h3 className="font-bold text-lg">Recommended Exercises</h3>
            <ul className="text-gray-400">
              <li>1. Squats - 3 sets x 15 reps</li>
              <li>2. Push-ups - 3 sets x 12 reps</li>
              <li>3. Deadlifts - 3 sets x 10 reps</li>
            </ul>
          </div>

          {/* Motivational Quotes */}
          <div className="mt-6">
            <h3 className="font-bold text-lg">Motivation for Today</h3>
            <p className="text-orange-500">"Success usually comes to those who are too busy to be looking for it."</p>
          </div>

          {/* Social Links */}
          <h3 className="font-semibold text-center mt-3">Find me on</h3>
          <div className="flex justify-center items-center gap-6 my-6">
            {/* Add icons here */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default DashboardPage;
