import { Rule } from "./Rule"
import { ContainerRule } from "./ContainerRule"
import { IRule } from "./IRule"

const ruleMap : { [key: string]: any } = {
  'Container': ContainerRule,
}

function resolveRule(name:string): IRule{
  let ruleClass = ruleMap[name] ? ruleMap[name] : Rule

  return new ruleClass();
}

export {resolveRule}