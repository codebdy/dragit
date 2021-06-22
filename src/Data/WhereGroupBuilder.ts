export class WhereGroupBuilder{
  private _conditions = {} as any;
  private _andGroups: WhereGroupBuilder[] = [];
  private _orGroups: WhereGroupBuilder[] = [];

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

  addAndGroup(andGroup:WhereGroupBuilder){
    this._andGroups.push(andGroup);
    return this;
  }

  addOrGroup(orGroup:WhereGroupBuilder){
    this._orGroups.push(orGroup);
    return this;
  }

  toJSON(){
    return this._conditions;
  }
}