import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { SUBMIT_MUTATION } from "./ACTIONs";

export function getMutationNode(mutationNodes: Array<RXNode<IMeta>>, node?: RXNode<IMeta>) {
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
