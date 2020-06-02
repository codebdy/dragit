import React from "react";
import {fade, makeStyles, Theme, createStyles, Container, Grid, Paper, Divider, Breadcrumbs, Link, Tooltip, IconButton, InputBase } from "@material-ui/core";
import classNames from "classnames";
import Spacer from "components/common/Spacer";
import intl from 'react-intl-universal';
import FontIcon from "components/common/FontIcon";
import SearchIcon from '@material-ui/icons/Search';

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
      paddingBottom: theme.spacing(2),
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
      minHeight:'52px',
      display:'flex',
      flexFlow:'row',
      alignItems:'center',
      flexWrap: 'wrap',
      paddingRight: '0',
    },
    breadcrumb:{
      padding: theme.spacing(2),
      fontSize: '0.9rem',
    },
    mediasGrid:{
      padding:theme.spacing(2),
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

    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.type === 'light'? fade(theme.palette.common.black, 0.05) : fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: theme.palette.type === 'light'? fade(theme.palette.common.black, 0.10) : fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
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
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>                
                <Spacer />
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