

import  { useState } from 'react';
// import RightPanelSkeleton from "../../components/skeletons/RightPanelSkeleton";
import { useQuery } from "@tanstack/react-query";
import Navbar from '../../components/common/NavBar';
// import ExerciseList from "./ExerciseList";

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

    <div className="p-6 bg-black min-h-screen flex flex-col items-center justify-center ">
    <div className="fixed top-0 w-full z-10">
      <Navbar />
    </div>
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

      {/* Display Selected Values
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
      </div> */}
      {/* {isLoading?  <LoadingSpinner/> :<>
        {exercises?.map((exercise) => (
          <Exercise key={exercise._id} exercise={exercise} />
        ))} 
          
      </>
      } */}
      {/* Display Exercises */}
      {isLoading && <p>Loading...</p>}
      {exercises && (
        <div className="mt-6 ">
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
      {/* <ExerciseList /> */}
    </div>
  );
};

export default ExerciseInputForm;


