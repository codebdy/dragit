import { RXNode } from '../../../base/RXNode/RXNode';
import { IMeta } from 'base//Model/IMeta';


export interface IRect {
  height: number;
  left: number;
  top: number;
  width: number;
  bottom: number;  
  right: number;  
  x: number;
  y: number;
}

export type CursorPosition = "in-left" | "in-top" | "in-right" | "in-bottom" | "in-center" |
 "out-left" | "out-top" | "out-right" | "out-bottom" | undefined;

export interface IDragOverParam {
  position?: CursorPosition;
  targetNode?: RXNode<IMeta>;
}
