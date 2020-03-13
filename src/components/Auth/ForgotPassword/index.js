import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const ForgotPassword = ({ errors, touched, handleSubmit, isSubmitting }) => {
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
          <button
            disabled={isSubmitting}
            type="submit"
            className="form__submit"
          >
            Send Email
          </button>
        </div>
      </Form>
    </div>
  );
};

const FormikEnhance = withFormik({
  mapPropsToValues: ({ studentID }) => {
    return {
      studentID: studentID || ""
    };
  },
  validationSchema: Yup.object().shape({
    studentID: Yup.number("StudentID must be number").required(
      "StudentID is required "
    )
  }),
  handleSubmit: (
    values,
    { resetForm, setSubmitting, setErrors, ...formikBag }
  ) => {
    console.log(values);
    resetForm();
    setSubmitting(false);
  }
})(ForgotPassword);

export default FormikEnhance;
