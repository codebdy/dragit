import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import Image from 'components/common/Image'
import MediaGridListIconButton from './MediaGridListIconButton';

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
    }
  }),
);
export interface MediaMeta{
  id:string;
  thumbnail: string,
  title: string,
}


export default function MediaGridListImage(props:{image:MediaMeta}){
  const {image} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);

  return (
    <Fragment>
      <div className = {classes.root}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}          
      >
        <Image src={image.thumbnail} 
        />
        {
          hover&&
          <div className={classes.mask}>
            <div className={classes.toolbar}>
              <MediaGridListIconButton icon = "mdi-magnify" onClick={()=>{}} />
              <MediaGridListIconButton icon = "mdi-pencil" onClick={()=>{}} />
              <MediaGridListIconButton icon = "mdi-delete-outline" onClick={()=>{}} />
            </div>
          </div>
        }        
      </div>        
      <MediaGridListItemTitle title={image.title} />

    </Fragment>
  )
}
