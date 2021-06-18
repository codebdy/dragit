import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import {Controlled as CodeMirror} from 'react-codemirror2'
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/theme/material-darker.css";
import 'codemirror/addon/hint/show-hint';
import "codemirror/addon/lint/json-lint";

const jsonlint = require("jsonlint-mod");

declare var window:any;
window.jsonlint = jsonlint;

const useStyles = (height:string)=>{
  return makeStyles((theme: Theme) =>
    createStyles({
      codemirror:{
        width:'100%',
        height:height,
      },

    }),
  )
}

export const CodeMirrorEditor = (
  props:{
    value:string,
    mode:string,
    onChange?:(value:string)=>void,
    lint?:boolean,
    height?:string,
  }
)=>{
  const {value, mode, lint = true, height = "260px", onChange} = props;
  const classes = useStyles(height)();
  return (
    <CodeMirror
    className = {classes.codemirror}
    value={value || ''}
    options={
      {
        mode: mode,
        indentUnit : 2,  // 缩进单位，默认2
        smartIndent : true,  // 是否智能缩进
        //显示行号
        //styleActiveLine: true,
        //lineNumbers:true,
        theme: "material-darker",
        //line: true,
        //代码折叠
        lineWrapping:true,
        foldGutter: true,
        gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter","CodeMirror-lint-markers"],
        //CodeMirror-lint-markers是实现语法报错功能
        lint: lint,
        //json: true,
        //括号匹配
        //matchBrackets:true,
      }
    }
    onBeforeChange={(editor, data, value) => {
      onChange && onChange(value);
    }}
    onChange={(editor, data, value) => {
      //console.log('onChange',data, value )
    }}
  />
  )
}
