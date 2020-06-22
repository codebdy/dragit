import React from 'react';
import { Formik, Form } from 'formik';

import { FormAction, JUMP_TO_PAGE_ACTION, GO_BACK_ACTION, PageJumper } from './FormAction';
import { withRouter } from 'react-router-dom';

const resolvePageUrl=(page:PageJumper)=>{
  return `/admin/module/${page.moduleId}/${page.pageId}` + (page.dataId ? '/' + page.dataId : '' );
}

const PageForm = (props:any) =>{
  const {children, history, model, validationSchema} = props;

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
  const formikView = (
    <Formik
      initialValues={model}
      validationSchema={validationSchema}
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
  //console.log('PageForm', model);
  return (
    //为了刷新initialValues并且显示字段的skeleton
    model ? formikView : <div>{formikView}</div>
  )
}

export default withRouter(PageForm)