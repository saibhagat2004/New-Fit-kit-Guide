// import React, { useState, useEffect } from 'react';

// const BMICalculator = () => {
//   // Set the default values for height in feet, inches, and weight in kg
//   const [heightInFeet, setHeightInFeet] = useState(5); // Default to 5 feet
//   const [heightInInches, setHeightInInches] = useState(4.8); // Default to 4.8 inches
//   const [weight, setWeight] = useState(60); // 60 kg
//   const [bmi, setBmi] = useState(null);
//   const [category, setCategory] = useState('');
//   const [isEditing, setIsEditing] = useState(false); // State for showing/hiding input fields

//   // Convert feet and inches to centimeters for BMI calculation
//   const calculateBMI = (heightInFeet, heightInInches, weight) => {
//     const totalHeightInInches = heightInFeet * 12 + parseFloat(heightInInches); // Convert height to inches
//     const heightInCm = totalHeightInInches * 2.54; // Convert inches to cm
//     return weight / Math.pow(heightInCm / 100, 2); // BMI formula
//   };

//   const getBMICategory = (bmi) => {
//     if (bmi < 18.5) {
//       return 'Underweight';
//     } else if (bmi >= 18.5 && bmi < 24.9) {
//       return 'Normal weight';
//     } else if (bmi >= 24.9 && bmi < 29.9) {
//       return 'Overweight';
//     } else {
//       return 'Obese';
//     }
//   };

//   const handleCalculate = () => {
//     if (!isNaN(heightInFeet) && !isNaN(heightInInches) && !isNaN(weight) && heightInFeet > 0 && weight > 0) {
//       const calculatedBMI = calculateBMI(heightInFeet, heightInInches, weight);
//       setBmi(calculatedBMI.toFixed(1));
//       setCategory(getBMICategory(calculatedBMI));
//     } else {
//       setBmi(null);
//       setCategory('Please enter valid height and weight.');
//     }
//   };

//   // Trigger BMI calculation when height or weight changes
//   useEffect(() => {
//     handleCalculate();
//   }, [heightInFeet, heightInInches, weight]);

//   return (
//     <div className="bg-white p-6 max-w-sm mx-auto rounded-lg shadow-lg">
//       {/* Header and Edit button aligned side by side */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-700">BMI Calculator</h2>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
//         >
//           {isEditing ? 'Save' : 'Edit'}
//         </button>
//       </div>

//       {/* Toggle the input fields with the "Edit" button */}
//       {isEditing ? (
//         <div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Height (feet)</label>
//             <input
//               type="number"
//               value={heightInFeet}
//               onChange={(e) => setHeightInFeet(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
//               placeholder="Enter your height in feet"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Height (inches)</label>
//             <input
//               type="number"
//               value={heightInInches}
//               onChange={(e) => setHeightInInches(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
//               placeholder="Enter your height in inches"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
//             <input
//               type="number"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
//               placeholder="Enter your weight in kg"
//             />
//           </div>
//         </div>
//       ) : null}

//       {/* Show the calculated BMI if available */}
//       {bmi && (
//         <div className="mt-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold">BMI: {bmi}</h3>
//             <span
//               className={`px-3 py-1 rounded-full text-sm ${
//                 category === 'Underweight' ? 'bg-blue-200' : 
//                 category === 'Normal weight' ? 'bg-green-200' : 
//                 category === 'Overweight' ? 'bg-yellow-200' : 
//                 'bg-red-200'
//               }`}
//             >
//               {category}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* BMI Scale is always visible */}
//       <div className="mt-4">
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div
//             className="h-2.5 rounded-full"
//             style={{
//               width: `${(bmi / 40) * 100}%`,
//               background: bmi < 18.5 ? '#60A5FA' :
//                           bmi < 24.9 ? '#34D399' :
//                           bmi < 29.9 ? '#FBBF24' : '#F87171',
//             }}
//           />
//         </div>
//         <div className="flex justify-between text-xs text-gray-500 mt-1">
//           <span>15</span>
//           <span>18.5</span>
//           <span>25</span>
//           <span>30</span>
//           <span>35</span>
//           <span>40</span>
//         </div>
//       </div>

//       {category === 'Please enter valid height and weight.' && (
//         <div className="mt-4 text-red-500 text-sm">{category}</div>
//       )}
//     </div>
//   );
// };

// export default BMICalculator;


import  { useState, useEffect } from 'react';

const BMICalculator = () => {
  const [heightInFeet, setHeightInFeet] = useState(5); // Default to 5 feet
  const [heightInInches, setHeightInInches] = useState(4.8); // Default to 4.8 inches
  const [weight, setWeight] = useState(60); // 60 kg
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State for showing/hiding input fields

  const calculateBMI = (heightInFeet, heightInInches, weight) => {
    const totalHeightInInches = heightInFeet * 12 + parseFloat(heightInInches); 
    const heightInCm = totalHeightInInches * 2.54;
    return weight / Math.pow(heightInCm / 100, 2);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 24.9 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };

  const handleCalculate = () => {
    if (!isNaN(heightInFeet) && !isNaN(heightInInches) && !isNaN(weight) && heightInFeet > 0 && weight > 0) {
      const calculatedBMI = calculateBMI(heightInFeet, heightInInches, weight);
      setBmi(calculatedBMI.toFixed(1));
      setCategory(getBMICategory(calculatedBMI));
    } else {
      setBmi(null);
      setCategory('Please enter valid height and weight.');
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [heightInFeet, heightInInches, weight]);

  return (
    <div className="bg-gray-800 p-6 max-w-sm mx-auto rounded-lg shadow-lg">
      {/* Header and Edit button aligned side by side */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-orange-400">BMI Calculator</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Toggle the input fields with the "Edit" button */}
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Height (feet)</label>
            <input
              type="number"
              value={heightInFeet}
              onChange={(e) => setHeightInFeet(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white"
              placeholder="Enter your height in feet"
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Height (inches)</label>
            <input
              type="number"
              value={heightInInches}
              onChange={(e) => setHeightInInches(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white"
              placeholder="Enter your height in inches"
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white"
              placeholder="Enter your weight in kg"
            />
          </div>
        </div>
      ) : null}

      {/* Show the calculated BMI if available */}
      {bmi && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">BMI: {bmi}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm text-white ${
                category === 'Underweight' ? 'bg-blue-600' :
                category === 'Normal weight' ? 'bg-green-600' :
                category === 'Overweight' ? 'bg-yellow-600' : 
                'bg-red-600'
              }`}
            >
              {category}
            </span>
          </div>
        </div>
      )}

      {/* BMI Scale */}
      <div className="mt-4">
        <div className="w-full bg-gray-600 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full"
            style={{
              width: `${(bmi / 40) * 100}%`,
              background: bmi < 18.5 ? '#3B82F6' : // Blue
                          bmi < 24.9 ? '#10B981' : // Green
                          bmi < 29.9 ? '#F59E0B' : // Yellow
                          '#EF4444', // Red
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>15</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>35</span>
          <span>40</span>
        </div>
      </div>

      {category === 'Please enter valid height and weight.' && (
        <div className="mt-4 text-red-500 text-sm">{category}</div>
      )}
    </div>
  );
};

export default BMICalculator;
