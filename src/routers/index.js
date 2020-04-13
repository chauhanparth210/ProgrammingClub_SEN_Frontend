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
import QnA from "../components/QnA";
import AskQuestion from "../components/QnA/AskQuestion";
import DisplayAnswer from "../components/QnA/DisplayAnswer";
import WriteAnswer from "../components/QnA/WriteAnswer";

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
          <Route path="/qna" exact>
            <QnA />
          </Route>
          <Route path="/qna/:qID" exact>
            <DisplayAnswer />
          </Route>
          <Route path="/ask-question">
            <AskQuestion />
          </Route>
          <Route path="/qna/:qID/answer">
            <WriteAnswer />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default RouterPage;
