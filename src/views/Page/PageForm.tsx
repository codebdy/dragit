import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormAction } from './FormAction';

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
  const formActionHandle = (action:FormAction)=>{
    console.log('Process Form Action:', action);
  }

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
        return(
          <Form>
            {children(props, formActionHandle)}
          </Form>
        )
      }}
    </Formik>
  )
}
