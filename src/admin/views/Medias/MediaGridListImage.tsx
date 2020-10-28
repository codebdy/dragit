import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, LinearProgress } from '@material-ui/core';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import Image from 'components/common/Image'
import MediaGridListIconButton from './MediaGridListIconButton';
import { API_MEDIAS_CHANGE_MEDIA_NAME, API_MEDIAS_REMOVE_MEDIA } from 'Api';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:"relative",
    },
    mask:{
      position:'absolute',
      height:'100%',
      width:"100%",
      left:"0",
      top:"0",
      background:"rgba(50,50,50, 0.3)",
      borderRadius:"5px",
      display:'flex',
      flexFlow:"column"
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
    }  
  }),
);
export interface MediaMeta{
  id:string;
  thumbnail: string,
  title: string,
}


export default function MediaGridListImage(
  props:{
    image:MediaMeta, 
    onRemoveMedia:(media:MediaMeta)=>void,
    onDragStart:(media:MediaMeta)=>void,
    onDragEnd:()=>void,  
  }
){
  const {image, onRemoveMedia, onDragStart, onDragEnd} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [imageTitle, setImageTitle] = React.useState(image.title);
  const [loading, setLoading] = React.useState(false);

  const changeImageTitleOnServer = ()=>{
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
      <div className = {classes.root}
        draggable={true}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}          
        onDragStart={()=>{
          setHover(false);
          onDragStart(image);
        }}
        onDragEnd = {onDragEnd}
      >
        <Image src={image.thumbnail} 
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
