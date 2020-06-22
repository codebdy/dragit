import React, { useEffect } from "react";
import ElementRender from "./ElementRender";
import { RXElement } from "./RXElement";
import * as Yup from 'yup';
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { thunkPageSchema } from "store/page/thunks";
import PageForm from "./PageForm";
import { Container } from "@material-ui/core";
import PageSkeleton from "./PageSkeleton";
import { FormActionHandle } from './FormAction';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  title: Yup.string()
    ['required']('必须的'),
  comment: Yup.string()
    .required('Required'),
});

export default function PageView(props:{match: any }) {
  const{moduleId, pageId, dataId} = props.match.params;
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('PageView useEffect:', moduleId, pageId, dataId);
    dispatch(
      thunkPageSchema({moduleId:moduleId,pageId:pageId, dataId:dataId})
     );

  },[dispatch, moduleId, pageId, dataId]);
  
  return (
    <Container>      
      { pageInStore.schemaLoading &&
        <PageSkeleton />
      }

      <PageForm model={pageInStore.model} validationSchema = {validationSchema}>
        {(props: any, onFormAction: FormActionHandle)=>(
          pageInStore.schema?.map((child:RXElement)=>{
            return (
              <ElementRender key={child.id} element={child} formik={props} onFormAction={onFormAction}/>
            )
          })
        )}
      </PageForm>
    </Container>
  )
}