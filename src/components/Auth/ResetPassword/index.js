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
            Reset Password
          </span>
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
          <Field
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            className="form__input"
          />
          {touched.cpassword && errors.cpassword && (
            <div className="form__error">{errors.cpassword}</div>
          )}
        </div>
        <div className="form__wrapper">
          <button
            disabled={isSubmitting}
            type="submit"
            className="form__submit"
          >
            Change Password
          </button>
        </div>
      </Form>
    </div>
  );
};

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ password, cpassword }) => {
      return {
        password: password || "",
        cpassword: cpassword || ""
      };
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be 6 characters long"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), "Password doesn't match."])
        .required("Password confirm is required")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      const { password } = values;
      axios
        .post(
          `${SERVER_URL}/auth/reset-password/${formikBag.props.match.params.token}`,
          { password }
        )
        .then(res => {
          console.log("reset-password");
          // toast.success(`${res.data.message}`);
          resetForm();
          setSubmitting(false);

          formikBag.props.history.push("/");
        })
        .catch(err => {
          if (typeof err.response !== undefined) {
            //   toast.error(`Unable to reset a password!..`);
          } else {
            //   toast.error(`${err.response.data.message}`);
          }
        });
    }
  })(ForgotPassword)
);

export default FormikEnhance;
