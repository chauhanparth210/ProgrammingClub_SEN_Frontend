import React from "react";
import { withFormik, Form, Field } from "formik";
import { NavLink, withRouter } from "react-router-dom";
import * as Yup from "yup";
import { connect } from "react-redux";
import { loginUser } from "../../../store/Actions/authActions";

import "./style.scss";

const LoginPage = ({ errors, touched, handleSubmit, isSubmitting }) => {
  return (
    <div className="form">
      <Form onSubmit={handleSubmit} className="form__container">
        <div className="form__wrapper">
          <span className="form__header--text">Log in</span>
        </div>
        <div className="form__wrapper">
          <Field
            type="number"
            name="studentID"
            placeholder="Student ID"
            className="form__input"
          />
          {touched.studentID && errors.studentID && (
            <div className="form__error">{errors.studentID}</div>
          )}
        </div>
        <div className="form__wrapper">
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="form__input"
          />
          {touched.password && errors.password && (
            <div className="form__error">{errors.password}</div>
          )}
        </div>
        <div className="form__wrapper">
          <div className="form__wrap">
            <button
              disabled={isSubmitting}
              type="submit"
              className="form__submit"
            >
              Log in
            </button>
            <NavLink to="/forgot-password" className="form__navbar--text">
              Forgot Password ?
            </NavLink>
          </div>
        </div>
        <div className="form__wrapper">
          <NavLink to="/create-account" className="form__navbar--text">
            Create New Account ?
          </NavLink>
        </div>
      </Form>
    </div>
  );
};

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ studentID, password }) => {
      return {
        studentID: studentID || "",
        password: password || ""
      };
    },
    validationSchema: Yup.object().shape({
      studentID: Yup.number("StudentID must be number")
        .required("StudentID is required ")
        .positive("ID must be positive")
        .integer("ID must be integer")
        .test("length", "Student ID must be exactly 9 digits", val => {
          if (val) {
            return val.toString().length === 9;
          }
        })
        .min(200000000, "Invalide ID")
        .max(209909999, "Invalide ID"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be 6 characters long")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      let { from } = formikBag.props.location.state || {
        from: { pathname: "/" }
      };
      formikBag.props.loginUser(values, formikBag.props.history, from);
      resetForm();
      setSubmitting(false);
    }
  })(LoginPage)
);

export default connect(null, { loginUser })(FormikEnhance);
