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
import { PageActionHandle } from './PageAction';
import intl from 'react-intl-universal';

function contructRuleSchema(fields:Array<any>){
  let schema:any = {};
  fields&&fields.forEach(field=>{
    let rule = field.rule;
    if(rule && rule.valueType === "string"){
      let yupObj = Yup.string();
      yupObj = rule.required ? yupObj.required(intl.get('msg-required')) : yupObj;
      yupObj = rule.email ? yupObj.email(intl.get('msg-email')) : yupObj;
      yupObj = rule.url ? yupObj = yupObj.url(intl.get('msg-url')) : yupObj;
      yupObj = rule.length ? yupObj.length(rule.length, intl.get('msg-length')) : yupObj;
      yupObj = rule.min ? yupObj.min(rule.min, intl.get('msg-min')) : yupObj;
      yupObj = rule.max ? yupObj.max(rule.max, intl.get('msg-max')) : yupObj;
      yupObj = rule.matchesRegex ? yupObj.matches(rule.matchesRegex, intl.get('msg-matches')) : yupObj;
      schema[field.name] = yupObj;
    }

    if(rule && rule.valueType === "number"){
      let yupObj = Yup.number();
      yupObj = rule.required ? yupObj.required(intl.get('msg-required')) : yupObj;
      yupObj = rule.positive ? yupObj.positive(intl.get('msg-positive')) : yupObj;
      yupObj = rule.negative ? yupObj.negative(intl.get('msg-negative')) : yupObj;
      yupObj = rule.min ? yupObj.min(rule.min, intl.get('msg-min')) : yupObj;
      yupObj = rule.max ? yupObj.max(rule.max, intl.get('msg-max')) : yupObj;
      schema[field.name] = yupObj;
    }

    if(rule && rule.valueType === "date"){
      let yupObj = Yup.date();
      yupObj = rule.required ? yupObj.required(intl.get('msg-required')) : yupObj;
      yupObj = rule.min ? yupObj.min(rule.min, intl.get('msg-min')) : yupObj;
      yupObj = rule.max ? yupObj.max(rule.max, intl.get('msg-max')) : yupObj;
      schema[field.name] = yupObj;
    }
    if(rule && rule.valueType === "boolean"){
      let yupObj = Yup.boolean();
      schema[field.name] = yupObj;
    }
  })
  return  Yup.object().shape(schema);
}

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
      { pageInStore.schemaLoading ?
        <PageSkeleton />
      :
        <PageForm model={pageInStore.model} 
          validationSchema = {
            contructRuleSchema(pageInStore.pageJson?.fields)
          } 
          withoutForm = {pageInStore.pageJson?.withoutForm}
        >
          {(props: any, onPageAction: PageActionHandle)=>(
            pageInStore.schema?.map((child:RXElement)=>{
              return (
                <ElementRender key={child.id} element={child} formik={props} onPageAction={onPageAction}/>
              )
            })
          )}
        </PageForm>
      }
    </Container>
  )
}