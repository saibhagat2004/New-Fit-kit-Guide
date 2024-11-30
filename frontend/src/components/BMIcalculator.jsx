/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { useQuery } from "@tanstack/react-query";

const BMICalculator = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [heightInFeet, setHeightInFeet] = useState(authUser?.height); // Default to 5 feet
  const [weight, setWeight] = useState(authUser?.weight); // Default to 60 kg
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State for showing/hiding input fields
  const [errorMessage, setErrorMessage] = useState('');

  const calculateBMI = (heightInFeet, weight) => {
    const heightInCm = heightInFeet * 30.48; // Convert feet to cm
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
    if (
      isNaN(heightInFeet) || isNaN(weight) || 
      heightInFeet <= 0 || weight <= 0 || heightInFeet>=10 || weight>=150 
    ) {
      setErrorMessage('Please enter valid height and weight.');
      setBmi(null);
      setCategory('');
    }  else {
      const calculatedBMI = calculateBMI(heightInFeet, weight);
      if (calculatedBMI > 40) {
        setErrorMessage('BMI exceeds the maximum limit of 40.');
        setBmi(null);
        setCategory('');
      } else {
        setBmi(calculatedBMI.toFixed(1));
        setCategory(getBMICategory(calculatedBMI));
        setErrorMessage('');
      }
  };
  }
  useEffect(() => {
    handleCalculate();
  }, [heightInFeet, weight]);

  return (
    <div className="bg-gray-800 p-6 max-w-sm mx-auto rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-orange-400">BMI Calculator</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Height (feet)</label>
            <input
              type="number"
              value={heightInFeet}
              onChange={(e) => setHeightInFeet(parseFloat(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white"
              placeholder="Enter your height in feet"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white"
              placeholder="Enter your weight in kg"
            />
          </div>
        </div>
      ) : null}

      {bmi && !errorMessage && (
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

      {errorMessage && (
        <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
      )}

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
    </div>
  );
};

export default BMICalculator;
