import { IRule } from "base/Rules/IRule";
import { Rule } from "base/Rules/Rule";
//import withMargin from "./HOCs/withMargin";
import withSkeleton from "./HOCs/withSkeleton";
import { IMeta } from "./Model/IMeta";

var compoentsMap : { 
  [key: string]: {
    component?:any,
    rule:IRule,
  }
} = {}

function register(name:string, component:any, rule:any = Rule): any{
  compoentsMap[name] = {
    component,
    rule: new rule()
  }
}

function registerHtmlTag(name:string, rule:any = Rule){
  compoentsMap[name] = {
    rule: new rule()
  }  
}

function resolveComponent(meta:IMeta, withField = true):any{
  //const {marginTop, marginRight, marginBottom, marginLeft} = meta.props || {};
  const name = meta.name;
  let component = compoentsMap[name] && compoentsMap[name].component ? compoentsMap[name].component : name;

  //component = marginTop || marginRight || marginBottom || marginLeft ? withMargin(component) : component;

  if(meta.props?.field && withField){
    component = withSkeleton(component);
  }
  return component;
}

function resolveRule(name:string):IRule{
  return  compoentsMap[name] ? compoentsMap[name].rule : new Rule();
}

export {register, resolveComponent, resolveRule, registerHtmlTag}