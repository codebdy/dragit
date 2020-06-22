import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormAction, JUMP_TO_PAGE_ACTION, GO_BACK_ACTION, PageJumper } from './FormAction';
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

const resolvePageUrl=(page:PageJumper)=>{
  return `/admin/module/${page.moduleId}/${page.pageId}` + (page.dataId ? '/' + page.dataId : '' );
}

const PageForm = (props:any) =>{
  const {children, history} = props;
  const formActionHandle = (action:FormAction)=>{
    switch (action.name){
      case JUMP_TO_PAGE_ACTION:
        const url = resolvePageUrl(action.page);
        history.push(url);
        return;
        
      case GO_BACK_ACTION:
        history.goBack();
        return;    
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