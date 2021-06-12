export class MagicDelete {
  private _model: string = '';
  private _ids: number[] = [];
  private _cascades: string[] = [];

  setModel(model:string) {
    this._model = model;
    return this;
  }

  addId(id: number|undefined) {
    id && this._ids.push(id);
    return this;
  }

  addCascade(relation: string){
    this._cascades.push(relation);
    return this;
  }
    
  toData() {
    const cascades = this._cascades.length > 0 ? `@cascade(${this._cascades.join(',')})` :'';
    return {
      [`${this._model} ${cascades}`]: this._ids
    };
  }
}