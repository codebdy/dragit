import React, { useEffect } from "react";
import ElementRender from "./ElementRender";
import { RXElement } from "./RXElement";

import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { thunkPageSchema, thunkModuleIndexSchema } from "store/page/thunks";
import PageForm from "./PageForm";
import { Container } from "@material-ui/core";
import PageSkeleton from "./PageSkeleton";
import { FormActionHandle } from './FormAction';

export default function PageView(props:{match: any }) {
  const{moduleId, pageId} = props.match.params;
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('PageView useEffect:', moduleId, pageId);
    dispatch(
      pageId ? thunkPageSchema(pageId) : thunkModuleIndexSchema(moduleId)
    );

  },[dispatch, moduleId, pageId]);
  
  return (
    <Container>      
      { pageInStore.schemaLoading &&
        <PageSkeleton />
      }

      <PageForm>
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