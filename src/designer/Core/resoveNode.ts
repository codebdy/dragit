import { Container, Grid } from "@material-ui/core";
import Canvas from "./Canvas"

const nodeMap : { [key: string]: any } = {
  Container,
  Canvas,
  Grid,
}

function resolveNode(name:string): any{
  return nodeMap[name] ? nodeMap[name] : name
}

export {resolveNode}