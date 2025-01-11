import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRouter } from "./privateRouter";
import { HomeLayout } from "../../layout/HomeLayout";


function AppRouter() {

    const Home = lazy(() => import('../../../pages/home/home').then((module) => ({default: module.Home})))
    const Characters = lazy(() => import('../../../pages/characters/characters').then((module) => ({default: module.Characters})))
    const Locations = lazy(() => import('../../../pages/locations/locations').then((module) => ({default: module.Locations})))
    const Episodes = lazy(() => import('../../../pages/episodes/episodes').then((module) => ({default: module.Episodes})))
    const NotFound = lazy(() => import('../../../pages/notFound/notFound').then((module) => ({default: module.NotFound})))
    const Character = lazy(() => import('../../../widgets/character').then((module) => ({default: module.Character})))
    const Location = lazy(() => import('../../../widgets/location').then((module) => ({default: module.Location})))
    const Episode = lazy(() => import('../../../widgets/episode').then((module) => ({default: module.Episode})))
    const Signin = lazy(() => import('../../../pages/signin/signin').then((module) => ({default: module.Signin})))
    const AuthLayout = lazy(() => import('../../layout/AuthLayout').then((module) => ({default: module.AuthLayout})))

    return (
        <>
            <Routes basename='/R-M-pwa-app'>
              <Route path='/' element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path='characters' element={<PrivateRouter><Characters /></PrivateRouter>}>
                  <Route path=":id" element={<Character />} />
                </Route>
                <Route path='locations' element={<PrivateRouter><Locations /></PrivateRouter>}>
                  <Route path=':id' element={<Location />} />
                </Route>
                <Route path='episodes' element={<PrivateRouter><Episodes /></PrivateRouter>}>
                  <Route path=':id' element={<Episode />} />
                </Route>
                <Route path='*' element={<NotFound />} />
              </Route>
              <Route path='auth' element={<Suspense fallback={'Загрузка...'}> <AuthLayout /> </Suspense>} />
              <Route path='login' element={<Suspense fallback={'Загрузка...'}> <Signin /> </Suspense>} />
            </Routes>
        </>
    )
}


export { AppRouter }