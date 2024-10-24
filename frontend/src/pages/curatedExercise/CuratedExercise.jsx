
// import image1 from '../../../public/ExeciseImg/young-fitness-man-studio (1).jpg';
// import { useEffect } from 'react';
// // import { useQuery } from "@tanstack/react-query";


// const CuratedExercise = (exerciseName) => {
//   useEffect(() => {
//     const card = document.querySelector('.curated-card');
//     if (card) {
//       card.onmousemove = (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         card.style.setProperty('--mouse-x', `${x}px`);
//         card.style.setProperty('--mouse-y', `${y}px`);
//       };
//     }
//   }, []);
// // include tanstack query here to search curated exercise form database and store in cache
  
//   return (
//     <div className="curated-card card bg-base-100 w- shadow-xl border-2 border-gray-400" >
//       <figure>
//         <img
//           src={image1}
//           alt="Exercise"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title text-orange-500">
//           {exerciseName}
//           <div className="badge badge-secondary">NEW</div>
//         </h2>
//         <p className="text-gray-300">Achieve your fitness goals with this curated exercise plan.</p>
//         <div className="card-actions justify-end">
//           <div className="badge badge-outline  border-orange-500">Strength</div>
//           <div className="badge badge-outline  border-orange-500">Endurance</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CuratedExercise;

// import { useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';


// const CuratedExercise = ({ exercisePlanName, bannerImgUrl,title ,img}) => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();


//   const handleClick = () => {
//     // queryClient.prefetchQuery({
//     //   queryKey: ['exercisePlan', exercisePlanName],
//     //   queryFn: async () => {
//     //     const response = await fetch(`/api/exercisePlan?exercisePlanName=${exercisePlanName}`);
//     //     return response.json();
//     //   },
//     // });
//     console.log(exercisePlanName); // Debug to check value
//     navigate(`/exercise-list/${exercisePlanName}`);
//   };
//   return (
 
    
// <div className="curated-card card bg-base-100 w- shadow-xl border-2 border-gray-400" onClick={handleClick} >
//        <figure>
//         <img
//           src={img}
//           alt="Exercise"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title text-orange-500">
//           {title}
//           <div className="badge badge-secondary">NEW</div>
//         </h2>
//         <p className="text-gray-300">Achieve your fitness goals with this curated exercise plan.</p>
//         <div className="card-actions justify-end">
//           <div className="badge badge-outline  border-orange-500">Strength</div>
//           <div className="badge badge-outline  border-orange-500">Endurance</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CuratedExercise;



import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const CuratedExercise = ({ exercisePlanName, bannerImgUrl, title, img }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClick = () => {
    // Optional: Uncomment if you want to prefetch query
    // queryClient.prefetchQuery({
    //   queryKey: ['exercisePlan', exercisePlanName],
    //   queryFn: async () => {
    //     const response = await fetch(`/api/exercisePlan?exercisePlanName=${exercisePlanName}`);
    //     return response.json();
    //   },
    // });

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
