import { Navigate, Route,Routes } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react";
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/loginPage';
import SignUpPage from "./pages/auth/signup/SignUpPage";
import GenerateExercises from "./pages/Exercises_Page/ExerciseInputForm"
// import DiscoveryPage from "./pages/DiscoveryPage"
import ExerciseList from './pages/Exercises_Page/ExerciseList';
// import ExerciseDetails from './pages/Exercises_Page/ExerciseDetail';
import DashBoardPage from "./pages/DashboardPage/DashBoardPage";
import LoadingSpinner from '../src/components/common/LoadingSpinner'
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"

const DiscoveryPage = lazy(() => import('./pages/DiscoveryPage'))

function App() {
  useEffect(()=>{

  },[]);
  const {data:authUser,isLoading}=useQuery({      	// authUser is not directly storing the data fetched from the API; rather, it is a variable that holds the extracted data from the object returned by useQuery .
    // we use query key to give unique name to our query and can be access anywhere Later.
    queryKey:['authUser'],
                            // 	• queryKey: This is an array that uniquely identifies
                            // the query. The key is used to cache and retrieve the query data.
    queryFn: async ()=>{
      try {            
        const res = await fetch("/api/auth/me");
        const data= await res.json()
        if(data.error) return null
        if(!res.ok){
          throw new Error(data.error ||"Something went wrong")  
                                    //• new Error(data.error ll "Something went wrong")creates a new Error object. The Error constructortakes a message as an argument, which describes what went wrong.
                                    //• The throw keyword is used to throw the erro object created by new Error(...) . This will stop the
                                    //execution of the current function and propagate the
                                    // error up the call stack, where it can be caught and
                                    // handled by a try...catch block or will terminate the
                                    // script if not caught.
        }
        return data;
      } catch (error) {
        throw new Error(error)
      }
    },
    staleTime: Infinity, // Prevents automatic refetch by marking data as always fresh
    cacheTime: Infinity, // Keeps data in cache indefinitely
  });
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
          <LoadingSpinner size="lg" />
      </div>

    );
  } 
  return (
    <>
      <Suspense  fallback={<span className="loading loading-spinner loading-lg"></span>}>
          <Routes>
            <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
            <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
            <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
            <Route path='/exercises' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
            <Route path='/GenerateExercises' element={authUser ? <GenerateExercises /> : <Navigate to='/login' />} />
            <Route path='/DiscoveryPage' element={authUser ? <DiscoveryPage /> : <Navigate to='/login' />} />
            <Route path='/DashBoardPage' element={authUser ? <DashBoardPage /> : <Navigate to='/login' />} />

            <Route path="/exercise-list/:exercisePlanName" element={<ExerciseList />} />
            {/* <Route path="/exercise-details" element={<ExerciseDetails />} /> */}
            {/* <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />  */}
          </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}
export default App;

