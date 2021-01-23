import { IRxPage } from "Base/Model/IRxPage";
import { IMeta } from "Base/RXNode/IMeta";
import { RXNode } from "Base/RXNode/RXNode";

export interface IPageUpdate{
  page?:IRxPage;
  selectedNode?: RXNode<IMeta>;
  setPage:(page:IRxPage)=>void;
}