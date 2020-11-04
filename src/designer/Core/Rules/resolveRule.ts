import { Rule } from "./Rule"
import { IRule } from "./IRule"
import { GridContainerRule } from "./GridContainerRule"
import { IMeta } from "../Node/IMeta"
import { GridItemRule } from "./GridItemRule"
import { CanvasRule } from "./CanvasRule"
//import { FormFieldRule } from "./FormFieldRule"
import { DividerRule } from "./DividerRule"
import { ButtonRule } from "./ButtonRule"
import { FormGridItemRule } from "./FormGridItemRule"
import { PortletRule } from "./PortletRule"
import { PortletFormGridBodyRule } from "./PortletFormGridBodyRule"
import { TypographyRule } from "./TypographyRule"
import { ListViewRule } from "./ListViewRule"
import {MediasPortletRule} from "./MediasPortletRule"
import {HeadRule} from "./HeadRule"

const rules:Array<IRule> = [
  new CanvasRule(),
  new GridContainerRule(),
  new GridItemRule(),
  //new FormFieldRule(),
  new DividerRule(),
  new ButtonRule(),
  new FormGridItemRule(),
  new PortletRule(),
  new PortletFormGridBodyRule(),
  new TypographyRule(),
  new ListViewRule(),
  new MediasPortletRule(),
  new HeadRule(),
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