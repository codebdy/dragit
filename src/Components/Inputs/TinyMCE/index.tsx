import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { RXInputProps } from 'Base/RXInputProps';
import { Editor } from '@tinymce/tinymce-react';
import MediasSelectDialog from 'Components/Medias/MediasSelectDialog';
import { IMedia } from 'Base/Model/IMedia';
import { EventEmitter } from 'events';

declare var window: {$bus:EventEmitter};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width:'100%',
    },
  }),
);

export const TinyMCE = React.forwardRef((
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
  const {name, value, error, helperText, height = 500, onChange, ...rest} = props;
  const classes = useStyles();

  const [id] = useState( 'drag-rx-tinymce-' + new Date() + ((Math.random() * 1000).toFixed(0) + ''));
  const [open, setOpen] = React.useState(false);
  const openMediaDialog = ()=>{
    setOpen(true);
  }

  useEffect(()=>{
    window.$bus?.on('selectImage', openMediaDialog);
    return ()=>{
      window.$bus?.off('selectImage', openMediaDialog);
    }
  },[])

  const handleEditorChange = (content: any)=>{
    onChange && onChange({
      name:name,
      target:{
        value:content,
      }
    });
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
      className = {classes.fullWidth}
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
              editor.dragId = id;
              editor.getBody().style.border= "0";
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
