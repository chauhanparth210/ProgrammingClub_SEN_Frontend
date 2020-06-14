import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../../store/Actions/authActions";

const SignUpPage = ({ errors, touched, handleSubmit, isSubmitting }) => {
  return (
    <div className="form">
      <Form onSubmit={handleSubmit} className="form__container">
        <div className="form__wrapper">
          <span className="form__header--text">Sign Up</span>
        </div>
        <div className="form__wrapper">
          <Field
            type="text"
            name="name"
            placeholder="Student Name"
            className="form__input"
          />
          {touched.name && errors.name && (
            <div className="form__error">{errors.name}</div>
          )}
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
          <button
            disabled={isSubmitting}
            type="submit"
            className="form__submit"
          >
            Create Account
          </button>
        </div>
      </Form>
    </div>
  );
};

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ studentID, password, name }) => {
      return {
        name: name || "",
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
        .min(6, "Password must be 6 characters long"),
      name: Yup.string().required("Name is required")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      formikBag.props.registerUser(values, formikBag.props.history);
      resetForm();
      setSubmitting(false);
    }
  })(SignUpPage)
);

export default connect(null, { registerUser })(FormikEnhance);
