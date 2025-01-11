import { NavLink, Outlet } from "react-router-dom";
import { AuthStatus } from "../../shared/components/AuthStatus";
import { Suspense } from "react";

export function HomeLayout() {
    return (
        <>
            <nav className="nav">
                <ul className="nav_list">
                    <li className="nav_item"><NavLink to={'/'}>Главная</NavLink></li>
                    <li className="nav_item"><NavLink to={'/characters'}>Герои</NavLink></li>
                    <li className="nav_item"><NavLink to={'/locations'}>Локации</NavLink></li>
                    <li className="nav_item"><NavLink to={'/episodes'}>Эпизоды</NavLink></li>
                    <AuthStatus />
                </ul>
            </nav>

            <div className="content">
                <Suspense fallback={<h2 className="title">Загрузка страницы...</h2>}>
                    <Outlet />
                </Suspense>
            </div>
        </>
    )
}