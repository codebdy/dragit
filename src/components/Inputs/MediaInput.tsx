import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MediaAdder from 'components/Medias/MediaAdder';
import { MediaMeta } from 'components/Medias/MediaGridListImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
    },

  }),
);



const MediaInput = React.forwardRef((props: {
  value?:MediaMeta,
  width?:string,
}, ref:any)=>{
  const {value, width} = props;
  const classes = useStyles();

  const [media, setMedia] = React.useState(value);

  const handleSelectMedias = (medias:any)=>{
    setMedia(medias && medias.length >0 ? medias[0] :undefined );
  }

  return (
    <div className={classes.root} ref = {ref} style={{width:width}}>
      {
        <MediaAdder value={media ? [media] :[]} onSelectMedias={handleSelectMedias} single/>      
      }

    </div>
  )
})

export default MediaInput
