import { makeAutoObservable } from "mobx";
import { GraphQLStore } from "./GraphQLStore";



export class PageGQLStore{
  
  queries: Array<GraphQLStore> = [];
  mutations: Array<GraphQLStore> = [];

  constructor() {
    makeAutoObservable(this)
  }

  addQuery(query:GraphQLStore){
    this.queries.push(query)
  }

  removeQuery(query:GraphQLStore){
    this.queries.splice(this.queries.indexOf(query), 1);
  }

  addMutation(mutation:GraphQLStore){
    this.mutations.push(mutation);
  }

  removeMutation(mutation:GraphQLStore){
    this.mutations.splice(this.mutations.indexOf(mutation), 1);
  }
}