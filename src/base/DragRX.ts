import { IRule } from "base/Rules/IRule";
import { Rule } from "base/Rules/Rule";
import withMargin from "./HOCs/withMargin";
import { IMeta } from "./IMeta";

var compoents : { 
  [key: string]: {
    component?:any,
    rule:IRule,
  }
} = {}

function register(name:string, component:any, rule:any = Rule): any{
  compoents[name] = {
    component,
    rule: new rule()
  }
}

function registerHtmlTag(name:string, rule:any = Rule){
  compoents[name] = {
    rule: new rule()
  }  
}

function resolveComponent(meta:IMeta):any{
  const {marginTop, marginRight, marginBottom, marginLeft} = meta.props || {};
  const name = meta.name;
  let component = compoents[name] && compoents[name].component ? compoents[name].component : name;

  component = marginTop || marginRight || marginBottom || marginLeft ? withMargin(component) : component;

  return component;
}

function resolveRule(name:string):IRule{
  return  compoents[name] ? compoents[name].rule : new Rule();
}

export {register, resolveComponent, resolveRule, registerHtmlTag}