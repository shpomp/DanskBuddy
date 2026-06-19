import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { initStorage } from "./utils/initStorage";
import { AppProvider } from "./context/AppContext";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Login from "./components/Auth/Login.jsx";
import MatchesList from "./components/Matches/MatchesList.jsx";

import MessagesPage from "./components/Messages/MessagesPage.jsx";

import Register from "./components/Auth/Register.jsx";
import "./main.css";
function Placeholder({ name }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
      <p className="text-2xl">🚧</p>
      <p className="text-lg font-medium mt-2">{name} — coming soon</p>
    </div>
  );
}
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
initStorage();
const router = createBrowserRouter([
  // Public routes — OUTSIDE Layout, no navbar
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  // Protected routes — INSIDE Layout, has navbar
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/browse",
        element: (
          <ProtectedRoute>
            <Placeholder name="Browse" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/matches",
        element: (
          <ProtectedRoute>
            <MatchesList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/messages",
        element: (
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/messages/:userId",
        element: (
          <ProtectedRoute>
            <Placeholder name="Chat" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/feed",
        element: (
          <ProtectedRoute>
            <Placeholder name="Feed" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/me",
        element: (
          <ProtectedRoute>
            <Placeholder name="My Profile" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <Placeholder name="Public Profile" />
          </ProtectedRoute>
        ),
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
