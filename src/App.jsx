import React from 'react'
import { Routes, Route } from 'react-router'

import { routes } from './routes'
import { AppHeader } from './cmps/AppCmps/AppHeader'

export function App() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes>
            </main>
        </div>
    )
}


