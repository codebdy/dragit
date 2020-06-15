import { Rule } from "./Rule"
import { ContainerRule } from "./ContainerRule"
import { IRule } from "./IRule"
import { GridRule } from "./GridRule"
import { IMeta } from "../Node/IMeta"

/*const ruleMap : { [key: string]: any } = {
  'Container': ContainerRule,
  'Grid': GridRule,
}*/

const rules:Array<IRule> =[
  new ContainerRule(),
  new GridRule(),
];

const barseRule = new Rule();

function resolveRule(meta:IMeta): IRule{
  for (const rule of rules) {
    if(rule.match(meta)){
      return rule;
    }
  }
  return barseRule;
}

export {resolveRule}