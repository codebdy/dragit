import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormAction, JUMP_TOP_PAGE_ACTION, GO_BACK_ACTION } from './FormAction';
import { withRouter } from 'react-router-dom';

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  name: Yup.string()
    ['required']('必须的'),
  comment: Yup.string()
    .required('Required'),
});

const PageForm = (props:any) =>{
  const {children, history} = props;
  const formActionHandle = (action:FormAction)=>{
    if(action.name === JUMP_TOP_PAGE_ACTION){
      const url = '/admin/page/' + action.pageId + (action.dataId ? '/' + action.dataId : '' );
      history.push(url);
      return;
    }
    if(action.name === GO_BACK_ACTION){
      history.goBack();
    }
    
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

export default withRouter(PageForm)