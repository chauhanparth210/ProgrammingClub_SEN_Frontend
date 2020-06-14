import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { toast } from "react-toastify";
import { SERVER_URL } from "../../../utils/constants";
import { withRouter } from "react-router-dom";

const ForgotPassword = ({ errors, touched, handleSubmit, isSubmitting }) => {
  return (
    <div className="form">
      <Form
        onSubmit={handleSubmit}
        className="form__container"
        style={{ marginTop: "4%" }}
      >
        <div className="form__wrapper">
          <span className="form__header--text" style={{ fontSize: "3.5rem" }}>
            Forgot Password
          </span>
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

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ studentID }) => {
      return {
        studentID: studentID || ""
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
        .max(209909999, "Invalide ID")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      axios
        .post(`${SERVER_URL}/auth/reset-password`, values)
        .then(res => {
          // toast.success(`${res.data.message}`);
          resetForm();
          setSubmitting(false);
          formikBag.props.history.push("/");
        })
        .catch(err => {
          // if (typeof err.response !== undefined) {
          //   toast.error(`Unable to send the mail!..`);
          // } else {
          // toast.error(`${err.response.data.message}`);
          // }
        });
    }
  })(ForgotPassword)
);

export default FormikEnhance;
