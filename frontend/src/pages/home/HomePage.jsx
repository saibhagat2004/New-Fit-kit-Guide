


import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/common/NavBar";
import CuratedExercise from "../curatedExercise/CuratedExercise";
import { Link } from "react-router-dom";
import Calendar from "../../components/common/Calender";
import { useState ,useEffect } from "react";

import image1 from '../../../public/ExeciseImg/young-fitness-man.jpeg';
import legsImg from '../../../public/ExeciseImg/Legs workout.jpeg'
import absImg from '../../../public/ExeciseImg/abs exerocse.jpeg'
import backpainImg from "../../../public/ExeciseImg/backpainimg.jpeg"
import kneepainImg from "../../../public/ExeciseImg/kneepain.jpeg"
// Card component for "Generate Your Plan with AI"
const GeneratePlanCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white p-4 rounded-lg shadow-lg relative h-44">
      <h3 className="text-xl font-bold mb-2">Generate Your Plan with AI</h3>
      <p>Click here to generate a custom exercise plan using AI.</p>
      <Link to="/GenerateExercises">
        <button className="btn mt-4 rounded-lg btn-outline hover:bg-white">Start Generating</button>
      </Link>
    </div>
  );
};

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  // const exerciseDates = [
  //   "2024-10-03",
  //   "2024-10-07",
  //   "2024-10-11",
  //   "2024-10-08", // highlight these dates
  // ];
   // Fetching user activity data using the fetch API
  // Local state to store user activities and loading/error status
  const [userActivities, setUserActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
<>
  <div
    className="bg-zinc-950 min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url('../../../public/black-gradient.jpg')` }}
  >
    {/* Grid Container */}
    <div className="grid grid-cols-12 gap-7">
      {/* Navbar spanning the full width */}
      <div className="sticky top-0 z-50 col-span-12">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9 p-4">
        {/* Strength Exercise Section */}
        <div className="mb-7 ml-0 lg:ml-12">
          <GeneratePlanCard />
        </div>
        <h1 className="text-orange-500 font-bold text-2xl ml-0 lg:ml-12 py-4">
          Strength Exercise:
        </h1>

        {/* Curated Exercises */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-9 ml-0 lg:ml-12">
          <CuratedExercise
            exercisePlanName="fullBodyExercisePlan"
            title="Full Body Challenge"
            img={image1}
            bannerImgUrl={image1}
          />
          <CuratedExercise
            exercisePlanName="lowerBodyExercisePlan"
            title="Lower Body Challenge"
            img={legsImg}
            bannerImgUrl={legsImg}
          />
          <CuratedExercise
            exercisePlanName="absExercisePlan"
            title="Abs Exercise"
            img={absImg}
            bannerImgUrl={absImg}
          />
        </div>

        {/* Pain Relief Section */}
        <h1 className="text-orange-500 font-bold text-2xl ml-0 lg:ml-12 py-4">
          Pain Relief Exercise:
        </h1>

        {/* Curated Exercises */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ml-0 lg:ml-12">
          <CuratedExercise
            exercisePlanName="backPainReliefExercisePlan"
            title="Back Pain Relief"
            img={backpainImg}
            bannerImgUrl={backpainImg}
          />
          <CuratedExercise
            exercisePlanName="kneePainReliefExercisePlan"
            title="Knee Pain Relief"
            img={kneepainImg}
            bannerImgUrl={kneepainImg}
          />
        </div>
      </div>

      {/* Calendar Section */}
      <div className="col-span-12 lg:col-span-3 flex justify-center items-start p-4">
        <Calendar exerciseDates={userActivities} />
      </div>
    </div>
  </div>
</>
  )
};

export default HomePage;
