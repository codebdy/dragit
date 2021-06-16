export class MagicPostBuilder{
  private _model:string = '';
  private _datas:any[] = [];
  private _isSingle = false;

  setModel(model:string){
    this._model = model;
    return this;
  }

  setSingleData(data:any){
    this._isSingle = true;
    this._datas = [data];
    return this;
  }
  
  addData(data:any){
    this._datas.push(data);
    return this;
  }
    
  toData(){
    return {
      [this._model]: this._isSingle ? this._datas[0] : this._datas
    };
  }
}