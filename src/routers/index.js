import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "../components/NavBar";
import HomePage from "../components/HomePage";
import LoginPage from "../components/Auth/Login";

function RouterPage() {
  return (
    <>
      <NavBar />
      <div style={{ height: "90vh" }}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default RouterPage;
