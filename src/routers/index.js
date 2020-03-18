import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "../components/NavBar";
import HomePage from "../components/HomePage";
import LoginPage from "../components/Auth/Login";
import EditorPage from "../components/Blog/CreateBlog";
import SignUpPage from "../components/Auth/SignUp";
import ForgotPassword from "../components/Auth/ForgotPassword";
import BlogPost from "../components/Blog/ViewBlog";
import Blogs from "../components/Blog/Blogs";
import ResetPasswordLink from "../components/Auth/ResetPassword";

function RouterPage() {
  return (
    <>
      <NavBar />
      <div style={{ height: "90vh" }}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/create-blog">
            <EditorPage />
          </Route>
          <Route path="/create-account">
            <SignUpPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/blog/:post_id">
            <BlogPost />
          </Route>
          <Route path="/reset-password/:token">
            <ResetPasswordLink />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default RouterPage;
