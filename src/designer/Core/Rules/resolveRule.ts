import { Rule } from "./Rule"
import { ContainerRule } from "./ContainerRule"
import { IRule } from "./IRule"
import { GridRule } from "./GridRule"

const ruleMap : { [key: string]: any } = {
  'Container': ContainerRule,
  'Grid': GridRule,
}

function resolveRule(name:string): IRule{
  let ruleClass = ruleMap[name] ? ruleMap[name] : Rule

  return new ruleClass();
}

export {resolveRule}