import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Login from './screens/login/Login';
import SignUp from './screens/signup/signup';
import JobFinder from './screens/jobfinder/jobfinder';
import AddJob from "./screens/addjob/addjob";
import ViewJob from './screens/viewjob/viewjob';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/jobfinder",
    element: <JobFinder />,
  },
  {
    path: "/addjob",
    element: <AddJob />,
  },
  {
    path: "/viewjob/:jobId",
    element: <ViewJob />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);