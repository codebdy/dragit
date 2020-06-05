import { Container } from "@material-ui/core";
import Canvas from "./Canvas"

const nodeMap : { [key: string]: any } = {
  Container,
  Canvas,
}

function resolveNode(name:string): any{
  return nodeMap[name] ? nodeMap[name] : 'name'
}

export {resolveNode}