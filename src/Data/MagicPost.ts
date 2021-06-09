export class MagicPost{
  private _model:string = '';
  private _datas:any[] = [];

  model(model:string){
    this._model = model;
    return this;
  }
  
  data(data:any){
    this._datas.push(data);
    return this;
  }

  relation(relationName:string, relationModel:string){
    for(const data of this._datas){
      const relationValue = data[relationName];
      delete data[relationName];
      data[`${relationName}@relation(${relationModel})`] = relationValue;      
    }
    return this;
  }
    
  toData(){
    return {
      [this._model]:this._datas
    };
  }
}