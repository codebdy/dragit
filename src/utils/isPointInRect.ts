export function isPointInRect(
  point?:{clientX:number,clientY:number}, 
  rect?:{left:number, right:number, top:number, bottom:number}
):boolean{
  if(!rect || !point){
    return false;
  }
  if(rect.left < point.clientX && rect.right >  point.clientX 
    && rect.top <point.clientY && rect.bottom >  point.clientY){
    return true;
  }
  return false;
}