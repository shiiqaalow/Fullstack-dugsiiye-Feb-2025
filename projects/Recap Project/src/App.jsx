import React, {Profiler} from "react";
import { Routes, Route } from "react-router";
import  { Header }  from "./Components/Header";
import Footer from "./Components/Footer";
import Home from './pages/Home'
import { Articles } from './pages/Articles'
import Article from './pages/Article'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {UnAuthenticatedRoutes} from "./Components/UnAuthenticatedRoutes";
import { ArticleEditor } from "./pages/ArticleEditor";
import { ManageArticles } from "./pages/ManageArticles";
import Profile from "./pages/Profile";
import {ProtectedRoutes} from "./Components/ProtectedRoutes";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="">
      {/* Header */}
      <Header/>
      {/* main */}
      <main>
        <Routes>
          {/* public routes */}

          <Route path="/" element={<Home/>} />
          <Route path="articles" element={<Articles/>} />
          <Route path="articles/:id" element={<Articles/>} />

          {/* private routes */}

          <Route path="signin" element=
            { 
              <UnAuthenticatedRoutes>
                <SignIn/>
              </UnAuthenticatedRoutes>
            }
          />
          <Route path="signup" element=
            {
              <UnAuthenticatedRoutes>
                <SignUp/>
              </UnAuthenticatedRoutes>
            } 
          />

          {/* protected routes */}
          
          <Route path="editor" element=
            {
              <ProtectedRoutes>
                <ArticleEditor/>
              </ProtectedRoutes>
            } 
          />
          <Route path="editor/:id" element=
            {
              <ProtectedRoutes>
                <ArticleEditor/>
              </ProtectedRoutes>
            } 
          />
          <Route path="manage-articles" element=
            {
              <ProtectedRoutes>
                <ManageArticles/>
              </ProtectedRoutes>
            } 
          />
          <Route path="profile" element=
            {
              <ProtectedRoutes>
                <Profile/>
              </ProtectedRoutes>
            } 
          />


        </Routes>
      </main>
      
      {/* Footer */}
      <Footer/>

      <Toaster />
      
    </div>
  );
};

export default App;
