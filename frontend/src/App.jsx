import { Navigate, Route,Routes } from "react-router-dom"
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/loginPage';
import SignUpPage from "./pages/auth/signup/SignUpPage";
import Exercises from "./pages/Exercises_Page/AllExercises";
import LoadingSpinner from '../src/components/common/LoadingSpinner'
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
function App() {
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
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error)
      }
    },
    retry:false //only load onces 
  });
  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }
  return (
    <>
      <Routes>
			  <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
				 <Route path='/exercises' element={authUser ? <Exercises /> : <Navigate to='/login' />} />
				{/* <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />  */}
			</Routes>
      <Toaster />
    </>
  );
}
export default App;

