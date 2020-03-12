import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import "./style.scss";

const LoginPage = ({ errors, touched, handleSubmit, isSubmitting }) => {
  return (
    <div className="form">
      <Form onSubmit={handleSubmit} className="form__container">
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
            type="string"
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
            Log in
          </button>
        </div>
      </Form>
    </div>
  );
};

const FormikEnhance = withFormik({
  mapPropsToValues: ({ studentID, password }) => {
    return {
      studentID: studentID || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    studentID: Yup.number("StudentID must be number").required(
      "StudentID is required "
    ),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be 6 characters long")
  }),
  handleSubmit: (
    values,
    { resetForm, setSubmitting, setErrors, ...formikBag }
  ) => {
    console.log(values);
    resetForm();
    setSubmitting(false);
  }
})(LoginPage);

export default FormikEnhance;
