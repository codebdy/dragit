import { makeAutoObservable } from "mobx";
import { GraphQLStore } from "./GraphQLStore";



export class PageGQLStore{
  
  gqls: Array<GraphQLStore> = [];

  constructor() {
    makeAutoObservable(this)
  }

  addGql(gql:GraphQLStore){
    this.gqls.push(gql)
  }

  removeGql(gql:GraphQLStore){
    this.gqls.splice(this.gqls.indexOf(gql), 1);
  }

}