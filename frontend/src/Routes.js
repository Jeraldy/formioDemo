import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RequireAuth from '@auth-kit/react-router/RequireAuth'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';

const Secure = (Comp) => {
    return (
        <RequireAuth fallbackPath={'/login'}>{Comp}</RequireAuth>
    )
}

const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/'} element={Secure(<Home />)}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent