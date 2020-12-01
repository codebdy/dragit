import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { RXInputProps } from 'base/RXInputProps';
import withSkeleton from 'base/HOCs/withSkeleton';
import { Editor } from '@tinymce/tinymce-react';
import { tinyMCEKey } from './key';

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
    value?:Array<any>,   
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

  const handleEditorChange = ()=>{

  }
  return (
    <div 
      ref={ref}
      className = {fullWidth ? classes.fullWidth : ''}
      {...rest}
    >
      <Editor
        key={tinyMCEKey}
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            `undo redo | formatselect | bold italic backcolor | 
            alignleft aligncenter alignright alignjustify | 
            bullist numlist outdent indent | removeformat | help`
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  )
})

const TinyMCEAny = withSkeleton(TinyMCE) as any;

export default TinyMCEAny