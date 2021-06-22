export class WhereBuilder{
  private _conditions = {} as any;
  private _where = "";

  addCondition(field:string, value:any, operator?:string){
    const key = `${field}${operator ? '@'+operator : ''}`;
    if(value){
      this._conditions[key] = value;
    }
    else{
      delete this._conditions[key];
    }    
    return this;
  }

  setWhereSql(whereStr: string){
    this._where = whereStr;
    return this;
  }

  toJSON(){
    return this._where ? {...this._conditions, where:this._where} : this._conditions ;
  }
}