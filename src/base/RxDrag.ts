import { FieldType } from "base/FieldType";
import { IRule } from "base/Rules/IRule";
import { Rule } from "base/Rules/Rule";
//import withMargin from "./HOCs/withMargin";
import withSkeleton from "./HOCs/withSkeleton";
import { IMeta } from "./Model/IMeta";

var componentsMap : { 
  [key: string]: {
    component?:any,
    rule:IRule,
    fieldType?:FieldType,
  }
} = {}

function register(name:string, component:any, rule:any = Rule, fieldType:FieldType = FieldType.Normal): any{
  componentsMap[name] = {
    component,
    rule: new rule(),
    fieldType: fieldType,
  }
}

function registerHtmlTag(name:string, rule:any = Rule){
  componentsMap[name] = {
    rule: new rule()
  }  
}

function resolveComponent(meta:IMeta, withField = true):any{
  //const {marginTop, marginRight, marginBottom, marginLeft} = meta.props || {};
  const name = meta.name;
  const componetNode = componentsMap[name];
  let component = componetNode && componetNode.component ? componetNode.component : name;

  //component = marginTop || marginRight || marginBottom || marginLeft ? withMargin(component) : component;

  if(meta.props?.field && withField && componetNode.fieldType !== FieldType.Model){
    component = withSkeleton(component);
  }
  return component;
}

function resolveRule(name:string):IRule{
  return  componentsMap[name] ? componentsMap[name].rule : new Rule();
}

function resolveFieldType(name:string):FieldType|undefined{
  return  componentsMap[name] ? componentsMap[name].fieldType : FieldType.Normal;
}

export {register, resolveComponent, resolveRule, registerHtmlTag, resolveFieldType}