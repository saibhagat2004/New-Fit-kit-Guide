import { useLocation } from 'react-router-dom';

const ExerciseDetails = () => {
  const location = useLocation();
  const { exercise } = location.state;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{exercise.name}</h1>
      <img
        src={exercise.media_url}
        alt={exercise.name}
        className="w-full h-auto rounded-md mb-4"
      />
      <p className="text-lg font-bold">Repetitions: {exercise.repetitions}</p>
    </div>
  );
};

export default ExerciseDetails;
