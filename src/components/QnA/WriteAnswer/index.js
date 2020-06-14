import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../../utils/constants";

const AskQuestion = ({
  errors,
  touched,
  handleSubmit,
  isSubmitting,
  values,
}) => {
  return (
    <div className="form">
      <Form
        onSubmit={handleSubmit}
        className="form__container"
        style={{ top: "15%" }}
      >
        <span className="form__header--text">Post your answer</span>
        <div className="form__wrapper" style={{ margin: "2rem 8%" }}>
          <Field
            name="answer"
            as="textarea"
            className="form__input qna__input"
            placeholder="Write your answer..."
            style={{
              height: "18rem",
              resize: "none",
              border: "none",
              background: "#F4FFFF",
              fontSize: "2.5rem",
            }}
          />
          {touched.answer && errors.answer && (
            <div className="form__error">{errors.answer}</div>
          )}
        </div>
        <div className="form__wrapper" style={{ margin: "2rem 8%" }}>
          {/* <div className="form__wrap"> */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="form__submit"
          >
            + Post it
          </button>
          {/* </div> */}
        </div>
      </Form>
    </div>
  );
};

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ answer }) => {
      return {
        answer: answer || "",
      };
    },
    validationSchema: Yup.object().shape({
      answer: Yup.string().required("Answer is required"),
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      const { params } = formikBag.props.match;
      axios
        .post(`${SERVER_URL}/question/${params.qID}`, {
          answer: values.answer,
          user: formikBag.props.id,
        })
        .then((res) => {
          // toast.success(`${res.data.message}`);
          resetForm();
          setSubmitting(false);
          console.log(formikBag.props);
          formikBag.props.history.goBack();
        })
        .catch((err) => {
          // if (typeof err.response !== undefined) {
          //   toast.error(`Unable to send the mail!..`);
          // } else {
          // toast.error(`${err.response.data.message}`);
          // }
        });
    },
  })(AskQuestion)
);

const mapStateToProps = (state) => ({
  id: state.auth.user.id,
});

export default connect(mapStateToProps)(FormikEnhance);
