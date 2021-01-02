import { IRule } from "base/Rules/IRule";
import { Rule } from "base/Rules/Rule";
//import withMargin from "./HOCs/withMargin";
import { IMeta } from "./Model/IMeta";

var componentsMap : { 
  [key: string]: {
    component?:any,
    rule:IRule,
  }
} = {}

function register(name:string, component:any, rule:any = Rule): any{
  componentsMap[name] = {
    component,
    rule: new rule(),
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

  //if(meta.props?.field && withField && componetNode.fieldType !== FieldType.Model){
  //  component = withSkeleton(component);
  //}
  return component;
}

function resolveRule(name:string):IRule{
  return  componentsMap[name] ? componentsMap[name].rule : new Rule();
}
export {register, resolveComponent, resolveRule, registerHtmlTag}