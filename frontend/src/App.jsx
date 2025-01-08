import { Navigate, Route,Routes } from "react-router-dom"
import React from 'react'
import { lazy, Suspense } from "react";
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/loginPage';
import SignUpPage from "./pages/auth/signup/SignUpPage";
import GenerateExercises from "./pages/GenerateExercise/generateExercise"
// import DiscoveryPage from "./pages/DiscoveryPage"
import ExerciseList from './pages/curatedExercise/ExerciseList';
// import ExerciseDetails from './pages/Exercises_Page/ExerciseDetail';
import DashBoardPage from "./pages/DashboardPage/DashBoardPage";
import LoadingSpinner from '../src/components/common/LoadingSpinner'
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import Navbar from "./components/common/NavBar";

const DiscoveryPage = lazy(() => import('./pages/home/DiscoveryPage'))



function App() {
  
  const [isGuest, setIsGuest] = React.useState(false);

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      if (isGuest) {
        // If the user is a guest, return null to indicate no authenticated user
        return null;
      }
      try {
       
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    enabled: !isGuest, // Only run the query if the user is not a guest (logged in)
    retry: false, // Only load once
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleGuestLogin = () => {
    setIsGuest(true);
  };

  return (
    <>
      <Suspense fallback={    <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>}>
        {(authUser || isGuest) && (
          <div className="sticky top-0 z-50 col-span-12">
            <Navbar isGuest={isGuest} setIsGuest={setIsGuest}/>
          </div>
        )}
        <Routes>
          <Route path="/" element={authUser || isGuest ? <HomePage /> : <Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              !authUser && !isGuest ? (
                <LoginPage onGuestLogin={handleGuestLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/exercises"
            element={authUser || isGuest ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/GenerateExercises"
            element={authUser || isGuest ? <GenerateExercises /> : <Navigate to="/login" />}
          />
          <Route
            path="/DiscoveryPage"
            element={authUser || isGuest ? <DiscoveryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/DashBoardPage"
            element={authUser || isGuest ? <DashBoardPage /> : <Navigate to="/login" />}
          />
          <Route path="/exercise-list/:exercisePlanName" element={<ExerciseList />} />
          {/* <Route path="/exercise-details" element={<ExerciseDetails />} /> */}
          {/* <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> */}
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
