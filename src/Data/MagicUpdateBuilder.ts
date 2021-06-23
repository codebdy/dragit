export class MagicUpdateBuilder {
  private _model: string = '';
  private _ids: number[] = [];
  private _params: any;

  setModel(model:string) {
    this._model = model;
    return this;
  }

  setIds(ids:number[]) {
    this._ids = ids;
    return this;
  }

  setParams(params:any){
    this._params = params;
    return this;
  }

  addId(id: number|undefined) {
    id && this._ids.push(id);
    return this;
  }

    
  toData() {
    return {
      [
        `${this._model}`]: {
          ...this._params,
          ids:this._ids
        }
    };
  }
}