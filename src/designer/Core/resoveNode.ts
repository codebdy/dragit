import { Container, Grid } from "@material-ui/core";
import Canvas from "./Canvas";
import {
  Button, 
  Card, CardHeader, CardContent, CardActions, 
  Divider,
  Paper,
  TextField,
} from "@material-ui/core";

import FormField from "components/FormField";
import Portlet from "components/Portlet"


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
  TextField,
  FormField,
  Portlet,
}

function resolveNode(name:string): any{
  return nodeMap[name] ? nodeMap[name] : name
}

export {resolveNode}