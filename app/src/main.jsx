import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initStorage } from "./utils/initStorage";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import Login from "./components/Auth/Login.jsx";
import MyProfile from "./components/MyProfile/MyProfile.tsx";
import "./main.css";
initStorage();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "nested",
        element: <TestPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile/me",
        element: <MyProfile />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
