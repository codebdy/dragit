import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Area, Line, Liquid, Radar } from '@ant-design/charts';
import { useAxios } from 'base/Hooks/useAxios';
import { AxiosRequestConfig } from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //去掉水平滚动条
      flex:1,
      width:'calc(100% - 38px)',
    },
  }),
);

const charts :{
  [key:string]:React.FC<any>
}= {
  'Area':Area,
  'Line':Line,
  'Liquid':Liquid,
  'Radar':Radar,
}

const AntDesignChart = React.forwardRef((
  props: {
    chart:string,
    dataApi:AxiosRequestConfig,
    jsonProps?:any,
    isDeisgning?:boolean,
  },
  ref:any
)=>{
  const {chart, dataApi, isDeisgning, jsonProps, ...rest} = props;
  const Chart = charts[chart];

  const [request] = useState<AxiosRequestConfig>(dataApi)
  const classes = useStyles();
  const [data, loading] = useAxios<any>(request);
  // eslint-disable-next-line no-eval
  //(rest as any).yAxis = eval((rest as any).yAxis)

  return (
    isDeisgning?
    <div ref={ref} {...rest}>
      {chart} Chart Design
    </div>
    :
    <Chart 
      className = {classes.root}
      ref={ref}
      data = {data || []}
      {...jsonProps}
      {...rest}
      loading = {loading}
    />
  )
})

export default AntDesignChart