import { Container } from "@material-ui/core";

const nodeMap : { [key: string]: any } = {
  Container,
}

function resolveNode(name:string): any{
  return nodeMap[name] ? nodeMap[name] : 'name'
}

export {resolveNode}