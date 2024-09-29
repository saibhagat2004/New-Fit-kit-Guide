// import { useNavigate } from 'react-router-dom';
// import Avatar from "../../../public/avatars/boy1.png"
// import banner from  "../../../public/ExeciseImg/image@2x.png"
// // Example Data
// const workoutPlan = {
//   fullBodyExercisePlan: {
//     warmUp: [
//       {
//         name: "Jumping Jacks",
//         media_url: Avatar,
//         repetitions: "30 seconds"
//       },
//     ],
//     primary: [
//       {
//         name: "Squats",
//         media_url: Avatar,
//         repetitions: "3 sets of 12 reps"
//       },
//       {
//         name: "Push-ups",
//         media_url: Avatar,
//         repetitions: "3 sets of 10 reps"
//       }
//     ],
//     secondary: [
//       {
//         name: "Lunges",
//         media_url: Avatar,
//         repetitions: "2 sets of 12 reps per leg"
//       }
//     ]
//   }
// };

// const WorkoutList = () => {
//   const navigate = useNavigate();

//   const handleExerciseClick = (exercise) => {
//     navigate('/exercise-details', { state: { exercise } });
//   };

//   return (
//     // <div className="container mx-auto p-4">
//     //   <div className="flex items-center justify-between">
//     //     <h1 className="text-xl font-bold">Full Body & Strength</h1>
//     //     <p>23 Workouts</p>
//     //   </div>

//     //   <div className="mt-4">
//     //     {/* List of exercises */}
//     //     {workoutPlan.fullBodyExercisePlan.warmUp.map((exercise, index) => (
//     //       <div
//     //         key={index}
//     //         className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
//     //         onClick={() => handleExerciseClick(exercise)}
//     //       >
//     //         <img
//     //           src={exercise.media_url}
//     //           alt={exercise.name}
//     //           className="w-16 h-16 rounded-full"
//     //         />
//     //         <div className="ml-4">
//     //           <h2 className="font-bold">{exercise.name}</h2>
//     //           <p className="text-sm">{exercise.repetitions}</p>
//     //         </div>
//     //       </div>
//     //     ))}

//     //     {workoutPlan.fullBodyExercisePlan.primary.map((exercise, index) => (
//     //       <div
//     //         key={index}
//     //         className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
//     //         onClick={() => handleExerciseClick(exercise)}
//     //       >
//     //         <img
//     //           src={exercise.media_url}
//     //           alt={exercise.name}
//     //           className="w-16 h-16 rounded-full"
//     //         />
//     //         <div className="ml-4">
//     //           <h2 className="font-bold">{exercise.name}</h2>
//     //           <p className="text-sm">{exercise.repetitions}</p>
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>
//     <div className="container mx-auto p-4 bg-gray-900 text-white">
//     {/* Hero section */}
//     <div
//       className="relative bg-cover bg-center h-64"
//       style={{
//         backgroundImage: `url(${banner})`, // Replace with actual hero image path
//         opacity: 0.8,
//       }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-orange-400">
//           {workoutPlan.title || 'Full Body & Strength'}
//         </h1>
//       </div>
//     </div>

//     <div className="flex items-center justify-between mt-4">
//       <h1 className="text-2xl font-bold text-orange-400">
//         {workoutPlan.title || 'Full Body & Strength'}
//       </h1>
//       <p>{workoutPlan.fullBodyExercisePlan.primary.length} Workouts</p>
//     </div>

//     <div className="mt-4">
//       {/* List of exercises */}
//       {workoutPlan.fullBodyExercisePlan.primary.map((exercise, index) => (
//         <div
//           key={index}
//           className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
//           onClick={() => handleExerciseClick(exercise)}
//         >
//           <img
//             src={exercise.media_url}
//             alt={exercise.name}
//             className="w-16 h-16 rounded-full"
//           />
//           <div className="ml-4">
//             <h2 className="font-bold text-orange-300">{exercise.name}</h2>
//             <p className="text-sm text-gray-300">{exercise.repetitions}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
//   );
// };

// export default WorkoutList;

// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';

// const WorkoutList = () => {
//   const { exercisePlanName } = useParams();

//   const { data: exercisePlan, isLoading, error } = useQuery({
//     queryKey: ['exercisePlan', exercisePlanName],
//     queryFn: async () => {
//       const response = await fetch(`/api/exercise/exercisePlan?exercisePlanName=${exercisePlanName}`);
//       return response.json();
//     },
//     enabled: !!exercisePlanName // Ensure it only runs if the plan name is present
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading the exercise plan</div>;

//   return (
//     <div className="workout-list">
//       <h1>{exercisePlanName}</h1>
//       {exercisePlan?.primary?.map((exercise, index) => (
//         <div key={index}>
//           <h2>{exercise.name}</h2>
//           <img src={exercise.media_url} alt={exercise.name} />
//           <p>{exercise.repetitions}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WorkoutList;



import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Navbar from "../../components/common/NavBar";

const ExerciseList = () => {
  const { exercisePlanName } = useParams(); // Get the exercise plan name from the URL

  // Fetch the exercise plan data using React Query
  const { data: exercisePlan, isLoading, error } = useQuery({
    queryKey: ['exercisePlan', exercisePlanName],
    queryFn: async () => {
      const response = await fetch(`/api/exercise/exercisePlan?exercisePlanName=${exercisePlanName}`);
      return response.json();
    },
    enabled: !!exercisePlanName, // Ensure it only runs if the plan name is present
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading the exercise plan</div>;

  return (
<div   style={{ backgroundImage: `url('../../../public/black-gradient.jpg')` }}>
<Navbar />

<div className="container mx-auto p-4 bg-zinc-950  text-white"   >
      {/* Hero section */}
      <div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage: `url(${exercisePlan.banner || 'path_to_default_banner.jpg'})`, // Replace with actual hero image path
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
        <p>{exercisePlan?.primary.length || 0} Workouts</p>
      </div>

      <div className="mt-4">
        {/* Warm-Up Section */}
        {exercisePlan?.warmUp && (
          <>
            <h2 className="text-xl font-bold text-orange-300">Warm-up</h2>
            {exercisePlan.warmUp.map((exercise, index) => (
              <div
                key={index}
                className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleExerciseClick(exercise)}
              >
                <img
                  src={exercise.media_url}
                  alt={exercise.name}
                  className="w-16 h-16 rounded-full"
                />
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
              <div
                key={index}
                className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleExerciseClick(exercise)}
              >
                <img
                  src={exercise.media_url}
                  alt={exercise.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="font-bold text-orange-300">{exercise.name}</h2>
                  <p className="text-sm text-gray-300">{exercise.repetitions}</p>
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
              <div
                key={index}
                className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleExerciseClick(exercise)}
              >
                <img
                  src={exercise.media_url}
                  alt={exercise.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="font-bold text-orange-300">{exercise.name}</h2>
                  <p className="text-sm text-gray-300">{exercise.repetitions}</p>
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
              <div
                key={index}
                className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleExerciseClick(exercise)}
              >
                <img
                  src={exercise.media_url}
                  alt={exercise.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="font-bold text-orange-300">{exercise.name}</h2>
                  <p className="text-sm text-gray-300">{exercise.repetitions}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>

</div>


  );
};

export default ExerciseList;
