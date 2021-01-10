import { makeStyles, Theme, createStyles, ListSubheader } from "@material-ui/core";
import IMenuItem from "Base/Model/IMenuItem";
import { RXNode } from "Base/RXNode/RXNode";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subHeader:{
      display:'flex',
      justifyContent:'start',
      letterSpacing:'0.05rem',
      paddingLeft: '26px',
      fontSize:"1.05rem",
    },

  }),
);

export default function Subheader(
  props:{
    nested?:boolean,
    node:RXNode<IMenuItem>,
    mini:boolean
  }
){
  const classes = useStyles();
  return (
    <Fragment>
      {!props.mini &&
        <ListSubheader component="div"
          disableSticky
          className = {classes.subHeader}
        >
            {props.node.meta.title}
        </ListSubheader>
      }

    </Fragment>
  )
}
