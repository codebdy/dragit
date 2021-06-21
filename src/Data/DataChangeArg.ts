import { ID } from "rx-drag/models/baseTypes";

export enum DataChangeType {
  UPDATE,
  CREATE,
  DELTE
}

interface ModeData{
  id:ID,
  [key:string]:any;
}

export interface DataChangeArg {
  changeType: DataChangeType;
  model: string;
  data: any;
}