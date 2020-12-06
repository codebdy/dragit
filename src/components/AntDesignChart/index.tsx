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

const AntDesignChart = React.forwardRef((
  props: {

  },
  ref:any
)=>{
  //const {...rest} = props;
  const [request] = useState<AxiosRequestConfig>({
    url:'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
    method:'get',
  })
  const classes = useStyles();
  const [data, loading] = useAxios<any>(request)

  var config = {
    data: data||[],
    xField: 'Date',
    yField: 'scales',
    xAxis: { tickCount: 5 },
    areaStyle: function areaStyle() {
      return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' };
    },
  };

  return (
    <Area 
      className = {classes.root}
      ref={ref}
      {...config}
      loading = {loading}
    />
  )
})

export default AntDesignChart