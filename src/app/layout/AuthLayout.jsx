import { NavLink } from "react-router-dom";
import { Signup } from "../../pages/signup/signup";

export function AuthLayout() {

    return (
        <>
        <Signup />
        <p className="auth_text">Не зарегистрированы? <br /> <NavLink to={'/login'} replace>Регистрация</NavLink></p>
        </>
    )
}