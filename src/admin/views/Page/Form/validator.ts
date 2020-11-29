export declare type Message = string;
export declare type ValidationValue = boolean | number | string | RegExp;
export declare type ValidationRule<TValidationValue extends ValidationValue = ValidationValue> = TValidationValue | ValidationValueMessage<TValidationValue>;
export declare type ValidationValueMessage<TValidationValue extends ValidationValue = ValidationValue> = {
    value: TValidationValue;
    message: Message;
};
export declare type ValidateResult = Message | Message[] | boolean | undefined;
export declare type Validate = (data: any) => ValidateResult | Promise<ValidateResult>;
export declare type ValidationRules = Partial<{
    required: Message | ValidationRule<boolean>;
    min: ValidationRule<number | string>;
    max: ValidationRule<number | string>;
    maxLength: ValidationRule<number | string>;
    minLength: ValidationRule<number | string>;
    pattern: ValidationRule<RegExp>;
    validate: Validate | Record<string, Validate>;
}>;