import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

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

const FormikEnhance = withFormik({
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
    let { from } = formikBag.props.location.state || {
      from: { pathname: "/" },
    };
    formikBag.props.loginUser(values, formikBag.props.history, from);
    resetForm();
    setSubmitting(false);
  },
})(AskQuestion);

export default FormikEnhance;
