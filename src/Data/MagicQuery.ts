import { API_MAGIC_QUERY } from "APIs/magic";
import { AxiosRequestConfig } from "axios";

export class MagicQuery{

  private _model: string = "";
  private _commands: string[] = [];
  private _take = "";
  private _skip = "";
  private _fetcher = "@getMany";

  setModel(model:string){
    this._model = model;
    return this;
  }

  setTake(count:number){
    this._take = `@take${count}`;
    return this;
  }

  setSkip(count:number){
    this._skip = `@skip${count}`;
    return this;    
  }

  setGetMany(){
    this._fetcher = "@getMany";
  }

  setGetOne(){
    this._fetcher = "@getOne";
  }

  addModelCommand(command:string){
    this._commands.push(`@${command}`);
  }
  
  toAxioConfig():AxiosRequestConfig{
    return {
      ...API_MAGIC_QUERY,
      url:`${API_MAGIC_QUERY.url}/${encodeURI(this.toQueryString())}` 
    };
  }

  toUrl(){
    return this.toAxioConfig().url || '';
  }

  private toQueryString(){
    const queryObj = {} as any;
    queryObj[`model ${this._take} ${this._skip} ${this._fetcher} ${this._commands.join(' ')}`] = this._model;
    return JSON.stringify(queryObj);
  }
}