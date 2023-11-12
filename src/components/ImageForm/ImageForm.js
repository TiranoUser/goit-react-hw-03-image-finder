import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

const contactSchema = Yup.object().shape({
  query: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

export const ImageForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        query: '',
      }}
      validationSchema={contactSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
      }}
    >
      <Form>
        <Field id="query" name="query" placeholder="enter name img" />
        <ErrorMessage name="query" />

        <button type="submit">Find Image</button>
      </Form>
    </Formik>
  );
};
