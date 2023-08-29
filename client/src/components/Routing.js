import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout.js";


function Routing() {

  const baseUrl = ``;

  return (
    <Layout>
      <Routes>
        <Route
          exact
          path={`/`}
          element={
            <div>
              <h1>Home Page</h1>
            </div>
          }
        ></Route>
      </Routes>
    </Layout>
  );
}
export default Routing;
