import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@material-ui/core';

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  name: Yup.string()
    ['required']('必须的'),
  comment: Yup.string()
    .required('Required'),
});

export default function PageForm(props:{children?:any}){
  const {children} = props;

  return (
    <Formik
      initialValues={{
        email: '', name: '', comment: ''
      }}
      validationSchema={validateSchema}

      onSubmit={values => {
        // same shape as initial values
        console.log('Form submit');
        console.log(values);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return(
          <Form>
            <TextField
              error ={!!errors['name'] && !!touched['name']}
              label="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(errors.name && touched.name) && errors.name}
              margin="normal"
            />
            {children(props)}
          </Form>
        )
      }}
    </Formik>
  )
}
