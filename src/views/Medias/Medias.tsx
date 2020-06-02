import React from "react";
import { makeStyles, Theme, createStyles, Container, Grid, Paper, Divider, Breadcrumbs, Link, Tooltip, IconButton, Button } from "@material-ui/core";
import classNames from "classnames";
import Spacer from "components/common/Spacer";
import intl from 'react-intl-universal';
import FontIcon from "components/common/FontIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    meidas: {
      flex: 1,
      display:'flex',
      flexFlow:'column',
      
    },
    square:{
      borderRadius:'0',
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
      paddingLeft:'10px',
      minHeight:'52px',
      display:'flex',
      flexFlow:'row',
      alignItems:'center',
      flexWrap: 'wrap',
      paddingRight: '0',
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
    uploadInput: {
      display: 'none',
    },
    uploadButton:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

  }),
);

export default function Medias(props:{children?: any}) {
  const classes = useStyles();
  const toolIconSize = 21;
  return (
    <Container className={classes.meidas}>
      <h2>媒体库</h2>
      <Grid container className={classes.flex1}>
        <Grid item xs={12} className={classes.mainCol}>
          <Paper className = {classNames(classes.paper, classes.flex1)}>
            <div className = {classes.left}>
              <div className ={classes.toolbar}>
                Tool  bar<Spacer />
                <input
                  accept="image/*"
                  className={classes.uploadInput}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                </label>
                <label htmlFor="contained-button-file">
                  <Tooltip title={intl.get('theme-settings')} arrow placement="top">
                    <IconButton  
                      aria-label={intl.get('theme-settings')}  
                      component="span"
                      className={classes.uploadButton}
                    >
                      <FontIcon iconClass="mdi mdi-cloud-upload-outline" size={toolIconSize} />
                    </IconButton>
                  </Tooltip>
                </label>

                <Tooltip title={intl.get('theme-settings')} arrow placement="top">
                  <IconButton aria-label={intl.get('theme-settings')} component="span">
                    <FontIcon iconClass="mdi mdi-filter-outline" size={toolIconSize} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={intl.get('theme-settings')} arrow placement="top">
                  <IconButton aria-label={intl.get('theme-settings')} component="span">
                    <FontIcon iconClass="mdi mdi mdi-sort-ascending"  size={toolIconSize} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={intl.get('theme-settings')} arrow placement="top">
                  <IconButton aria-label={intl.get('theme-settings')} component="span">
                    <FontIcon iconClass="mdi mdi-view-grid-outline"  size={toolIconSize} />
                  </IconButton>
                </Tooltip>
              </div>
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