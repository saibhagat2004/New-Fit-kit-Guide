/* eslint-disable react/no-unescaped-entities */
import BMICalculator from "../../components/BMIcalculator";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
// import Heatmap from "../../components/heapmap";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import Avatar from "../../../public/avatars/boy1.png";
import Calender from "../../components/common/Calender";
import EditProfileModal from "../ProfilePage/EditProfileModal";

function DashboardPage() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [userActivities, setUserActivities] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const profileImgRef = useRef(null);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await fetch("/api/exercise/getUserActivities");
        if (!response.ok) {
          throw new Error("Failed to fetch user activities");
        }

        const data = await response.json();

        // Format the dates to 'yyyy-MM-dd'
        const formattedDates = data.map(activity =>
          new Date(activity.date).toISOString().split('T')[0]
        );
        
        setUserActivities(formattedDates);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUserActivities();
  }, []);

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

  if (error) return <div>Error loading data: {error}</div>;

  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-black min-h-screen text-gray-200 h-screen">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            {/* Profile Section */}
            <div className="col-span-4 sm:col-span-3">
              <div
                className="card bg-gray-800 shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105 hover:bg-gray-700 hover:shadow-2xl relative"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 165, 0, 0.2), transparent 50%)",
                }}
              >
                <div className="flex flex-col">
                  {/* Avatar */}
                  <div className="flex flex-col items-center relative group">
                    <img
                      src={Avatar}
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="Profile Picture"
                    />
                    <div
                      className="absolute top-5 right-3 p-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                    >
                      <MdEdit
                        className="w-4 h-4 text-white"
                        onClick={() => alert("Click") }
                      />
                    </div>
                  </div>

                  <h1 className="text-xl font-bold self-center">{authUser?.username}</h1>
                  <div className="mt-6 flex flex-col items-center">
                    {/* Edit Profile Modal */}
                    <div
                      className="absolute p-1 bg-primary rounded-full group-hover:opacity-100 cursor-pointer z-20"
                    >
                          <EditProfileModal authUser={authUser} />
                    </div>

                    {/* Left-Aligned Goals Section */}
                    <div className="mt-6 w-full text-left">
                      <h3 className="font-bold text-lg">Your Goals</h3>
                      <p className="text-gray-500 mt-2">{authUser?.goal || "No goals set yet"}</p>
                      <p className="text-gray-400 mt-4">Weight :{authUser?.weight || "Null"}</p>
                      <p className="text-gray-400 mt-4">Height :{authUser?.height || "Null"}</p>
                    </div>
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase font-bold tracking-wider mb-2">
                    Equipment Available
                  </span>
                  <ul>
                    <li className="mb-2">Dumbells</li>
                    <li className="mb-2">Barbells</li>
                    <li className="mb-2">Pull Up Bar</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dashboard Main Content */}
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-black shadow-lg rounded-lg p-6">
                <h2 className="text-xl text-orange-500 font-bold mb-4">Dashboard Overview</h2>

                {/* Daily Workout Progress Tracker */}

                {/* Heatmap Component */}
                {/* <Heatmap /> */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left Column */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold">Today's Progress</h3>
                      <p className="text-gray-400">Calories Burned: 500 kcal | Time Spent: 45 mins</p>
                    </div>
                    {/* Existing BMI Calculator */}
                    <BMICalculator />
                  </div>

                  {/* Right Column */}
                  <div className="flex-1">
                    {isLoading && <div>Loading... </div>}
                    <Calender exerciseDates={userActivities} />
                  </div>
                </div>

                {/* Motivational Quotes */}
                <div className="mt-6">
                  <h3 className="font-bold text-lg">Motivation for Today</h3>
                  <p className="text-orange-500">"Success usually comes to those who are too busy to be looking for it."</p>
                </div>

                {/* Social Links */}
                {/* <h3 className="font-semibold text-center mt-3">Find me on</h3> */}
                <div className="flex justify-center items-center gap-6 my-6">
                  {/* Add icons here */}
                </div>

                {/* User Activities Section */}
                <div className="mt-6">
                  {/* <h3 className="font-bold text-lg">Your Activities</h3> */}
                  {/* <ul className="text-gray-400">
                      {userActivities.length > 0 ? (
                        userActivities
                          .slice() // Create a shallow copy to avoid mutating the original array
                          .reverse() // Reverse the array to display latest activity first
                          .map((activity, index) => (
                            <li key={index}>
                              {activity.exercisePlanName} on {activity.date}
                            </li>
                          ))
                      ) : (
                        <li>No activities recorded yet.</li>
                      )}
                   </ul> */}
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
