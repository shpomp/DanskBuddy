import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initStorage } from "./utils/initStorage.js";
import { AppProvider } from "./context/AppContext.jsx";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import MessagesPage from "./components/Messages/MessagesPage.jsx";
import ChatWindow from "./components/Messages/ChatWindow.jsx";
import Login from "./components/Auth/Login.jsx";
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
        path: "messages",
        element: <MessagesPage />,
      },
      {
        path: "messages/:userId",
        element: <ChatWindow />,
      },
       {
        path: "/login",
        element: <Login />,
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
