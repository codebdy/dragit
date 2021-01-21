
export interface IPropConfig {
  name: string;
  label?: string; 
  labelKey?: string;//存Label ID， 从资源文件读取
  input?: any;
  propType?: 'string'|'boolean'|'select'|'items'|'number',
  items?: Array<{value:string, label:string}>;
  props?: any;
  defaultValue?:any;
  xs?: boolean | 12 | 2 | 1 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | undefined;
}
