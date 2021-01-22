import { IPage } from "Base/Model/IPage";
import { IMeta } from "Base/RXNode/IMeta";
import { RXNode } from "Base/RXNode/RXNode";

export interface IPageUpdate{
  page?:IPage;
  selectedNode?: RXNode<IMeta>;
  setPage:(page:IPage)=>void;
}