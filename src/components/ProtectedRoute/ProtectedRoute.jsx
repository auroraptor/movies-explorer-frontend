import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ onLogin }) {
  return (
    onLogin ? <Outlet /> : <Navigate to="/"/>
  )
}

export default ProtectedRoute;
