import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PropsDialog from 'base/PropsInputs/PropsDialog';
import intl from "react-intl-universal";
import {Controlled as CodeMirror} from 'react-codemirror2'
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/theme/material-darker.css";
const jsonlint = require("jsonlint-mod");
declare var window:any;
window.jsonlint = jsonlint;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:'100%',
    },

  }),
);

export default function JSONEditDialog(
  props:{
    label?:string,
    value?:any,
    onChange:(value:any)=>void,
  }
) {
  const {label, value, onChange} = props;
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(JSON.stringify(value, null, 2));
  const handleSave = ()=>{
    onChange(JSON.parse(inputValue ||"{}"));
  }
  useEffect(()=>{
    setInputValue(JSON.stringify(value, null, 2));
  },[value])

  return (
    <PropsDialog label={label} title={intl.get('edit-json')} onSave = {handleSave}>
      <CodeMirror
        className = {classes.root}
        value={inputValue}
        options={
          {
            mode: "application/json",
            indentUnit : 2,  // 缩进单位，默认2
            smartIndent : true,  // 是否智能缩进
            //显示行号
            styleActiveLine: true,
            lineNumbers:true,
            theme: "material-darker",
            line: true,
            //代码折叠
            lineWrapping:true,
            foldGutter: true,
            gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter","CodeMirror-lint-markers"],
            //CodeMirror-lint-markers是实现语法报错功能
            lint: true,
            json: true,
            //括号匹配
            matchBrackets:true,
          } as any
        }
        onBeforeChange={(editor, data, value) => {
          setInputValue(value);
        }}
        onChange={(editor, data, value) => {
        }}
      />
      
    </PropsDialog>
  );
}
