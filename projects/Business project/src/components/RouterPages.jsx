import { createBrowserRouter } from "react-router";
import { NotFound } from "./NotFound";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Header } from "./Header";
import { Daily } from "../pages/Daily";
import { Weekly } from "../pages/Weekly";
import { Monthly } from "../pages/Monthly";
import { Yearly } from "../pages/Yearly";

import App from "../App";
import { Profile } from "../pages/Profile";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: 'true',
                element: <Home/>
            },
            {
                path: 'dashboard',
                element: <Dashboard/>
            },
            {
                path: 'header',
                element: <Header/>
            },
            {
                path: 'signin',
                element: <SignIn/>
            },
            {
                path: 'signup',
                element: <SignUp/>
            },
            {
                path: 'daily',
                element: <Daily/>
            },
            {
                path: 'weekly',
                element: <Weekly/>
            },
             {
                path: 'monthly',
                element: <Monthly/>
            },
            {
                path: 'yearly',
                element: <Yearly/>
            },
            {
                path: 'profile',
                element: <Profile/>
            },
            {
                path: 'overview',
                element: <Home/>
            },
            {
                path: 'analytics',
                element: <Home/>
            },
            {
                path: 'customers',
                element: <Home/>
            },
            {
                path: 'sales',
                element: <Home/>
            },
            {
                path: 'settings',
                element: <Home/>
            },
           
        ]
    }
])