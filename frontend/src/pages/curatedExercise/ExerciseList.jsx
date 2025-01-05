
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import defalulImg from '../../../public/ExeciseImg/young-fitness-man.jpeg';
import Modal from './exerciseModal'; // Import your Modal component
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner"
import { useQuery } from "@tanstack/react-query";

const ExerciseList = () => {
  const { exercisePlanName } = useParams(); // Get the exercise plan name from the URL
  const location = useLocation(); // To access query parameters
  const [exercisePlan, setExercisePlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null); // State to track the selected exercise for details
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility

  // Get banner image URL from query parameters
  const queryParams = new URLSearchParams(location.search);  //location.search  contains the query string portion of the URL. The query string is the part of a URL that comes after a question mark (?), containing key-value pairs.
  const bannerImgUrl = queryParams.get('bannerImgUrl'); // If it exists, bannerImgUrl will contain its value; otherwise, it will be null
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });


  useEffect(() => {
    const fetchExercisePlan = async () => {
      try {
        const response = await fetch(`/api/exercise/exercisePlan?exercisePlanName=${exercisePlanName}`);
        const data = await response.json();
        setExercisePlan(data);
        setIsLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Error loading the exercise plan');
        setIsLoading(false);
      }
    };

    if (exercisePlanName) {
      fetchExercisePlan();
    }
  }, [exercisePlanName]);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true); // Open modal on exercise click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedExercise(null); // Clear selected exercise
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
    if (error) return <div>{error}</div>;
  
  const handleCompleteExercise = async () => {
    const currentDate = new Date().toISOString().split('T')[0]; 
    const count = 1;  // Number of exercises completed or another metric
    const userId = authUser?._id; // Replace `authUser._id` with your method of accessing the user's ID
  
    if (!userId) {
      console.error('User ID is required to store activity');
      return;
    }
  
    try {
      const res = await fetch(`/api/exercise/storeActivity/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exercisePlanName,  // Dynamically pass the exercise plan name
          date: currentDate,
          count,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Failed to store activity');
      }
  
      console.log('Activity stored successfully', data);
      toast.success("Exercise completed");
    } catch (error) {
      console.error('Error storing activity:', error.message);
      toast.error("Failed to store activity");
    }
  };
  

  return (
    <div style={{ backgroundImage: `url('../../../public/black-gradient.jpg')` }}>


      <div className="container mx-auto p-4 bg-zinc-950 text-white">
        {/* Hero section */}
        <div
          className="relative bg-cover bg-center h-64"
          style={{
            backgroundImage: `url(${bannerImgUrl || defalulImg })`,
            opacity: 0.8,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-orange-400">
              {exercisePlanName || 'Full Body & Strength'}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <h1 className="text-2xl font-bold text-orange-400">
            {exercisePlanName || 'Full Body & Strength'}
          </h1>
         <p>{exercisePlan?.primary?.length || 0} Workouts</p>
        </div>

        <div className="mt-4">
          {/* Warm-Up Section */}
          {exercisePlan?.warmUp && (
            <>
              <h2 className="text-xl font-bold text-orange-300">Warm-up</h2>
              {exercisePlan.warmUp.map((exercise, index) => (
                <div key={index} className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer" onClick={() => handleExerciseClick(exercise)}>
                  <img src={exercise.media_url} alt={exercise.name} className="w-16 h-16 rounded-full" />
                  <div className="ml-4">
                    <h2 className="font-bold text-orange-300">{exercise.name}</h2>
                    <p className="text-sm text-gray-300">{exercise.repetitions}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Primary Exercises */}
          {exercisePlan?.primary && (
            <>
              <h2 className="text-xl font-bold text-orange-300 mt-6">Primary Exercises</h2>
              {exercisePlan.primary.map((exercise, index) => (
                <div key={index} className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer" onClick={() => handleExerciseClick(exercise)}>
                  <img src={exercise.media_url} alt={exercise.name} className="w-16 h-22 rounded-full" />
                  <div className="ml-4">
                    <h2 className="font-bold text-orange-300">{exercise.name}</h2>
                    <p className="text-sm text-gray-300">Reps: {exercise.repetitions}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Secondary Exercises */}
          {exercisePlan?.secondary && (
            <>
              <h2 className="text-xl font-bold text-orange-300 mt-6">Secondary Exercises</h2>
              {exercisePlan.secondary.map((exercise, index) => (
                <div key={index} className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer" onClick={() => handleExerciseClick(exercise)}>
                  <img src={exercise.media_url} alt={exercise.name} className="w-16 h-16 rounded-full" />
                  <div className="ml-4">
                    <h2 className="font-bold text-orange-300">{exercise.name}</h2>
                    <p className="text-sm text-gray-300">Reps: {exercise.repetitions}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Cooldown Section */}
          {exercisePlan?.coolDown && (
            <>
              <h2 className="text-xl font-bold text-orange-300 mt-6">Cooldown</h2>
              {exercisePlan.coolDown.map((exercise, index) => (
                <div key={index} className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer" onClick={() => handleExerciseClick(exercise)}>
                  <img src={exercise.media_url} alt={exercise.name} className="w-16 h-16 rounded-full" />
                  <div className="ml-4">
                    <h2 className="font-bold text-orange-300">{exercise.name}</h2>
                    <p className="text-sm text-gray-300">Reps: {exercise.repetitions}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      
      {isModalOpen && selectedExercise && (
        //everything between Modal is children. it is a special props
    <Modal onClose={closeModal}>    
      <h2 className="text-2xl font-bold text-orange-400">{selectedExercise.name}</h2>
      <img 
        src={selectedExercise.media_url} 
        alt={selectedExercise.name} 
        className="w-full h-48 object-contain rounded" 
      />              
      <p className="mt-4 text-sm text-white">Reps: {selectedExercise.repetitions}</p>
      <p className="mt-2 text-md text-white">Instruction: </p>
      <p className="mt-2 text-sm text-white">{selectedExercise.instruction} </p>
      <p className="mt-2 text-sm text-white">Common Mistakes:</p>
      <ul className="list-disc list-inside text-gray-200">
                      {selectedExercise.common_mistakes.map((mistake, index) => (
                        <li key={index}>{mistake}</li>
                      ))}
                    </ul>
  </Modal>
)}

<div className="flex justify-center">
  <button
    className="bg-orange-500 text-white mb-20 px-4 py-2 rounded mt-4"
    onClick={handleCompleteExercise}
  >
    Complete Exercise
  </button>
</div>
    </div>
  );
};

export default ExerciseList;
