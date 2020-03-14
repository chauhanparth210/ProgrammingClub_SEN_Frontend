import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "../components/NavBar";
import HomePage from "../components/HomePage";
import LoginPage from "../components/Auth/Login";
import EditorPage from "../components/Blog/CreateBlog";
import SignUpPage from "../components/Auth/SignUp";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ViewBlog from "../components/Blog/ViewBlog";

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
          <Route path="/create-blog" exact>
            <EditorPage />
          </Route>
          <Route path="/create-account" exact>
            <SignUpPage />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/blog" exact>
            <ViewBlog />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default RouterPage;
