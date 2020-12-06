import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Area } from '@ant-design/charts';
import { useAxios } from 'base/Hooks/useAxios';
import { AxiosRequestConfig } from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //去掉水平滚动条
      width:'calc(100% - 1px)',
    },
  }),
);

const charts :{
  [key:string]:React.FC<any>
}= {
  'Area':Area,
}

const AntDesignChart = React.forwardRef((
  props: {
    chart:string,
    api:AxiosRequestConfig,
  },
  ref:any
)=>{
  const {chart, api, ...rest} = props;
  const Chart = charts[chart];

  const [request] = useState<AxiosRequestConfig>(api)
  const classes = useStyles();
  const [data, loading] = useAxios<any>(request)

  return (
    <Chart 
      className = {classes.root}
      ref={ref}
      data = {data || []}
      {...rest}
      loading = {loading}
    />
  )
})

export default AntDesignChart