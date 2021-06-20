export class ListViewQueryMeta{
  private _queryJSON:any;
  private _model = '';
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

  get model(){
    return this._model;
  }

  toQueryString(){
    if(!this._model){
      return '';
    }
    return JSON.stringify(this._queryJSON);
  }
}