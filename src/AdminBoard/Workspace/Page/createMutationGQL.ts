import { IPageMutation } from "Base/Model/IPageMutation";
import { RXModel } from "Base/ModelTree/RXModel";
import { getNodeGQL } from "Base/PageUtils/getNodeGQL";

export const createMutationGQL = (mutation?: IPageMutation, modelStore?:RXModel)=>{
  if(!mutation){
    return `mutation{emperty}`;
  }

  const refreshNode = modelStore?.getModelNode(mutation?.refreshNode)    
  const gqlText = `
      mutation ($${mutation?.variableName}:${mutation?.variableType}){
      ${mutation?.name}(${mutation?.variableName}:$${mutation?.variableName})
        ${getNodeGQL(refreshNode?.node)}
    }
  `
  return gqlText;
}