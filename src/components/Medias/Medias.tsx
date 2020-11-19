import React from "react";
import {makeStyles, Theme, createStyles, Container, Grid} from "@material-ui/core";
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


export default function Medias(props:{children?: any}) {
  const classes = useStyles();
  return (
    <Container className={classes.meidas}>
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
    </Container>
  )

}