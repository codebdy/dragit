export function cloneObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
