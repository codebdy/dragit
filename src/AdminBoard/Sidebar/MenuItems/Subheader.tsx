import { makeStyles, Theme, createStyles, ListSubheader } from "@material-ui/core";
import IMenuItem from "Base/Model/IMenuItem";
import { RxNode } from "rx-drag/RxNode";
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
    node:RxNode<IMenuItem>,
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
