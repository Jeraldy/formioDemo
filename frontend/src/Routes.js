import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RequireAuth from '@auth-kit/react-router/RequireAuth'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import CreateNewForm from './pages/CreateNewForm';
import FormViewer from './pages/FormViewer';
import BpmnModelerPage from './bpmn/BpmnModelerPage';
import BpmnViewerPage from './bpmn/BpmnViewerPage';

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
                <Route path={'/'} element={Secure(<Home />)} />
                <Route path={'/form-builder/:id?'} element={Secure(<CreateNewForm />)} />
                <Route path={'/form-render/:id'} element={Secure(<FormViewer />)} />
                <Route path={'/workflow-builder/:id?'} element={Secure(<BpmnModelerPage />)} />
                <Route path={'/workflow-render/:id'} element={Secure(<BpmnViewerPage />)} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent