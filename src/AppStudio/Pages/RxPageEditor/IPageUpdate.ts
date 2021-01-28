import { IRxPage } from "Base/Model/IRxPage";
import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/models/RxNode";

export interface IPageUpdate{
  page?:IRxPage;
  selectedNode?: RxNode<IMeta>;
  setPage:(page:IRxPage)=>void;
}