import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function NotFound() {


    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate(-1)
        }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <h1 className="not_found_title">Страница не найдена 404</h1>
    )
}