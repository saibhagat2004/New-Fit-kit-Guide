// import { useState } from 'react';
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from '../../components/common/LoadingSpinner';

// const ExerciseInputForm = () => {
//   const [targetedArea, setTargetedArea] = useState([]);
//   const [equipmentAvailable, setEquipmentAvailable] = useState([]);
//   const [difficulty, setDifficulty] = useState('');
//   const [age, setAge] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const [newTargetArea, setNewTargetArea] = useState('');
//   const [newEquipment, setNewEquipment] = useState('');

//   // Predefined options
//   const equipmentOptions = ['Dumbbell', 'Barbell', 'Kettlebell', 'Resistance Band'];
//   const targetAreaOptions = ['Chest', 'Abs', 'Legs', 'Arms', 'Back'];

//   const validateInputs = () => {
//     let errors = [];
    
//     if (age < 8 || age > 80) {
//       errors.push('Age must be between 8 and 80.');
//     }
    
//     if (newTargetArea && !isNaN(newTargetArea)) {
//       errors.push('Targeted area should not be a number.');
//     }

//     if (newEquipment && !isNaN(newEquipment)) {
//       errors.push('Equipment should not be a number.');
//     }

//     if (errors.length > 0) {
//       setErrorMessage(errors.join(' '));  // Concatenate all errors
//       return false;
//     }

//     setErrorMessage(''); // Clear any previous error message
//     return true;
//   };

//   const handleAddTargetArea = () => {
//     if (newTargetArea && !targetedArea.includes(newTargetArea) && validateInputs()) {
//       setTargetedArea([...targetedArea, newTargetArea]);
//       setNewTargetArea(''); // Clear the input
//     }
//   };

//   const handleRemoveTargetArea = (area) => {
//     setTargetedArea(targetedArea.filter((a) => a !== area));
//   };

//   const handleAddEquipment = () => {
//     if (newEquipment && !equipmentAvailable.includes(newEquipment) && validateInputs()) {
//       setEquipmentAvailable([...equipmentAvailable, newEquipment]);
//       setNewEquipment(''); // Clear the input
//     }
//   };

//   const handleRemoveEquipment = (equip) => {
//     setEquipmentAvailable(equipmentAvailable.filter((e) => e !== equip));
//   };

//   const { data: exercises, isLoading, refetch } = useQuery({
//     queryKey: ["exercises", targetedArea, equipmentAvailable, difficulty, age],
//     queryFn: async () => {
//       const res = await fetch('/api/exercise/FilterExercise', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           targetedArea,
//           equipmentAvailable,
//           difficulty,
//           age: parseInt(age, 10)
//         })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Something went wrong");
//       return data;
//     },
//     enabled: false
//   });

//   return (
//     <>

//       <div className="p-6 bg-black min-h-screen flex flex-col items-center justify-center">
        
//         {/* Error Message */}
//         {errorMessage && (
//           <div className="text-red-500 mb-4">{errorMessage}</div>
//         )}

//         {/* Age Input */}
//         <div className="w-full max-w-lg mb-4">
//           <label className="block mb-2 text-orange-500">Age</label>
//           <input
//             type="number"
//             className="border border-gray-700 bg-black text-white rounded px-3 py-2 w-full"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             placeholder="Enter your age"
//           />
//         </div>

//         {/* Targeted Area */}
//         <div className="w-full max-w-lg mb-4">
//           <label className="block mb-2 text-orange-500">Targeted Area</label>
//           <div className="flex items-center justify-center">
//             <input
//               type="text"
//               className="border border-gray-700 bg-black text-white rounded px-3 py-2 mr-2 flex-1"
//               value={newTargetArea}
//               onChange={(e) => setNewTargetArea(e.target.value)}
//               placeholder="Add targeted area"
//             />
//             <button
//               className="bg-orange-500 text-white px-4 py-2 rounded"
//               onClick={handleAddTargetArea}
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex mt-2">
//             {targetAreaOptions.map((option, idx) => (
//               <button
//                 key={idx}
//                 className="bg-gray-800 text-orange-500 px-3 py-1 rounded-full mr-2"
//                 onClick={() => setTargetedArea([...targetedArea, option])}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>

//           <div className="mt-2 flex flex-wrap pl-4">
//             {targetedArea.map((area, index) => (
//               <div key={index} className="bg-gray-800 text-orange-500 px-3 py-1 rounded-full flex items-center mr-2 mb-2">
//                 <span>{area}</span>
//                 <button className="ml-2 text-red-500" onClick={() => handleRemoveTargetArea(area)}>
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Equipment Available */}
//         <div className="w-full max-w-lg mb-4">
//           <label className="block mb-2 text-orange-500">Equipment Available</label>
//           <div className="flex items-center justify-center">
//             <input
//               type="text"
//               className="border border-gray-700 bg-black text-white rounded px-3 py-2 mr-2 flex-1"
//               value={newEquipment}
//               onChange={(e) => setNewEquipment(e.target.value)}
//               placeholder="Add equipment"
//             />
//             <button
//               className="bg-orange-500 text-white px-4 py-2 rounded"
//               onClick={handleAddEquipment}
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex mt-2">
//   {equipmentOptions.map((option, idx) => (
//     <button
//       key={idx}
//       className="bg-gray-800 text-orange-500 text-sm px-2 py-1 rounded-full mr-1"
//       onClick={() => setEquipmentAvailable([...equipmentAvailable, option])}
//     >
//       {option}
//     </button>
//   ))}
// </div>

//           <div className="mt-2 flex flex-wrap pl-4">
//             {equipmentAvailable.map((equip, index) => (
//               <div key={index} className="bg-gray-800 text-orange-500 px-3 py-1 rounded-full flex items-center mr-2 mb-2">
//                 <span>{equip}</span>
//                 <button className="ml-2 text-red-500" onClick={() => handleRemoveEquipment(equip)}>
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Difficulty */}
//         <div className="w-full max-w-lg mb-4">
//           <label className="block mb-2 text-orange-500">Difficulty</label>
//           <div className="flex items-center justify-center">
//             <select
//               value={difficulty}
//               onChange={(e) => setDifficulty(e.target.value)}
//               className="border border-gray-700 bg-black text-white rounded px-3 py-2"
//             >
//               <option value="">Select difficulty</option>
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>
//           </div>
//         </div>

//         {/* Search Button */}
//         <button className="btn bg-orange-gradient text-white hover:bg-orange-gradient-hover" onClick={() => {
//           if (validateInputs()) refetch();
//         }}>
//           Generate Exercise Plan
//         </button>

//          {/* Display Exercises */}

//         {isLoading && <div className="mt-4 flex  ">
//           <LoadingSpinner size="lg" />
//       </div>}
//               {exercises && (
//                 <div className="mt-6">
//                   <h3 className="text-lg font-semibold text-orange-500">Generated Exercises:</h3>
//                   {['warmUp', 'primary', 'secondary', 'coolDown'].map((category) => (
//                     <div key={category}>
//                       <h4 className="text-white mt-4">{category}:</h4>
//                       {exercises[category].map((exercise, idx) => (
//                         <div key={idx} className="bg-gray-800 p-4 mt-2 rounded">
//                           <p className="text-orange-500">{exercise.name}</p>
//                           <p className="text-white">Instruction: {exercise.instruction}</p>
//                           <p className="text-white">Reps: {exercise.reps}</p>
//                           <p className="text-white">Common Mistakes:</p>
//                           <ul className="list-disc list-inside text-white">
//                             {exercise.common_mistakes.map((mistake, index) => (
//                               <li key={index}>{mistake}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               )}
//       </div>
//     </>
//   );
// };

// export default ExerciseInputForm;



import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ExerciseInputForm = () => {
  const [targetedArea, setTargetedArea] = useState([]);
  const [equipmentAvailable, setEquipmentAvailable] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [newTargetArea, setNewTargetArea] = useState('');
  const [newEquipment, setNewEquipment] = useState('');

  // Predefined options
  const equipmentOptions = ['Dumbbell', 'Barbell', 'Kettlebell', 'Resistance Band'];
  const targetAreaOptions = ['Chest', 'Abs', 'Legs', 'Arms', 'Back'];

  const validateInputs = () => {
    let errors = [];
    
    if (age < 8 || age > 80) {
      errors.push('Age must be between 8 and 80.');
    }
    
    if (newTargetArea && !isNaN(newTargetArea)) {
      errors.push('Targeted area should not be a number.');
    }

    if (newEquipment && !isNaN(newEquipment)) {
      errors.push('Equipment should not be a number.');
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(' '));  // Concatenate all errors
      return false;
    }

    setErrorMessage(''); // Clear any previous error message
    return true;
  };

  const handleAddTargetArea = () => {
    if (newTargetArea && !targetedArea.includes(newTargetArea) && validateInputs()) {
      setTargetedArea([...targetedArea, newTargetArea]);
      setNewTargetArea(''); // Clear the input
    }
  };

  const handleRemoveTargetArea = (area) => {
    setTargetedArea(targetedArea.filter((a) => a !== area));
  };

  const handleAddEquipment = () => {
    if (newEquipment && !equipmentAvailable.includes(newEquipment) && validateInputs()) {
      setEquipmentAvailable([...equipmentAvailable, newEquipment]);
      setNewEquipment(''); // Clear the input
    }
  };

  const handleRemoveEquipment = (equip) => {
    setEquipmentAvailable(equipmentAvailable.filter((e) => e !== equip));
  };

  const { data: exercises, isLoading, refetch } = useQuery({
    queryKey: ["exercises", targetedArea, equipmentAvailable, difficulty, age],
    queryFn: async () => {
      const res = await fetch('/api/exercise/FilterExercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetedArea,
          equipmentAvailable,
          difficulty,
          age: parseInt(age, 10)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    enabled: false
  });

  return (
    <>

      <div className="p-6 bg-black min-h-screen flex flex-col items-center justify-center">
        
        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        {/* Age Input */}
        <div className="w-full max-w-lg mb-4">
          <label className="block mb-2 text-orange-500">Age</label>
          <input
            type="number"
            className="border border-gray-700 bg-black text-white rounded px-3 py-2 w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />
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
          <div className="flex mt-2">
            {targetAreaOptions.map((option, idx) => (
              <button
                key={idx}
                className="bg-gray-800 text-orange-500 px-3 py-1 rounded-full mr-2"
                onClick={() => setTargetedArea([...targetedArea, option])}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap pl-4">
            {targetedArea.map((area, index) => (
              <div key={index} className="bg-gray-800 text-orange-500 px-3 py-1 rounded-full flex items-center mr-2 mb-2">
                <span>{area}</span>
                <button className="ml-2 text-red-500" onClick={() => handleRemoveTargetArea(area)}>
                  &times;
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
          <div className="flex mt-2">
  {equipmentOptions.map((option, idx) => (
    <button
      key={idx}
      className="bg-gray-800 text-orange-500 text-sm px-2 py-1 rounded-full mr-1"
      onClick={() => setEquipmentAvailable([...equipmentAvailable, option])}
    >
      {option}
    </button>
  ))}
</div>

          <div className="mt-2 flex flex-wrap pl-4">
            {equipmentAvailable.map((equip, index) => (
              <div key={index} className="bg-gray-800 text-orange-500 px-3 py-1 rounded-full flex items-center mr-2 mb-2">
                <span>{equip}</span>
                <button className="ml-2 text-red-500" onClick={() => handleRemoveEquipment(equip)}>
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

        {/* Search Button */}
        <button className="btn bg-orange-gradient text-white hover:bg-orange-gradient-hover" onClick={() => {
          if (validateInputs()) refetch();
        }}>
          Generate Exercise Plan
        </button>

         {/* Display Exercises */}

        {isLoading && <div className="mt-4 flex  ">
          <LoadingSpinner size="lg" />
      </div>}
            {exercises && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-orange-500">Generated Exercises:</h3>
                {['warmUp', 'primary', 'secondary', 'coolDown'].map((category) => (
                  <div key={category}>
                    <h4 className="text-white mt-4">{category}:</h4>
                    {exercises[category].map((exercise, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                        onClick={() => console.log(`Selected exercise: ${exercise.name}`)} // Replace with desired click handler
                      >
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                          {exercise.imageUrl ? (
                            <img
                              src={exercise.imageUrl}
                              alt={exercise.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-500 text-sm">No Image</span>
                          )}
                        </div>
                        <div className="ml-4 w-64 lg:w-auto">
                          <h2 className="font-bold text-orange-300">{exercise.name}</h2>
                          <p className="text-sm text-gray-300">Reps: {exercise.reps}</p>
                          <p className="text-sm text-gray-300">Instruction: {exercise.instruction}</p>
                          <p className="text-sm text-gray-300">Common Mistakes:</p>
                          <ul className="list-disc list-inside text-gray-300">
                            {exercise.common_mistakes.map((mistake, index) => (
                              <li key={index}>{mistake}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
      </div>
    </>
  );
};

export default ExerciseInputForm;


