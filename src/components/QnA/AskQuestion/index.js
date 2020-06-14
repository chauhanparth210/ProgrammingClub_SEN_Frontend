import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SERVER_URL } from "../../../utils/constants";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
        {/* <div className="form__wrapper"> */}
        <span className="form__header--text">Ask your question...</span>
        {/* </div> */}
        <div className="form__wrapper" style={{ margin: "2rem 8%" }}>
          <Field
            name="question"
            as="textarea"
            className="form__input qna__input"
            placeholder="Ask question"
            style={{
              height: "18rem",
              resize: "none",
              border: "none",
              background: "#F4FFFF",
              fontSize: "2.5rem",
            }}
          />
          {touched.question && errors.question && (
            <div className="form__error">{errors.question}</div>
          )}
        </div>
        <div className="form__wrapper" style={{ margin: "2rem 8%" }}>
          {/* <div className="form__wrap"> */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="form__submit"
          >
            + Post Question
          </button>
          {/* </div> */}
        </div>
      </Form>
    </div>
  );
};

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ question }) => {
      return {
        question: question || "",
      };
    },
    validationSchema: Yup.object().shape({
      question: Yup.string().required("Question is required"),
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      axios
        .post(`${SERVER_URL}/question`, {
          question: values.question,
          user: formikBag.props.id,
        })
        .then((res) => {
          // toast.success(`${res.data.message}`);
          resetForm();
          setSubmitting(false);
          formikBag.props.history.push("/qna");
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
