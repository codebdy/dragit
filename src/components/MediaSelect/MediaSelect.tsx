import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MediaAdder from 'components/Medias/MediaAdder';
import { MediaMeta } from 'components/Medias/MediaGridListImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
    },
    label:{
      padding:theme.spacing(1),
      fontSize:'1.1rem',
      color:theme.palette.text.primary,
    }

  }),
);



const MediaSelect = React.forwardRef((props: {
  label?:string,
  value?:MediaMeta,
  width?:string,
  avatar?:boolean,
}, ref:any)=>{
  const {label, value, width, avatar} = props;
  const classes = useStyles();

  const [media, setMedia] = React.useState(value);

  const handleSelectMedias = (medias:any)=>{
    setMedia(medias && medias.length >0 ? medias[0] :undefined );
  }

  return (
    <div className={classes.root} ref = {ref} style={{width:width}}>
      <div className = {classes.label}>{label}</div>
      {
        <MediaAdder 
          value={media ? [media] :[]} 
          onSelectMedias={handleSelectMedias} 
          single 
          avatar = {avatar}
        />      
      }

    </div>
  )
})

export default MediaSelect
