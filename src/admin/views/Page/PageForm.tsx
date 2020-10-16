import React from 'react';
import { Formik, Form } from 'formik';

import { PageAction, JUMP_TO_PAGE_ACTION, GO_BACK_ACTION, PageJumper } from './PageAction';
import { withRouter } from 'react-router-dom';

const resolvePageUrl=(page:PageJumper)=>{
  return `/admin/module/${page.moduleId}/${page.pageId}` + (page.dataId ? '/' + page.dataId : '' );
}

const PageForm = (props:any) =>{
  const {children, history, model, validationSchema} = props;

  const formActionHandle = (action:PageAction)=>{
    switch (action.name){
      case JUMP_TO_PAGE_ACTION:
        const url = resolvePageUrl(action.page);
        history.push(url);
        return;
        
      case GO_BACK_ACTION:
        history.goBack();
        return;
        
      //case POST_DATA_ACTION:
      //  console.log('POST_DATA_ACTION', action)
      //  return;
    }
    
  }

  //console.log('PageForm', model);
  return (
    <Formik
      enableReinitialize
      initialValues={model}
      validationSchema={validationSchema}
      onSubmit={formModel => {
        // same shape as initial values
        console.log('Form submit');
        console.log(formModel);
      }}
    >
      {(props) => {

        return(
          <Form>
            {
              children(props, formActionHandle)
            }
          </Form>
        )
      }}
    </Formik>
  )
}

export default withRouter(PageForm)