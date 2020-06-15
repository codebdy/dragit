import { Rule } from "./Rule"
import { ContainerRule } from "./ContainerRule"
import { IRule } from "./IRule"
import { GridRule } from "./GridRule"
import { IMeta } from "../Node/IMeta"

const rules:Array<IRule> =[
  new ContainerRule(),
  new GridRule(),
];

const baseRule = new Rule();

function resolveRule(meta:IMeta): IRule{
  for (const rule of rules) {
    if(rule.match(meta)){
      return rule;
    }
  }
  return baseRule;
}

export {resolveRule}