export class MagicQueryMeta{
  private _queryJSON:any;
  private _model = '';
  private _modelCommandString = '';
  private _conditions = {} as any;
  private _isPagination = false;
  private _pageSize: number = 10;
  private _pageIndex: number = 0;
  private _modelKey = '';

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
        this._modelCommandString = keyStringArray.slice(1).join('');
        this._modelKey = key;
      }
    }
  }

  addCondition(key:string, value:any){
    this._conditions[key] = value;
  }

  get model(){
    return this._model;
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

  toQueryString(){
    if(!this._model){
      return '';
    }
    const copyOfQueryJSON = {...this._queryJSON};

    delete copyOfQueryJSON[this._modelKey];

    const pagination = this._isPagination ? `@paginate(${this._pageSize},${this._pageIndex})` :'';
    copyOfQueryJSON[this._modelKey + pagination] = this._model;
    return JSON.stringify({...copyOfQueryJSON, ...this._conditions});
  }
}