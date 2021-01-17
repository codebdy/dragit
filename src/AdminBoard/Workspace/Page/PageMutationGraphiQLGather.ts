import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { IMeta } from "Base/Model/IMeta";
import { ModelStore } from "Base/ModelTree/ModelStore";
import { IComponentObserver } from "Base/Action/IComponentObserver";
import { PageStore } from "Base/Action/PageStore";
import { RXNode } from "Base/RXNode/RXNode";
import { createMutationGQL } from "./createMutationGQL";
import intl from 'react-intl-universal';

export class PageMutationGraphiQLGather implements IComponentObserver{

  mutationActions:Array<{node:RXNode<IMeta>, gqlStore:GraphQLStore}> = [];

  onRender(node: RXNode<IMeta>){
    const clickAction = node.meta.props?.onClick
    if(clickAction?.name === 'SUBMIT_MUTATION' && clickAction.mutation){
      if(!this.mutationActions.find(child=>child.node.id === node.id)){
        const gqlStore = new GraphQLStore(intl.get('page-mutaion'), node.meta?.props?.rxText + '-' + node.meta.name);
        this.mutationActions.push({node, gqlStore});
      }
    }
  }
  onDestory(node: RXNode<IMeta>){
    this.mutationActions = this.mutationActions.filter(child=>child.node.id !== node.id);
  }

  registerGqls(pageStore:PageStore, modelStore:ModelStore){
    this.mutationActions.forEach(child=>{
      const mutation = child.node.meta.props?.onClick?.mutation;
      const submitNode = modelStore.getModelNode(mutation.submitNode)
      child.gqlStore.setGql(createMutationGQL(mutation, modelStore));
      child.gqlStore.setVariables({[mutation.variableName]:submitNode?.toInputValue()});
      pageStore.addGql(child.gqlStore)
    })
  }

  unRegisterGqls(pageStore:PageStore){
    this.mutationActions.forEach(child=>{
      pageStore.removeGql(child.gqlStore)
    })
  }

  refreshVariables(pageStore:PageStore, modelStore:ModelStore){
    this.unRegisterGqls(pageStore);
    this.registerGqls(pageStore, modelStore);
  }
}