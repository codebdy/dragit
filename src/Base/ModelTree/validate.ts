import { IValidateRule } from "Base/Model/IValidateRule";
import intl from 'react-intl-universal';

export declare type Message = string;
export declare type ValidationValue = boolean | number | string | RegExp;
export interface ValidationRule <T>{
    value: T;
    message: Message;
};
export declare type ValidateResult = Message | Message[] | boolean | undefined;

export interface ValidationRules{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number | string>;
  minLength: ValidationRule<number | string>;
  pattern: ValidationRule<RegExp>;
};

function metaRuleToRegisterRules(rule: IValidateRule) {
  let rtRules: any = {};
  if (rule.required) {
    rtRules['required'] = intl.get('msg-required');
  }
  if (rule.valueType === "string") {
    rule.minLength && (rtRules['minLength'] = {
      value: rule.minLength,
      message: intl.get('msg-min-length')
    });
    rule.maxLength && (rtRules['maxLength'] = {
      value: rule.maxLength,
      message: intl.get('msg-max-length')
    });

    rule.min && (rtRules['min'] = {
      value: rule.min,
      message: intl.get('msg-min')
    });
    rule.min && (rtRules['max'] = {
      value: rule.max,
      message: intl.get('msg-max')
    });

    if (rule.ruleType === "email") {
      rtRules['pattern'] = {
        value: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/i,
        message: rule.errorMessage || intl.get('msg-email')
      };
    }
    if (rule.ruleType === "url") {
      rtRules['pattern'] = {
        value: /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/i,
        message: rule.errorMessage || intl.get('msg-email')
      };
    }
    if (rule.ruleType === "custumized" && rule.pattern) {
      rtRules['pattern'] = {
        value: RegExp(rule.pattern || ''),
        message: rule.errorMessage
      };
    }

  }
  return rtRules;
}


export const validate = (value: any, rule?: IValidateRule) => {
  if(!rule){
    return undefined;
  }
  const rules = metaRuleToRegisterRules(rule);
  if (!rules) {
    return undefined;
  }

  if (rules.required) {
    if (!value) {
      return rules.required;
    }
  }

  if (rules.minLength) {
    if (value && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }
  }

  if (rules.maxLength) {
    if (value && value.length > rules.maxLength.value) {
      return rules.maxLength.message;
    }
  }

  if (rules.min) {
    if (value && value < rules.min.value) {
      return rules.min.message;
    }
  }

  if (rules.max) {
    if (value && value > rules.max.value) {
      return rules.max.message;
    }
  }

  if (rules.pattern) {
    if (value && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }
  }
};
