import React, { Fragment } from "react";
import {makeStyles, Theme, createStyles, Grid} from "@material-ui/core";
import MediasContent from "./MediasContent";
import intl from 'react-intl-universal';
import classNames from "classnames";
import HoverablePaper from "components/common/HoverablePaper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    meidas: {
      flex: 1,
      display:'flex',
      flexFlow:'column',
    },
    uploadIcon:{
      marginRight: theme.spacing(1),
    },

    paper:{
      display:'flex',
      flexFlow:'row',
    },

    flex1:{
      flex:1,
    },
    mainCol:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      paddingBottom: theme.spacing(2),
    },    
  })
);


const Medias = React.forwardRef((props:{className?:any}, ref:any)=>{
  const {className, ...rest} = props;
  const classes = useStyles();
  return (
    <Fragment>
      <div ref = {ref} className = {classNames(classes.meidas, className)} {...rest}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item><h2>{intl.get("medias")}</h2></Grid>
        </Grid>
        <Grid container className={classes.flex1}>
          <Grid item xs={12} className={classes.mainCol}>
            <HoverablePaper 
              className = {classNames(classes.paper, classes.flex1)} 
              elevation={6}
            >
              <MediasContent />
            </HoverablePaper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  )

})

export default Medias;