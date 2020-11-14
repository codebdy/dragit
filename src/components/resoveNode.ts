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
import Portlet from "components/Portlet/Portlet";
import PortletFormGridBody from "components/Portlet/PortletFormGridBody";
import PortletFooter from "components/Portlet/PortletFooter";
import FormGridItem from "components/FormGridItem/FormGridItem";
import ListView from "components/ListView/ListView";
import MediasPortlet from "components/MediasPortlet/MediasPortlet";
import SelectBox from "./Select/SelectBox";
import Combobox from "./Select/Combobox";
import OneToManyTable from "./OneToManyTable/OneToManyTable";
import MediaSelect from "./MediaSelect/MediaSelect";

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
  SelectBox,
  Combobox,
  OneToManyTable,
  MediaSelect,
}

function resolveNode(name:string): any{
  return nodeMap[name] ? nodeMap[name] : name
}

export {resolveNode}