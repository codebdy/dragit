export class ListViewQueryMeta{
  private _queryJSON:any;
  private _model = '';
  constructor(query:string){
    this._queryJSON = JSON.parse(query);
    for(const key in this._queryJSON){
      const keyStringArray = key.split('@');
      if(keyStringArray[0].trim().toLowerCase() === 'model'){
        this._model = this._queryJSON[key];
      }
    }
  }

  get model(){
    return this._model;
  }

  toQueryString(){
    return JSON.stringify(this._model);
  }
}