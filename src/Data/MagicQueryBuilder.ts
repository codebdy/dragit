import { API_MAGIC_QUERY } from "APIs/magic";
import { AxiosRequestConfig } from "axios";
import { orderBy } from "./constants";

export class MagicQueryBuilder{

  private _model: string = "";
  private _commands: string[] = [];
  private _take = "";
  private _skip = "";
  private _fetcher = "@getMany";
  private _orderBy: any = undefined;
  private _pageSize: number = 10;
  private _pageIndex: number = 0;
  private _isPagination = false;
  private _conditins = {} as any;

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
    return this;
  }

  setGetOne(){
    this._fetcher = "@getOne";
    return this;
  }

  addCondition(field:string, value:any, operator?:string){
    const key = `${field}${operator ? '@'+operator : ''}`;
    if(value){
      this._conditins[key] = value;
    }
    else{
      delete this._conditins[key];
    }    
    return this;
  }

  addModelCommand(command:string){
    this._commands.push(`@${command}`);
    return this;
  }

  setOrderByASC(key: string){
    return this.setOrderBy(key, 'ASC');
  }

  setOrderByDESC(key: string){
    return this.setOrderBy(key, 'DESC');
  }

  setOrderBy(key: string, order: string){
    if(!this._orderBy){
      this._orderBy = {};
    }

    this._orderBy[key] = order;
    return this;
  }

  setPageSize(pageSize: number){
    this._isPagination = true;
    this._pageSize = pageSize;
    return this;
  }

  setPageIndex(pageIndex: number){
    this._isPagination = true;
    this._pageIndex = pageIndex;
    return this;
  }
  
  toAxioConfig():AxiosRequestConfig{
    return {
      ...API_MAGIC_QUERY,
      url:`${API_MAGIC_QUERY.url}/${encodeURI(this.toQueryString())}` 
    };
  }

  toUrl(){
    return this.toAxioConfig().url || null;
  }

  private toQueryString(){
    const queryObj = {} as any;
    const pagination = this._isPagination ? `@paginate(${this._pageSize},${this._pageIndex})` :'';
    queryObj[`model ${this._take} ${this._skip} ${this._fetcher} ${this._commands.join(' ')} ${pagination}`] = this._model;
    this._orderBy && (queryObj[orderBy] = this._orderBy);
    return JSON.stringify({...queryObj, ...this._conditins});
  }
}