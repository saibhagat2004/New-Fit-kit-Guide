import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CuratedExercise = ({ exercisePlanName, bannerImgUrl, title, img }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Pass the banner image URL as a query parameter
    navigate(`/exercise-list/${exercisePlanName}?bannerImgUrl=${encodeURIComponent(bannerImgUrl)}`);
  };

  return (
    <div className="curated-card card bg-base-100 w- shadow-xl border-2 border-gray-400" onClick={handleClick}>
      <figure>
        <img src={img} alt="Exercise" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-orange-500">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="text-gray-300">Achieve your fitness goals with this curated exercise plan.</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline border-orange-500">Strength</div>
          <div className="badge badge-outline border-orange-500">Endurance</div>
        </div>
      </div>
    </div>
  );
};

export default CuratedExercise;
