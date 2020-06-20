import React, { useEffect } from "react";
import ElementRender from "./ElementRender";
import { RXElement } from "./RXElement";

import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { thunkPageSchema } from "store/page/thunks";
import PageForm from "./PageForm";
import { Container } from "@material-ui/core";
import PageSkeleton from "./PageSkeleton";


export default function PageView(props:{match: any }) {
   const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('PageView useEffect:', props.match.params.id);
    dispatch(thunkPageSchema(props.match.params.id));

  },[dispatch, props.match.params.id]);
  
  return (
    <Container>      
      { pageInStore.schemaLoading &&
        <PageSkeleton />
      }

      <PageForm>
        {(props: any)=>(
          pageInStore.schema?.map((child:RXElement)=>{
            return (
              <ElementRender key={child.id} element={child} formik={props}/>
            )
          })
        )}
      </PageForm>
    </Container>
  )
}