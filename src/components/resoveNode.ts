import { Container, Grid } from "@material-ui/core";
import Canvas from "../designer/Core/Canvas";
import {
  Button, 
  Card, CardHeader, CardContent, CardActions, 
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import FormField from "components/FormField";
import Portlet from "components/Portlet"
import PortletFormGridBody from "components/PortletFormGridBody"
import PortletFooter from "components/PortletFooter"
import FormGridItem from "components/FormGridItem"
import ListView from "components/ListView"
import MediasPortlet from "components/Inputs/MediasPortlet"
import SelectInput from "./Inputs/SelectInput";

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
  PortletFormGridBody,
  FormGridItem,
  PortletFooter,
  Typography,
  ListView,
  MediasPortlet,
  SelectInput,
}

function resolveNode(name:string): any{
  return nodeMap[name] ? nodeMap[name] : name
}

export {resolveNode}