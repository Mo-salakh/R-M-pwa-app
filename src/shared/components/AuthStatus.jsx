import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/store/AuthContext";

export function AuthStatus() {
    
    const navigate = useNavigate()
    const { user, signout, isSigned } = useAuth()
    

    function handleSignout() {
        signout(() => {
            navigate('/')
        })
    }
    
    if(!isSigned) {
        return (
            <>
                <p>Вы не вошли в систему</p>
                <button className="btn"><NavLink to={'/auth'}>Войти</NavLink></button>
            </>
        )
    } else {
        return (
            <>
                <p> Добро пожаловать, {user?.name} </p>
                <button onClick={handleSignout}>Выход</button>
            </>
        )
    }

}