import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import { AuthContext, AuthContextProvider } from './context/AuthContext.jsx';
import { ChatContext, ChatContextProvider } from './context/ChatContext.jsx';


const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext)
  if (!currentUser) {
    return <Navigate to="/login"></Navigate>
  }
  return children;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <App />
    </ProtectedRoute>
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
)
