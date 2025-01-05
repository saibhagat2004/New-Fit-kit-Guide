/* eslint-disable react/prop-types */
import { lazy,Suspense } from "react";
import { Link } from "react-router-dom";
// import Calendar from "../../components/common/Calender";
import { useState ,useEffect } from "react";
import image1 from '../../../public/ExeciseImg/young-fitness-man.jpeg';
import legsImg from '../../../public/ExeciseImg/Legs workout.jpeg'
import absImg from '../../../public/ExeciseImg/abs exerocse.jpeg'
import backpainImg from "../../../public/ExeciseImg/backpainimg.jpeg"
import kneepainImg from "../../../public/ExeciseImg/kneepain.jpeg"
import { useQuery } from "@tanstack/react-query";


const Calendar = lazy(()=> import('../../components/common/Calender'))
const CuratedExercise = lazy(()=> import('../curatedExercise/CuratedExercise'))

// Card component for "Generate Your Plan with AI"
const GeneratePlanCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white p-4 rounded-lg shadow-lg relative h-44">
      <h3 className="text-xl font-bold mb-2">Generate Your Plan with AI</h3>
      <p>Click here to generate a custom exercise plan using AI.</p>
      <Link to="/GenerateExercises">
        <button className="btn mt-4 rounded-lg btn-outline  text-white hover:bg-white">Start Generating</button>
      </Link>
    </div>
  );
};

const HomePage = ({ isGuest }) => {
  const [userActivities, setUserActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  // const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { data: authUser } = useQuery({ queryKey: ["authUser"]});


    useEffect(() => {
      
    const fetchUserActivities = async () => {
      try {
        if (isGuest) {
          // If the user is a guest, skip the fetch process
          setIsLoading(false);
          return;
        }

        if (!authUser || !authUser._id) {
          // setError("User not authenticated.");
          setIsLoading(false);
          return;
        }
        const response = await fetch(`/api/exercise/getUserActivities/${authUser._id}`);
    
        if (!response.ok) {
          throw new Error('Failed to fetch user activities');
        }
    
        const data = await response.json();
    
        if (data.length === 0) {
          setUserActivities([]); // No activities found
          setIsLoading(false);
          return;
        }
    
        // Format the dates to 'yyyy-MM-dd'
        const formattedDates = data.map(activity =>
          new Date(activity.date).toISOString().split('T')[0]
        );
    
        setUserActivities(formattedDates);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };
    
  
    fetchUserActivities();
  }, [authUser]);
  



  if (isLoading) return ;
  if (error) return <div>Error loading data: {error}</div>;

  return (
<>
  <div
    className="bg-zinc-950 min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url('../../../public/black-gradient.jpg')` }}
  >
    {/* Grid Container */}
    <div className="grid grid-cols-12 gap-7">

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
      <div className="col-span-12 lg:col-span-3 flex justify-center items-start mb-16 p-4">
        <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
          <Calendar exerciseDates={userActivities} />
        </Suspense>
      </div>
    </div>
  </div>
</>
  )
};

export default HomePage;