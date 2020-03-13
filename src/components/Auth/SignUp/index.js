import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUpPage = ({ errors, touched, handleSubmit, isSubmitting }) => {
  return (
    <div className="form">
      <Form onSubmit={handleSubmit} className="form__container">
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
            Sign Up
          </button>
        </div>
      </Form>
    </div>
  );
};

const FormikEnhance = withFormik({
  mapPropsToValues: ({ studentID, password, name }) => {
    return {
      name: name || "",
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
      .min(6, "Password must be 6 characters long"),
    name: Yup.string().required("Name is required")
  }),
  handleSubmit: (
    values,
    { resetForm, setSubmitting, setErrors, ...formikBag }
  ) => {
    console.log(values);
    resetForm();
    setSubmitting(false);
  }
})(SignUpPage);

export default FormikEnhance;
