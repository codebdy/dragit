import { IPageMutation } from "Base/Model/IPageMutation";
import { ModelStore } from "Base/ModelTree/ModelStore";

export const createMutationGQL = (mutation?: IPageMutation, modelStore?:ModelStore)=>{
  if(!mutation){
    return `mutation{emperty}`;
  }

  const refreshNode = modelStore?.getModelNode(mutation?.refreshNode)    
  const gqlText = `
      mutation ($${mutation?.variableName}:${mutation?.variableType}){
      ${mutation?.name}(${mutation?.variableName}:$${mutation?.variableName})
        ${refreshNode?.toFieldsGQL()}
    }
  `
  return gqlText;
}