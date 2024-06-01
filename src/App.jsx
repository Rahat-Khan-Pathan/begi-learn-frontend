import Dashboard from "./components/dashboard/Dashboard"
import {  createBrowserRouter, RouterProvider } from "react-router-dom"
import Error from "./components/error/Error";
import Summary from "./components/summary/Summary";
import Auth from "./components/login/Auth";
import Verify from "./components/login/Verify";
import ForgotPassword from "./components/login/ForgotPassword";
import Home from "./components/home/Home";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AuthRoute from "./components/privateRoute/AuthRoute";
// import AdminRoute from "./components/privateRoute/AdminRoute";
import NavBar from "./components/navbar/NavBar";
import AddProblem from "./components/problems/AddProblem";
import ManageProblems from "./components/problems/ManageProblems";
import ManageSingleProblem from "./components/problems/ManageSingleProblem";
import ViewAllProblems from "./components/problems/ViewAllProblems";
import ViewSingleProblem from "./components/problems/ViewSingleProblem";
import AllSubmissions from "./components/submissions/AllSubmissions";
import MySubmissions from "./components/submissions/MySubmissions";
import SingleSubmission from "./components/submissions/SingleSubmission";
import ViewAllUsers from "./components/users/ViewAllUsers";
import LeaderBoard from "./components/summary/LeaderBoard";


function App() {
  const router = createBrowserRouter([
    {
      path:"/dashboard",
      element: <PrivateRoute><Dashboard><Summary/></Dashboard></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/dashboard/add-problem",
      element: <PrivateRoute><Dashboard><AddProblem/></Dashboard></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/dashboard/manage-problems",
      element: <PrivateRoute><Dashboard><ManageProblems/></Dashboard></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/dashboard/manage-problems/:id",
      element: <PrivateRoute><Dashboard><ManageSingleProblem/></Dashboard></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/dashboard/manage-users",
      element: <PrivateRoute><Dashboard><ViewAllUsers/></Dashboard></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/login",
      element: <AuthRoute><Auth/></AuthRoute>,
      errorElement: <Error/>
    },
    {
      path:"/signup",
      element: <AuthRoute><Auth/></AuthRoute>,
      errorElement: <Error/>
    },
    {
      path:"/verify",
      element: <AuthRoute><Verify/></AuthRoute>,
      errorElement: <Error/>
    },
    {
      path:"/forgot-password",
      element: <AuthRoute><ForgotPassword/></AuthRoute>,
      errorElement: <Error/>
    },
    {
      path:"/home",
      element: <PrivateRoute><NavBar><Home/></NavBar></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/",
      element: <PrivateRoute><NavBar><Home/></NavBar></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/problems",
      element: <PrivateRoute><NavBar><ViewAllProblems/></NavBar></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/problems/:id",
      element: <PrivateRoute><NavBar><ViewSingleProblem/></NavBar></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/all-submissions",
      element: <PrivateRoute><NavBar><AllSubmissions/></NavBar></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/my-submissions",
      element: <PrivateRoute><NavBar><MySubmissions/></NavBar></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/my-submissions/:id",
      element: <PrivateRoute><NavBar><SingleSubmission/></NavBar></PrivateRoute>,
      errorElement: <Error/>
    },
    {
      path:"/leaderboard",
      element: <PrivateRoute><NavBar><LeaderBoard/></NavBar></PrivateRoute>,
      errorElement: <Error/>
    }
  ]);
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
