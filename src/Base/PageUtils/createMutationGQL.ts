import { IPageMutation } from "Base/Model/IPageMutation";
import { RXModel } from "Base/ModelTree/RXModel";
import { getNodeGraphQL } from "Base/PageUtils/getNodeGraphQL";

export const createMutationGQL = (mutation?: IPageMutation, modelStore?:RXModel)=>{
  if(!mutation){
    return `mutation{emperty}`;
  }


  const refreshNode = modelStore?.getModelNode(mutation?.refreshNode)    
  const gqlText = `
      mutation ($${mutation?.variableName}:${mutation?.variableType}){
      ${mutation?.name}(${mutation?.variableName}:$${mutation?.variableName})
        ${getNodeGraphQL(refreshNode?.node)}
    }
  `
  return gqlText;
}