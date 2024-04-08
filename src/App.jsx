import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppCmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './cmps/BoardCmps/BoardDetails'
import { TaskDetails } from './cmps/TaskCmps/TaskDetails'

export function App() {

    return (
        <>
            <AppHeader />
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/board" element={<BoardIndex />} />
                    <Route path="/board/:boardId" element={<BoardDetails />}>
                        <Route path="/board/:boardId/:groupId/:taskId" element={<TaskDetails />} />
                    </Route>
                </Routes>
            </main>
        </>
    )
}


