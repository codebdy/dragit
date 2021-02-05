import { IRxMetaConfig } from "rx-drag/models/IRxMetaConfig";
import { MetaConfig } from "Base/RXNode/MetaConfig";
//import withMargin from "./HOCs/withMargin";
import { IMeta } from "../Base/RXNode/IMeta";

var componentsMap : { 
  [key: string]: any
} = {}

var configsMap : { 
  [key: string]: IRxMetaConfig
} = {}

function register(name:string, component:any, Config:any = MetaConfig): any{
  configsMap[name] = new Config();
  componentsMap[name] = component;
}

function registerHtmlTag(name:string, Config:any = MetaConfig){
  configsMap[name] =  new Config();
}

function resolveComponent(meta:IMeta):any{
  const name = meta.name;
  const componetNode = componentsMap[name];
  let component = componetNode ? componetNode : name;
  return component;
}

function resolveMetaConfig(name:string):IRxMetaConfig{
  return  configsMap[name] ? configsMap[name] : new MetaConfig();
}

function allRegisteredComponents(){
  return componentsMap;
}


export {register, resolveComponent, resolveMetaConfig, registerHtmlTag, allRegisteredComponents}