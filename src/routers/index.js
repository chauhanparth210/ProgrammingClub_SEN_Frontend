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
import Contests from "../components/Contest"
import Home from "../components/Quiz/Home";
import QuizInstructions from "../components/Quiz/quiz/QuizInstructions";
import Play from "../components/Quiz/quiz/Play";
import QuizSummary from "../components/Quiz/quiz/QuizSummary.js";
import Discussion from "../components/Contest/Discussion";
import Compiler from "../components/Contest/Compiler";

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
          <Route path="/contests">
            <Contests />
          </Route>
          <Route path="/discussion/:title">
            <Discussion />
          </Route>
          <Route path="/compiler">
            <Compiler />
          </Route>
          <Route path="/quiz" exact component={Home} />
          <Route path="/play/instructions" exact component={QuizInstructions} />
          <Route path="/play/quiz" exact component={Play} />
          <Route path="/play/quizSummary" exact component={QuizSummary} />
        </Switch>
      </div>
    </>
  );
}

export default RouterPage;
