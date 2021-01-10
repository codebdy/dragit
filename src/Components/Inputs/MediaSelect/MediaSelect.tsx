import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MediaAdder from 'Components/Medias/MediaAdder';
import { IMedia } from 'Base/Model/IMedia';
import withSkeleton from 'Base/HOCs/withSkeleton';
import withFormField from 'Components/common/withFormField';
import { useDesign } from 'Design/PageEditor/useDesign';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaSelected: {
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
  value?:IMedia,
  width?:string,
  avatar?:boolean,
  style?:any,
  error?:string|boolean,
  helperText?:string,
  onChange?:(event:any)=>void,
}, ref:any)=>{
  const {label, value, helperText, error, width, avatar, onChange, style, ...rest} = props;
  const {isDesigning} = useDesign();
  const classes = useStyles();

  const [media, setMedia] = React.useState(value);

  useEffect(()=>{
    setMedia(value);
  }, [value])

  const handleSelectMedias = (medias:any)=>{
    const currentValue = medias && medias.length >0 ? medias[0] :undefined;
    setMedia( currentValue );
    onChange && onChange(
      {
        target:{
          value:currentValue,
        }
      }
    )
  }

  return (
    <div className={classes.mediaSelected} ref = {ref} style={{width:width, ...style}} {...rest}>
      {label && <div className = {classes.label}>{label}</div>}
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

export default withFormField(withSkeleton(MediaSelect))
