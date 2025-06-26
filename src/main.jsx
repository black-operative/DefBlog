import { Provider }                            from 'react-redux'
import { StrictMode }                          from 'react'
import { createRoot }                          from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'

import App           from './App.jsx'
import store         from './store/store.js';
import { Protected } from './components'
import { 
    AllPosts, 
    EditPost, 
    Home, 
    Post, 
    Login, 
    Singup, 
    AddPost
} from './pages';

const router = createBrowserRouter(
    [
        {
            path : '/',
            element : <App />,
            children : [
                { path : '/',                element : <Home />                                                     },
                { path : '/login',           element : <Protected authentication = {false}> <Login />  </Protected> }, 
                { path : '/signup',          element : <Protected authentication = {false}> <Singup /> </Protected> },
                { path : '/all-posts',       element : <Protected authentication> {" "} <AllPosts />   </Protected> },
                { path : '/add-post',        element : <Protected authentication> {" "} <AddPost />   </Protected> },
                { path : '/edit-post/:slug', element : <Protected authentication> {" "} <EditPost />   </Protected> },
                { path : '/post/:slug',      element : <Post />                                                     }     
            ]
        }
    ]
);


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router = {router} />
        </Provider>
    </StrictMode>,
)
