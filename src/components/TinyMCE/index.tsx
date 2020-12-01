import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { RXInputProps } from 'base/RXInputProps';
import withSkeleton from 'base/HOCs/withSkeleton';
import { Editor } from '@tinymce/tinymce-react';
import MediasSelectDialog from 'components/Medias/MediasSelectDialog';
import { IMedia } from 'base/Model/IMedia';
import { EventEmitter } from 'events';

declare var window: {$bus:EventEmitter};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width:'100%',
    },
  }),
);

const TinyMCE = React.forwardRef((
  props: RXInputProps& {
    fullWidth?:boolean,
    value?:string,   
    children?:any,
    //style?:any,
    withHeader:boolean,
    error?:any,
    helperText?:string,
    height:number,
  },
  ref:any
)=>{
  const {fullWidth, name, loading, value, error, helperText, height = 500, children, onChange, ...rest} = props;
  const classes = useStyles();

  const [id] = useState( 'drag-rx-tinymce-' + new Date() + ((Math.random() * 1000).toFixed(0) + ''));
  const [open, setOpen] = React.useState(false);
  const openMediaDialog = ()=>{
    setOpen(true);
  }

  useEffect(()=>{
    window.$bus.on('selectImage', openMediaDialog);
    return ()=>{
      window.$bus.off('selectImage', openMediaDialog);
    }
  },[])

  const handleEditorChange = ()=>{

  }

  const handleClose = ()=>{
    setOpen(false);
  }

  const handleSelectMedias = (medias?:Array<IMedia>)=>{
    window.$bus.emit('selectedImages', medias, id );
  }

  return (
    <div 
      ref={ref}
      className = {fullWidth ? classes.fullWidth : ''}
      {...rest}
    >
      <Editor
        initialValue={value}
        tinymceScriptSrc = {'/tinymce_5.6.1/js/tinymce/tinymce.min.js'}
        init={{
          height: height,
          menubar: false,
          language: 'zh_CN',
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount dragimages table'
          ],
          external_plugins: {
            'dragimages': '/plugins/dragimages/plugin.min.js',
          },
          toolbar:
            `undo redo | formatselect | bold italic backcolor | 
            alignleft aligncenter alignright alignjustify | removeformat | dragimages table | 
            bullist numlist outdent indent | help`,
          init_instance_callback: (editor:any) => {
              editor.dragId = id
            },
        }}
        onEditorChange={handleEditorChange}
      />
      <MediasSelectDialog
        open = {open}
        onClose = {handleClose}
        onSelectMedias = {handleSelectMedias}
      />
    </div>
  )
})

const TinyMCEAny = withSkeleton(TinyMCE) as any;

export default TinyMCEAny