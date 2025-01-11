import { Navigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

// eslint-disable-next-line react/prop-types
export function PrivateRouter({children}) {
    
    const { isSigned } = useAuth()

    if(!isSigned) {
        return <Navigate to={'/auth'} state={{from: location.pathname}} replace />
    }

    return children
}