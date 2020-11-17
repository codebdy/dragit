import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, LinearProgress } from '@material-ui/core';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import Image from 'components/common/Image'
import MediaGridListIconButton from './MediaGridListIconButton';
import { API_MEDIAS_CHANGE_MEDIA_NAME, API_MEDIAS_REMOVE_MEDIA } from 'APIs/medias';
import axios from 'axios';
import MdiIcon from 'components/common/MdiIcon';
import classNames from 'classnames';
import { contains } from 'ArrayHelper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:"relative",
    },
    checked:{
      border:"#5d78ff solid 2px",
      borderRadius:"5px",
    },
    notChecked:{
      border:"transparent solid 2px",
      borderRadius:"5px",    
    },
    mask:{
      position:'absolute',
      height:'calc(100% - 2px)',
      width:"100%",
      left:"0",
      top:"1px",
      background:"rgba(50,50,50, 0.3)",
      borderRadius:"5px",
      display:'flex',
      flexFlow:"column",
      justifyContent:"space-between",
    },

    toolbar:{
      height:'40px',
      width:"100%",
      display:'flex',
      flexFlow:'row',
      justifyContent:'flex-end',
      padding:'2px',
    },
    titleInput:{
      width:'100%',
    },
    checkbox:{
      width:'30px',
      height:'30px',
      background:"#f7f7f7",
      position:'absolute',
      bottom: '5px', 
      right:'3px',
      borderRadius:'50%',
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }  
  }),
);
export interface MediaMeta{
  id:string;
  thumbnail: string,
  title: string,
  alt?:string,
}


export default function MediaGridListImage(
  props:{
    selectedMedias:Array<MediaMeta>, 
    image:MediaMeta, 
    onRemoveMedia:(media:MediaMeta)=>void,
    onDragStart:(media:MediaMeta)=>void,
    onDragEnd:()=>void,
    onToggleSelect:(media:MediaMeta)=>void,
  }
){
  const {selectedMedias, image, onRemoveMedia, onDragStart, onDragEnd, onToggleSelect} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [imageTitle, setImageTitle] = React.useState(image.title);
  const [loading, setLoading] = React.useState(false);

  const selected = contains(image, selectedMedias);

  const changeImageTitleOnServer = ()=>{
    if(imageTitle === image.title){
      return
    }
    setLoading(true)

    axios(
      {
        method: API_MEDIAS_CHANGE_MEDIA_NAME.method as any,
        url: API_MEDIAS_CHANGE_MEDIA_NAME.url,
        params:{
          imageId:image.id,
          name:imageTitle,
        },
      }
    ).then(res => {
      image.title = imageTitle
      setLoading(false);
    })
    .catch(err => {
      console.log('server error');
      setLoading(false);
    });

  }

  const removeMedia = ()=>{
    setLoading(true)

    axios(
      {
        method: API_MEDIAS_REMOVE_MEDIA.method as any,
        url: API_MEDIAS_REMOVE_MEDIA.url,
        params:{
          imageId:image.id,
        },
      }
    ).then(res => {
      setLoading(false);
      onRemoveMedia(image);
    })
    .catch(err => {
      console.log('server error');
      setLoading(false);
    });
  }

  const handleEndEditing = ()=>{
    setEditing(false);
    changeImageTitleOnServer();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setImageTitle(value);
  };

  return (
    <Fragment>
      <div className = { classNames(classes.root) }
        draggable={true}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}          
        onDragStart={()=>{
          setHover(false);
          onDragStart(image);
        }}
        onDragEnd = {onDragEnd}
        onClick = {()=>onToggleSelect(image)}
      >
        <Image 
          src={image.thumbnail}
          className = { selected? classes.checked : classes.notChecked } 
        />
        {
          hover&&
          <div className={classes.mask}>
            <div className={classes.toolbar}>
              <MediaGridListIconButton icon = "mdi-magnify" onClick={()=>{}} />
              <MediaGridListIconButton icon = "mdi-pencil" onClick={()=>setEditing(true)} />
              <MediaGridListIconButton icon = "mdi-delete-outline" onClick={removeMedia} />
            </div>

          </div>
        }
        {
          selected &&
          <div className={classes.checkbox}>
            <MdiIcon iconClass="mdi-check" size="18" color="#5d78ff" />
          </div>
        }        
      </div>        
      {
        loading && <LinearProgress />
      }
      {
        editing?
        <input 
          value={imageTitle} 
          autoFocus= {true} 
          className={classes.titleInput}
          onBlur = {handleEndEditing}
          onKeyUp = {e=>{
            if(e.keyCode === 13) {
              handleEndEditing()
            }
          }}
          onChange = {handleChange}
        />
        :
        <MediaGridListItemTitle title={imageTitle} />
      }

    </Fragment>
  )
}
