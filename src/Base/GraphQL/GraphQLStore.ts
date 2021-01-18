import { IPageMutation } from "Base/Model/IPageMutation";
import { makeAutoObservable } from "mobx";

export class GraphQLStore{
  name:string;
  source:string;
  gql?:string;
  variables?:any;
  mutation?:IPageMutation;

  constructor(name:string, source:string, gql?:string) {
    this.name = name;
    this.source = source;
    this.gql = gql;
    makeAutoObservable(this)
  }

  setGql(gql?:string){
    this.gql = gql;
  }

  setVariables(variables?:any){
    this.variables = variables;
  }

  setMutation(mutation?:IPageMutation){
    this.mutation = mutation;
  }
}