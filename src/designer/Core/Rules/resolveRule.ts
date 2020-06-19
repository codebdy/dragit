import { Rule } from "./Rule"
import { IRule } from "./IRule"
import { GridContainerRule } from "./GridContainerRule"
import { IMeta } from "../Node/IMeta"
import { GridItemRule } from "./GridItemRule"
import { CardRule } from "./CardRule"
import { CanvasRule } from "./CanvasRule"
import { CardHaderRule } from "./CardHeaderRule"
import { FieldRule } from "./FieldRule"
import { DividerRule } from "./DividerRule"
import { ButtonRule } from "./ButtonRule"

const rules:Array<IRule> = [
  new CanvasRule(),
  new GridContainerRule(),
  new GridItemRule(),
  new CardRule(),
  new CardHaderRule(),
  new FieldRule(),
  new DividerRule(),
  new ButtonRule(),
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