import React, { useEffect } from "react";
import {fade, makeStyles, Theme, createStyles, Container, Grid, Paper, Divider, Breadcrumbs, Link, Tooltip, IconButton, InputBase, Button, SvgIcon, Hidden, Typography, LinearProgress} from "@material-ui/core";
import classNames from "classnames";
import Spacer from "components/common/Spacer";
import intl from 'react-intl-universal';
import MdiIcon from "components/common/MdiIcon";
import SearchIcon from '@material-ui/icons/Search';
import MediaGridList, { MediaMeta } from "./MediaGridList";
import MediaFolders from "./MediaFolders";
import { FolderNode } from "./MediaFolder";
import axios from 'axios';

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
      minHeight:theme.spacing(7),
      display:'flex',
      flexFlow:'row',
      alignItems:'center',
      flexWrap: 'wrap',
      paddingRight: '0',
    },
    breadCrumbShell:{
      minHeight:theme.spacing(7),
    },
    breadcrumb:{
      padding: theme.spacing(2),
    },
    breadcumbText:{
      fontSize: '0.9rem',
    },
    mediasGrid:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      //padding:theme.spacing(0, 2, 2, 2),
    },
    folderTitle:{
      padding:theme.spacing(2) ,
      minHeight:theme.spacing(7),
      display:'flex',
      alignItems: 'center',
      fontWeight: 500,
      fontSize: '1.1rem',
      position: 'relative',
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
      width: 'auto',
      marginLeft: theme.spacing(2),
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

    },
    mainUploadButton:{
      boxShadow: theme.shadows[6],
    },

    backButton:{
      marginLeft:'2px',
    },

    uploadIcon:{
      marginRight: theme.spacing(1),
    },

  }),
);

export default function Medias(props:{children?: any}) {
  const classes = useStyles();
  const toolIconSize = 21;
  const [folderLoading, setFolderLoading] = React.useState(false);
  const [folders, setFolders] = React.useState<Array<FolderNode>>([]);
  const [selectedFolder, setSelectedFolder] = React.useState('root');
  const [gridLoading, setGridLoading] = React.useState(false);
  const [medias, setMedias] = React.useState<Array<MediaMeta>>([]);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [haseData] = React.useState(true);

  useEffect(() => {
    setFolderLoading(true);
    axios(
      {
        method:"get",
        url:'/api/medias/folders',
      }
    ).then(res => {
      setFolders(res.data);
      setFolderLoading(false);
    })
    .catch(err => {
      console.log('server error');
      setFolderLoading(false);
    })
  
  },[]);
  useEffect(() => {
    setGridLoading(true);
    setPageNumber(0);
    setMedias([]);
    loadMedias();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageNumber, selectedFolder]);

  const handleScrollToEnd = ()=>{
    if(!gridLoading && haseData){
      setGridLoading(true);
      loadMedias(medias);
    }
  }

  const loadMedias = (oldMedias:Array<MediaMeta> = []) => {
    axios(
      {
        method: "get",
        url: '/api/medias/medias',
        params: {
          folder: selectedFolder === 'root' ? '' : selectedFolder,
          page: pageNumber,
        }
      }
    ).then(res => {
      setMedias(oldMedias.concat(res.data));
      setGridLoading(false);
    })
    .catch(err => {
      console.log('server error');
      setGridLoading(false);
    });
  }

  const handelAddFolder = (parent?:FolderNode)=>{
    setFolderLoading(true)
    axios(
      {
        method: "post",
        url: '/api/medias/add-folder',
      }
    ).then(res => {
      let newFolder = res.data
      newFolder.editing = true;
      setFolderLoading(false);
      //setSelectedFolder(newFolder.id.toString());
      setFolders([...folders, newFolder]);
    })
    .catch(err => {
      console.log('server error');
      setFolderLoading(false);
    });
  }

  const handleFolderNameChange = (name:string, folder:FolderNode)=>{
    setFolderLoading(true)
    folder.name = name;    
    axios(
      {
        method: "post",
        url: '/api/medias/change-folder',
        data:folder,
      }
    ).then(res => {
      setFolderLoading(false);
    })
    .catch(err => {
      console.log('server error');
      setFolderLoading(false);
    });

  }

  return (
    <Container className={classes.meidas}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item><h2>{intl.get("medias")}</h2></Grid>
        <Grid item>
        <Button variant="contained" color="secondary" size="large" className={classes.mainUploadButton}>
          <SvgIcon className={classes.uploadIcon}>
            <path fill="currentColor" d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04M19,18H6A4,4 0 0,1 2,14C2,11.95 3.53,10.24 5.56,10.03L6.63,9.92L7.13,8.97C8.08,7.14 9.94,6 12,6C14.62,6 16.88,7.86 17.39,10.43L17.69,11.93L19.22,12.04C20.78,12.14 22,13.45 22,15A3,3 0 0,1 19,18M8,13H10.55V16H13.45V13H16L12,9L8,13Z" />
          </SvgIcon> {intl.get('upload')}
        </Button>
        </Grid>
      </Grid>
      
      <Grid container className={classes.flex1}>
        <Grid item xs={12} className={classes.mainCol}>
          <Paper className = {classNames(classes.paper, classes.flex1)} elevation={6}>
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
                <Hidden xsDown>
                  <label htmlFor="contained-button-file">
                    <Tooltip title={intl.get('upload')} arrow placement="top">
                      <IconButton  
                        aria-label={intl.get('upload')}  
                        component="span"
                        className={classes.uploadButton}
                      >
                        <MdiIcon iconClass="mdi-cloud-upload-outline" size={toolIconSize} />
                      </IconButton>
                    </Tooltip>
                  </label>

                  <Tooltip title={intl.get('filter')} arrow placement="top">
                    <IconButton aria-label={intl.get('filter')} component="span">
                      <MdiIcon iconClass="mdi-filter-outline" size={toolIconSize} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={intl.get('sort-by')} arrow placement="top">
                    <IconButton aria-label={intl.get('sort-by')} component="span">
                      <MdiIcon iconClass="mdi-sort-ascending"  size={toolIconSize} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={intl.get('list')} arrow placement="top">
                    <IconButton aria-label={intl.get('list')} component="span">
                      <MdiIcon iconClass="mdi-format-list-checkbox"  size={toolIconSize} />
                    </IconButton>
                  </Tooltip>

                </Hidden>
                <Hidden smUp>
                    <IconButton aria-label={intl.get('list')} component="span">
                      <MdiIcon iconClass="mdi-dots-horizontal"  size={toolIconSize} />
                    </IconButton>
                </Hidden>
              </div>
              <Divider></Divider>
              <Grid container justify="space-between" alignItems="center" className={classes.breadCrumbShell}>
                <Grid item>
                  <IconButton className={classes.backButton}>
                    <SvgIcon>
                      <path fill="currentColor" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z" />
                    </SvgIcon>                    
                  </IconButton>                  
                </Grid>
                <Grid item>
                   <Breadcrumbs aria-label="breadcrumb" 
                    className={classNames(classes.breadcrumb, classes.breadcumbText) }
                  >
                    <Link color="inherit" href="/">
                      全部
                    </Link>
                    <Link color="inherit" href="/getting-started/installation/">
                      文章
                    </Link>
                    <Typography color="textPrimary" className={classes.breadcumbText}>缩略图</Typography>
                  </Breadcrumbs>
                </Grid>
                <Grid item>                  
                 <Hidden lgUp>
                    <IconButton>
                      <SvgIcon>
                        <path fill="currentColor" d="M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M20 18H4V8H20M13 17V14H15V17H17V13H19L14 9L9 13H11V17Z" />
                      </SvgIcon>                    
                    </IconButton>
                  </Hidden>
                </Grid>
              </Grid>

              <div className ={classes.mediasGrid}>
                <MediaGridList 
                  loading={gridLoading}
                  medias = {medias}
                  onScrollToEnd = {handleScrollToEnd}
                ></MediaGridList>
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <Hidden mdDown>
              <div className = {classes.right}>
                <div className = {classes.folderTitle}>
                  {intl.get('folder')}
                </div>
                <Divider></Divider>
                  {
                    folderLoading && <LinearProgress />
                  }
                <MediaFolders 
                  folders = {folders} 
                  selectedFolder={selectedFolder}
                  onSelect = {(folder)=>{
                      setSelectedFolder(folder);
                  }}
                  onAddFolder = {handelAddFolder}
                  onFolderNameChange = {handleFolderNameChange}
                />
              </div>
            </Hidden>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )

}