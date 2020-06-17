import { Container, Grid } from "@material-ui/core";
import Canvas from "./Canvas"
import {
  Button, 
  Card, CardHeader, CardContent, CardActions, 
  Divider,
  Paper
} from "@material-ui/core"

const nodeMap : { [key: string]: any } = {
  Container,
  Canvas,
  Divider,
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Paper,
}

function resolveNode(name:string): any{
  return nodeMap[name] ? nodeMap[name] : name
}

export {resolveNode}