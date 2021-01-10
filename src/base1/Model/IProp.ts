
export interface IProp {
  name: string;
  label: string; //存Label ID， 从资源文件读取
  input: any;
  props?: any;
  defaultValue?:any;
  xs?: boolean | 12 | 2 | 1 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | undefined;
}
