// import { useLocation } from 'react-router-dom';

// const ExerciseDetails = () => {
//   const location = useLocation();
//   const { exercise } = location.state;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">{exercise.name}</h1>
//       <img
//         src={exercise.media_url}
//         alt={exercise.name}
//         className="w-full h-auto rounded-md mb-4"
//       />
//       <p className="text-lg font-bold">Repetitions: {exercise.repetitions}</p>
//     </div>
//   );
// };

// export default ExerciseDetails;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ExerciseDetail = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(`/api/exercise/${exerciseId}`);
        const data = await response.json();
        setExercise(data);
        setIsLoading(false);
      } catch (err) {
        setError('Error loading exercise details');
        setIsLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{exercise.name}</h1>
      <img src={exercise.media_url} alt={exercise.name} />
      <p>Reps: {exercise.repetitions}</p>
      <p>Instruction: {exercise.instruction}</p>
      <p>Common Mistakes: {exercise.common_mistakes.join(', ') || 'None'}</p>
    </div>
  );
};

export default ExerciseDetail;
