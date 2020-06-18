import { Rule } from "./Rule"
import { ContainerRule } from "./ContainerRule"
import { IRule } from "./IRule"
import { GridContainerRule } from "./GridContainerRule"
import { IMeta } from "../Node/IMeta"
import { GridItemRule } from "./GridItemRule"
import { CardRule } from "./CardRule"

const rules:Array<IRule> = [
  new ContainerRule(),
  new GridContainerRule(),
  new GridItemRule(),
  new CardRule(),
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