import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, fade, Hidden, IconButton, InputBase, Tooltip } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import Spacer from 'Components/common/Spacer';
import intl from 'react-intl-universal';
import SearchIcon from '@material-ui/icons/Search';
import { useMediasStore } from './MediasStore';
import { observer } from 'mobx-react';
import { useDragItStore } from 'Store/Helpers/useDragItStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadInput: {
      display: 'none',
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
    uploadButton:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

  }),
);

export const MediasToolbar = observer(()=>{
  const classes = useStyles();
  const mediasStore = useMediasStore();  
  const [keyword, setKeyword] = useState(mediasStore?.keyword||'');
  const toolIconSize = 21;
  const dragitStore = useDragItStore();

  const handleUpload = (event:React.ChangeEvent<HTMLInputElement>)=>{
    mediasStore.addUploadFiles(event.target.files);
  }

  const handleChangeKeyword = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setKeyword(event.target.value as string);
  }

  useEffect(()=>{
    setKeyword(mediasStore?.keyword||'');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mediasStore.keyword, mediasStore.selectedFolderId])

  return (
    <Fragment>
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
          value = {keyword}
          inputProps={{ 'aria-label': 'search' }}          
          onChange = {handleChangeKeyword}
          onKeyUp = {e=>{
            if(e.key === 'Enter') {
              mediasStore.setKeyword(keyword.trim());
            }
          }}
        />
      </div>                
      <Spacer />
      

      <Hidden xsDown>
        <input
          accept="image/*"
          className={classes.uploadInput}
          id="contained-button-file"
          multiple
          type="file"
          onChange = {handleUpload}
        />        
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
          <IconButton 
            aria-label={intl.get('filter')} 
            component="span"
            onClick = {()=>{
              dragitStore.infoError('多种文件类型支持正在开发中，敬请期待...');
            }}
          >
            <MdiIcon iconClass="mdi-filter-outline" size={toolIconSize} />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.get('sort-by')} arrow placement="top">
          <IconButton aria-label={intl.get('sort-by')} component="span">
            <MdiIcon iconClass="mdi-sort-ascending"  size={toolIconSize} />
          </IconButton>
        </Tooltip>

      </Hidden>
      <Hidden smUp>
          <IconButton aria-label={intl.get('list')} component="span">
            <MdiIcon iconClass="mdi-dots-horizontal"  size={toolIconSize} />
          </IconButton>
      </Hidden>
    </Fragment>
  )
})
