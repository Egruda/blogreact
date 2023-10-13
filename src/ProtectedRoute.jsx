import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = ({token}) => {
    if (token === false) {
        return <Navigate to="/login" /> 
    }

    return <Outlet />
}

export default ProtectedRoute