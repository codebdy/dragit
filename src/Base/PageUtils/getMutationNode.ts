import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/RxNode";
import { SUBMIT_MUTATION } from "./ACTIONs";

export function getMutationNode(mutationNodes: Array<RxNode<IMeta>>, node?: RxNode<IMeta>) {
  if(!node){
    return;
  }
  
  const onClickAction = node.meta.props?.onClick

  if(onClickAction && onClickAction.name === SUBMIT_MUTATION){
    mutationNodes.push(node);
  }
  node.children.forEach(child => {
    getMutationNode(mutationNodes, child);
  });

}
