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

export const validate = (value:any, rules: ValidationRules) => {
    if(!rules){
        return undefined;
      }
    
      if(rules.required){
        if(!value){
          return rules.required;
        }
      }
    
      if(rules.minLength){
        if(value && value.length < rules.minLength.value){
          return rules.minLength.message;
        }
      }
    
      if(rules.maxLength){
        if(value && value.length > rules.maxLength.value){
          return rules.maxLength.message;
        }
      }
    
      if(rules.min){
        if(value && value < rules.min.value){
          return rules.min.message
        }
      }
    
      if(rules.max){
        if(value && value > rules.max.value){
          return rules.max.message
        }
      }
    
      if(rules.pattern){
        if(value && !rules.pattern.value.test(value)){
          return rules.pattern.message
        }
      }
};

export class Regeister{
    rules:ValidationRules;
    constructor(rules:ValidationRules){
      this.rules = rules;
    }

    validate(value :any){
      return validate(value, this.rules);
    };
}