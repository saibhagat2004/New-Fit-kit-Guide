// import RightPanelSkeleton from "../../components/skeletons/RightPanelSkeleton";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import Exercise from "./Exercise";
// import { Link } from "react-router-dom";

// const Exercises = () => {
//   const [targetBodyPart, setTargetBodyPart] = useState("");
//   const [equipment, setEquipment] = useState("");
//   const [injuryConsideration, setInjuryConsideration] = useState("");
//   const [difficultyLevel, setDifficultyLevel] = useState("");

//   const { data: exercises, isLoading, refetch, isRefetching } = useQuery({
//     queryKey: ["exercises", targetBodyPart, equipment, injuryConsideration, difficultyLevel],
//     queryFn: async () => {
//       try {
//         const res = await fetch('/api/exercise/FilterExercise', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             targetedBodyParts: targetBodyPart ? [targetBodyPart] : [],
//             equipmentAvailable: equipment ? [equipment] : [],
//             injuryConsiderations: injuryConsideration ? [injuryConsideration] : [],
//             difficultyLevel: difficultyLevel ? [difficultyLevel] : [],
//           })
//         });

//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.error || "Something went wrong");
//         }
//         return data;
//       } catch (error) {
//         throw new Error(error.message || "Failed to fetch exercises");
//       }
//     },
//     enabled: false // Disable auto-fetching on component load
//   });

//   return (
//     <>
//       {(isLoading || isRefetching) && (
//         <div className='flex flex-col justify-center'>
//           <RightPanelSkeleton />
//           <RightPanelSkeleton />
//           <RightPanelSkeleton />
//         </div>
//       )}
   
//         <div>
//           <div className="flex flex-col space-y-4 px-2 py-4">
//             {/* Filters */}
//             <div className="flex items-center gap-4">
//               <h2 className="text-xl font-bold text-primary">Filter</h2>
              
//               {/* Targeted Body Parts Dropdown */}
//               <div className="dropdown dropdown-hover">
//                 <div tabIndex={0} role="button" className="btn m-1">
//                   Targeted Body Parts
//                 </div>
//                 <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//                   <li><a onClick={() => setTargetBodyPart("Chest")}>Chest</a></li>
//                   <li><a onClick={() => setTargetBodyPart("Shoulders")}>Shoulders</a></li>
//                   <li><a onClick={() => setTargetBodyPart("Legs")}>Legs</a></li>
//                   <li><a onClick={() => setTargetBodyPart("Back")}>Back</a></li>
//                   <li><a onClick={() => setTargetBodyPart("Arms")}>Arms</a></li>
//                   <li><a onClick={() => setTargetBodyPart("Core")}>Core</a></li>
//                 </ul>
//                 {targetBodyPart && <p className='text-gray-500 ml-4'>{targetBodyPart}</p>}
//               </div>

//               {/* Equipment Available Dropdown */}
//               <div className="dropdown dropdown-hover">
//                 <div tabIndex={0} role="button" className="btn m-1">
//                   Equipment Available
//                 </div>
//                 <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//                   <li><a onClick={() => setEquipment("Dumbbells")}>Dumbbells</a></li>
//                   <li><a onClick={() => setEquipment("Barbell")}>Barbell</a></li>
//                   <li><a onClick={() => setEquipment("Resistance Bands")}>Resistance Bands</a></li>
//                   <li><a onClick={() => setEquipment("Pull-Up Bar")}>Pull-Up Bar</a></li>
//                   <li><a onClick={() => setEquipment("None")}>None</a></li>
//                 </ul>
//                 {equipment && <p className='text-gray-500 ml-4'>{equipment}</p>}
//               </div>

//               {/* Injury Considerations Dropdown */}
//               <div className="dropdown dropdown-hover">
//                 <div tabIndex={0} role="button" className="btn m-1">
//                   Injury Considerations
//                 </div>
//                 <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//                   <li><a onClick={() => setInjuryConsideration("Knee Pain")}>Knee Pain</a></li>
//                   <li><a onClick={() => setInjuryConsideration("Lower Back Pain")}>Lower Back Pain</a></li>
//                   <li><a onClick={() => setInjuryConsideration("Shoulder Pain")}>Shoulder Pain</a></li>
//                   <li><a onClick={() => setInjuryConsideration("Wrist Pain")}>Wrist Pain</a></li>
//                   <li><a onClick={() => setInjuryConsideration("No Injury")}>No Injury</a></li>
//                 </ul>
//                 {injuryConsideration && <p className='text-gray-500 ml-4'>{injuryConsideration}</p>}
//               </div>

//               {/* Difficulty Level Dropdown */}
//               <div className="dropdown dropdown-hover">
//                 <div tabIndex={0} role="button" className="btn m-1">
//                   Difficulty Level
//                 </div>
//                 <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//                   <li><a onClick={() => setDifficultyLevel("Beginner")}>Beginner</a></li>
//                   <li><a onClick={() => setDifficultyLevel("Intermediate")}>Intermediate</a></li>
//                   <li><a onClick={() => setDifficultyLevel("Advanced")}>Advanced</a></li>
//                 </ul>
//                 {difficultyLevel && <p className='text-gray-500 ml-4'>{difficultyLevel}</p>}
//               </div>
              
//               {/* Search Button */}
//               <button
//                 className="btn bg-orange-gradient text-white hover:bg-orange-gradient-hover"
//                 type="submit"
//                 onClick={refetch} // Only fetch exercises when the Search button is clicked
//               >
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Exercises List */}
//           {exercises?.map((exercise) => (
//             <Exercise key={exercise._id} exercise={exercise} />
//           ))}

//           {/* Home Button */}
//           <Link to='/'>
//             <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Home</button>
//           </Link>
//         </div>
//         {(!isLoading && !isRefetching && exercises?.length === 0) && (
//         <p className='text-center my-4'>No Exercises Found 👻</p>
//       )}
//     </>
//   );
// };

// export default Exercises;



import  { useState } from 'react';
// import RightPanelSkeleton from "../../components/skeletons/RightPanelSkeleton";
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useQuery } from "@tanstack/react-query";
import Exercise from "./Exercise";
// import { Link } from "react-router-dom";

const ExerciseInputForm = () => {
  const [targetedArea, setTargetedArea] = useState([]);
  const [equipmentAvailable, setEquipmentAvailable] = useState([]);
  const [difficulty, setDifficulty] = useState('');

  const [newTargetArea, setNewTargetArea] = useState('');
  const [newEquipment, setNewEquipment] = useState('');

  const handleAddTargetArea = () => {
    if (newTargetArea && !targetedArea.includes(newTargetArea)) {
      setTargetedArea([...targetedArea, newTargetArea]);
      setNewTargetArea(''); // Clear the input
    }
  };

  const handleRemoveTargetArea = (area) => {
    setTargetedArea(targetedArea.filter((a) => a !== area));  //creating a new targeted area that do not match with area which is remove
  };

  const handleAddEquipment = () => {
    if (newEquipment && !equipmentAvailable.includes(newEquipment)) {
      setEquipmentAvailable([...equipmentAvailable, newEquipment]);
      setNewEquipment(''); // Clear the input
    }
  };

  const handleRemoveEquipment = (equip) => {
    setEquipmentAvailable(equipmentAvailable.filter((e) => e !== equip));
  };
  const { data: exercises, isLoading, refetch } = useQuery({
    queryKey: ["exercises", targetedArea, equipmentAvailable, difficulty],
        queryFn: async () => {
          try {
            const res = await fetch('/api/exercise/FilterExercise', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                targetedArea, // Pass the arrays directly
                equipmentAvailable,
                difficulty
              })
            });
            const data = await res.json();
            console.log(data)
            if (!res.ok) {
              throw new Error(data.error || "Something went wrong");
            }
            return data;
          } catch (error) {
            throw new Error(error.message || "Failed to fetch exercises");
          }
        },
        enabled: false // Disable auto-fetching on component load
      });


  return (
    <div className="p-6 bg-black min-h-screen flex flex-col items-center justify-center">
      {/* Targeted Area */}
      <div className="w-full max-w-lg mb-4">
        <label className="block mb-2 text-orange-500">Targeted Area</label>
        <div className="flex items-center justify-center">
          <input
            type="text"
            className="border border-gray-700 bg-black text-white rounded px-3 py-2 mr-2 flex-1"
            value={newTargetArea}
            onChange={(e) => setNewTargetArea(e.target.value)}
            placeholder="Add targeted area"
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleAddTargetArea}
          >
            Add
          </button>
        </div>

        {/* Display Selected Targeted Areas */}
        <div className="mt-2 flex flex-wrap pl-4">
          {targetedArea.map((area, index) => (
            <div
              key={index}
              className="bg-gray-800 text-orange-500 px-3 py-1 rounded-full flex items-center mr-2 mb-2"
            >
              <span>{area}</span>
              <button
                className="ml-2 text-red-500"
                onClick={() => handleRemoveTargetArea(area)}
              >
                &times;   
                 {/* &time ->indicate "close" or "remove" functionality in buttons. */}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Available */}
      <div className="w-full max-w-lg mb-4">
        <label className="block mb-2 text-orange-500">Equipment Available</label>
        <div className="flex items-center justify-center">
          <input
            type="text"
            className="border border-gray-700 bg-black text-white rounded px-3 py-2 mr-2 flex-1"
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            placeholder="Add equipment"
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleAddEquipment}
          >
            Add
          </button>
        </div>

      

        {/* Display Selected Equipment */}
        <div className="mt-2 flex flex-wrap pl-4">
          {equipmentAvailable.map((equip, index) => (
            <div
              key={index}
              className="bg-gray-800 text-orange-500 px-3 py-1 rounded-full flex items-center mr-2 mb-2"
            >
              <span>{equip}</span>
              <button
                className="ml-2 text-red-500"
                onClick={() => handleRemoveEquipment(equip)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="w-full max-w-lg mb-4">
        <label className="block mb-2 text-orange-500">Difficulty</label>
        <div className="flex items-center justify-center">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-700 bg-black text-white rounded px-3 py-2"
          >
            <option value="">Select difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
      {/* serch button */}
      <button
                className="btn bg-orange-gradient text-white hover:bg-orange-gradient-hover"
                type="submit"
                onClick={refetch}
                // Only fetch exercises when the Search button is clicked
              >
                Generate Exercise Plan
      </button>

      {/* Display Selected Values */}
      <div className="w-full max-w-lg mt-4 text-left pl-4">
        <h3 className="text-lg font-semibold text-orange-500">Selected Values:</h3>
        <p className="text-white mt-2">
          <strong>Targeted Areas:</strong> {JSON.stringify(targetedArea)}
        </p>
        <p className="text-white mt-2">
          <strong>Equipment Available:</strong> {JSON.stringify(equipmentAvailable)}
        </p>
        <p className="text-white mt-2">
          <strong>Difficulty:</strong> {difficulty}
        </p>
      </div>
      {/* {isLoading?  <LoadingSpinner/> :<>
        {exercises?.map((exercise) => (
          <Exercise key={exercise._id} exercise={exercise} />
        ))} 
          
      </>
      } */}
      {/* Display Exercises */}
      {isLoading && <p>Loading...</p>}
      {exercises && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-orange-500">Generated Exercises:</h3>
          {/* Iterate over each exercise category */}
          {['warmUp', 'primary', 'secondary', 'coolDown'].map((category) => (
            <div key={category}>
              <h4 className="text-white mt-4">{category}:</h4>
              {exercises[category].map((exercise, idx) => (
                <div key={idx} className="bg-gray-800 p-4 mt-2 rounded">
                  <p className="text-orange-500">{exercise.name}</p>
                  <p className="text-white">Instruction: {exercise.instruction}</p>
                  <p className="text-white">Reps: {exercise.reps}</p>
                  <p className="text-white">Common Mistakes:</p>
                  <ul className="list-disc list-inside text-white">
                    {exercise.common_mistakes.map((mistake, index) => (
                      <li key={index}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default ExerciseInputForm;


