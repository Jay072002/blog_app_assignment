import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout.js";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ArticlePage from "../pages/ArticlePage.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import Home from "../pages/Home.jsx";
import { useAppState } from "../AppContext.jsx";



function Routing() {

  const { isLogin } = useAppState()


  return (
    <Layout>
      <Routes>
        <Route
          exact
          path={`/login`}
          element={
            <Login />
          }
        ></Route>
        <Route
          exact
          path={`/register`}
          element={
            <Register />
          }
        ></Route>
        <Route
          exact
          path={'/article'}
          element={
            isLogin ? <ArticlePage /> : <Login />
          }
        />
        <Route
          exact
          path={'/profile/:userId'}
          element={
            isLogin ? <UserProfile /> : <Login />
          }
        />
        <Route
          exact
          path={'/'}
          element={
            <Home />
          }
        />

      </Routes>
    </Layout>
  );
}
export default Routing;
