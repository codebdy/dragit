import { API_MAGIC_QUERY } from "APIs/magic";
import { AxiosRequestConfig } from "axios";

export class MagicQuery{

  private _model: string = "";
  private _commands: string[] = [];
  private _take = "";
  private _skip = "";
  private _fetcher = "@getMany";

  model(model:string){
    this._model = model;
    return this;
  }

  take(count:number){
    this._take = `@take${count}`;
    return this;
  }

  skip(count:number){
    this._skip = `@skip${count}`;
    return this;    
  }

  getMany(){
    this._fetcher = "@getMany";
  }

  getOne(){
    this._fetcher = "@getOne";
  }

  modelCommand(command:string){
    this._commands.push(`@${command}`);
  }
  
  toAxioConfig():AxiosRequestConfig{
    return {
      ...API_MAGIC_QUERY,
      url:`${API_MAGIC_QUERY.url}/${encodeURI(this.toQueryString())}` 
    };
  }

  private toQueryString(){
    const queryObj = {} as any;
    queryObj[`model ${this._take} ${this._skip} ${this._fetcher} ${this._commands.join(' ')}`] = this._model;
    return JSON.stringify(queryObj);
  }
}