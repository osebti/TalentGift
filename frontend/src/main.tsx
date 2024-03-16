import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Survey from "./pages/Survey/Survey";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import Overview from "./pages/Overview";
import Report from "./pages/Report";
import AddMembers from "./pages/AddMembers";
import AddOrg from "./pages/AddOrg";
import Success from "./pages/Success";
import Error from "./pages/Error";
import PasswordChanged from "./pages/PasswordChanged";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import DelOrg from "./pages/DelOrg";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import EmailConfirm from "./pages/EmailConfirm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "survey",
        element: <Survey />,
      },
      {
        path: "org-survey",
        element: <Survey companySurvey={true}/>,
      },
      {
        path: "report/:uid",
        element: <Report />,
      },
      {
        path: "members",
        element: <Members />,
      },
      {
        path: "add-members",
        element: <AddMembers />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "create-org",
        element: <AddOrg />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "delete-org",
        element: <DelOrg />,
      },
    ],
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/error",
    element: <Error />,
  },

  {
    path: "/password-changed",
    element: <PasswordChanged />,
  },

  {
    path: "/change-password",
    element: <ChangePassword />,
  },

  {
    path: "/ResetPassword",
    element: <ResetPassword />,
  },

  {
    path: "/ConfirmEmail",
    element: <EmailConfirm />,
  },

 

  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
