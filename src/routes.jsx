import { HomePage } from './pages/HomePage.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'


// Routes accesible from the main navigation (in AppHeader)
export const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'board',
        component: <BoardIndex />,
        label: 'Board'
    },
]

