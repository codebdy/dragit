export function isNone(value: any) {
  if(!value){
    return true;
  }

  if(JSON.stringify(value) === JSON.stringify([])){
    return true;
  }

  if(JSON.stringify(value) === JSON.stringify({})){
    return true;
  }

  return false;
}

export function valueEqual(value1:any, value2:any){
  if(isNone(value1) && isNone(value2)){
    return true;
  }

  return value1 === value2;
}