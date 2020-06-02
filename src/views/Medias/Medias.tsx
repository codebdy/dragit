import React from "react";
import { makeStyles, Theme, createStyles, Container, Grid, Paper, Divider, Breadcrumbs, Link } from "@material-ui/core";
import classNames from "classnames";
import Spacer from "components/common/Spacer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    meidas: {
      flex: 1,
      display:'flex',
      flexFlow:'column',
      
    },
    flex1:{
      flex:1,
    },
    mainCol:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      paddingBottom:'10px',
    },
    paper:{

      display:'flex',
      flexFlow:'row',
    },
    left:{
      flex:1,
      display:'flex',
      flexFlow:'column',

    },
    right:{
      width:'260px',
      flexShrink:0,
      display:'flex',
      flexFlow:'column',
    },
    toolbar:{
      padding:'10px',
      minHeight:'56px',
      display:'flex',
      flexFlow:'row',
      alignItems:'center',
      flexWrap: 'wrap',
    },
    breadcrumb:{
      padding: '10px',
      fontSize: '0.9rem',
    },
    mediasGrid:{
      padding:'10px',
    },
    folderTitle:{
      padding:'10px',
    },
  }),
);

export default function Medias(props:{children?: any}) {
  const classes = useStyles();
  return (
    <Container className={classes.meidas}>
      <h2>媒体库</h2>
      <Grid container className={classes.flex1}>
        <Grid item xs={12} className={classes.mainCol}>
          <Paper className = {classNames(classes.paper, classes.flex1)}>
            <div className = {classes.left}>
              <div className ={classes.toolbar}>Tool <Spacer /> bar</div>
              <Divider></Divider>
              <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
                <Link color="inherit" href="/">
                  全部
                </Link>
                <Link color="inherit" href="/getting-started/installation/">
                  文章
                </Link>
                <Link
                  color="textPrimary"
                  href="/components/breadcrumbs/"
                  aria-current="page"
                >
                  缩略图
                </Link>
              </Breadcrumbs>

              <div className ={classes.mediasGrid}>content</div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className = {classes.right}>
              <div className = {classes.folderTitle}>
                目录管理 
              </div>
              <Divider></Divider>
              right
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}