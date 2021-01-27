import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Area, Line, Liquid, Radar } from '@ant-design/charts';
import { useDesign } from 'rx-drag/context/useDesign';

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
    //dataApi:AxiosRequestConfig,
    jsonProps?:any,
  },
  ref:any
)=>{
  const {chart, jsonProps, ...rest} = props;
  const Chart = charts[chart];
  const {isDesigning} = useDesign();
  //const [request] = useState<AxiosRequestConfig>(dataApi)
  const classes = useStyles();
  //const [data, loading] = useAxios<any>(request);
  // eslint-disable-next-line no-eval
  //(rest as any).yAxis = eval((rest as any).yAxis)

  return (
    isDesigning?
    <div ref={ref} {...rest}>
      {chart} Chart Design
    </div>
    :
    <div></div>
    /*<Chart 
      className = {classes.root}
      ref={ref}
      //data = {data || []}
      {...jsonProps}
      {...rest}
      //loading = {loading}
    />*/
  )
})

export default AntDesignChart