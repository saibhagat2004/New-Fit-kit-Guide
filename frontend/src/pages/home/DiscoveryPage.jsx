import CuratedExercise from "../curatedExercise/CuratedExercise";
import fullbodyImg from '../../../public/ExeciseImg/young-fitness-man.jpeg';
import legsImg from '../../../public/ExeciseImg/Legs workout.jpeg'
import absImg from '../../../public/ExeciseImg/abs exerocse.jpeg'
import backpainImg from "../../../public/ExeciseImg/backpainimg.jpeg"
import kneepainImg from "../../../public/ExeciseImg/kneepain.jpeg"

const DiscoverPage = () => {
  return (
   <>
      <div className="bg-zinc-950 min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('../../../public/black-gradient.jpg')` }}>
        {/* Grid Container */}
        <div className="">
          {/* Navbar spanning the full width */}
          {/* <div className=" sticky top-0 z-50 col-span-12">
            <Navbar />
          </div> */}

          {/* Main Content */}
          <div className="">
            {/* Welcome Message */}
            {/* <h1 className="text-white text-center py-4">Welcome {authUser?.fullName}!</h1> */}

            {/* Generate Plan with AI */}
            <h1 className="text-orange-500 font-bold text-2xl ml-0 lg:ml-12 py-4">Strength Exercise: </h1>

            {/* Curated Exercises */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-9 ml-0 lg:ml-12">
              <CuratedExercise exercisePlanName='fullBodyExercisePlan' title='Full Body Challenge' img={fullbodyImg} bannerImgUrl={fullbodyImg} />
              <CuratedExercise exercisePlanName='lowerBodyExercisePlan'  title='Lower Body Challenge' img={legsImg}  bannerImgUrl={legsImg}/>
              <CuratedExercise exercisePlanName='absExercisePlan' title='Abs Exercise' img={absImg} bannerImgUrl={absImg}/>
              
            </div>
            <h1 className="text-orange-500 font-bold text-2xl ml-0 lg:ml-12 py-4">Pain Relief Exercise: </h1>

            {/* Curated Exercises */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ml-0 lg:ml-12">
              <CuratedExercise exercisePlanName='backPainReliefExercisePlan'  title='Back Pain Relief' img={backpainImg}  bannerImgUrl={backpainImg}   />
              <CuratedExercise exercisePlanName='kneePainReliefExercisePlan'  title='Knee Pain Relief' img={kneepainImg}  bannerImgUrl={kneepainImg} />
            </div>
          </div>
          </div>

      </div>
   </>
  );
};

export default DiscoverPage;
