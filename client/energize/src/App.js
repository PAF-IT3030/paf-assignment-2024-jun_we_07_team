import Login from "./pages/login/Login";
import Register from "./pages/register/Register";


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import MealPlan from "./pages/MealPlan/MealPlan";
import MealPlanHome from "./pages/MealPlanHome/MealPlanHome";

import MyMealPost from "./components/myMealPost/MyMealPost";
import WorkoutPlans from "./pages/Workout/WorkoutPlans";
import Workout from "./pages/Workout/workout ";
;

function App() {
  const {currentUser} = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },

        {
          path: "/meal-plan/add",
          element: <MealPlan/>,
        },
        {
          path: "/mealPlanHome",
          element: <MealPlanHome />,
        },
        {
          path: "/MyMealPost",
          element: <MyMealPost />,
        },
        {
          path: "/workout",
          element: <Workout/>,
        },
        {
          path: "/workoutPlan",
          element: <WorkoutPlans/>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
