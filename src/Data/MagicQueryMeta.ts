export class MagicQueryMeta{
  private _queryJSON:any;
  private _model = '';
  private _conditions = {} as any;
  constructor(query:string){
    try {
    this._queryJSON = JSON.parse(query);
    }
    catch(error){
      console.error(query, error);
    }
    if(!this._queryJSON){
      return;
    }
    for(const key in this._queryJSON){
      const keyStringArray = key.split('@');
      if(keyStringArray[0].trim().toLowerCase() === 'model'){
        this._model = this._queryJSON[key];
      }
    }
  }

  addCondition(key:string, value:any){
    this._conditions[key] = value;
  }

  get model(){
    return this._model;
  }

  toQueryString(){
    if(!this._model){
      return '';
    }
    return JSON.stringify({...this._queryJSON, ...this._conditions});
  }
}