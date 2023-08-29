import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout.js";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";


function Routing() {

  const baseUrl = ``;

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
      </Routes>
    </Layout>
  );
}
export default Routing;
