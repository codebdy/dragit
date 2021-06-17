export class MagicUploadBuilder{
  private _model:string = '';
  private _data:any = {};
  private _file:File|null = null;

  setModel(model:string){
    this._model = model;
    return this;
  }

  setData(data:any){
    this._data = data;
    return this;
  }
  
  setFile(file:File){
    this._file = file;
    return this;
  }

  toData(){
    const formData = new FormData()
    formData.append('model', this._model);
    formData.append('file', this._file as any);
    for(const key in this._data){
      formData.append(key, this._data[key]);
    }
    return formData;
  }
}