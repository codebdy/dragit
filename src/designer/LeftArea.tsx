import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Tabs, Tab } from '@material-ui/core';
import SidebarWidthPlaceholder from 'admin/Sidebar/SidebarWidthPlaceholder';
import MdiIcon from 'components/common/MdiIcon';
import Scrollbar from 'admin/common/Scrollbar';
import Toolbox from './Toolbox/Toolbox';
import Box from '@material-ui/core/Box';
import AttributeBox from './Attrebutebox/AttributeBox';
import bus, { FOCUS_NODE, UN_FOCUS_NODE } from './Core/bus';
import { INode } from 'designer/Core/Node/INode';
import FieldBox from './FieldBox/FieldBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftArea:{
      display:'flex',
      flexFlow:'column',
      height:'100%',
      background: '#1a1a27',
      boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 20px 31px 3px rgba(0,0,0,0.14), 0px 8px 38px 7px rgba(0,0,0,0.12)',
      zIndex:theme.zIndex.drawer + 1,
      color:"#f7f7f7",
    },
    leftTitle:{
      padding: theme.spacing(0),
      //fontSize: '1.1rem',
      //borderBottom:"rgba(0,0,0, .4) solid 2px",
      display:'flex',
      flexFlow:'row',
      alignItems:"flex-end",
      height:'63px',
      background: 'rgba(0,0,0,0.3)',
      boxShadow: theme.shadows[6],
    },
  }),
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
export default function LeftArea(props:{fields:Array<any>, onFieldsChange:(fields:Array<any>)=>void}){
  const {fields, onFieldsChange} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [focusedNode, setFocusedNode] = React.useState<INode|null>(null);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const follow = (node:INode)=>{
    //console.log(node);
    setFocusedNode(node);
  }
  const unFollow = ()=>{
    setFocusedNode(null)
  }

  useEffect(() => {
    bus.on(FOCUS_NODE, follow);
    bus.on(UN_FOCUS_NODE, unFollow);
    return () => {
      bus.off(FOCUS_NODE, follow);
      bus.off(UN_FOCUS_NODE, unFollow);
    };
  });

  return (
    <SidebarWidthPlaceholder className={classes.leftArea}>
          
    <div className={classes.leftTitle}>
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      aria-label="full width tabs example"
    >
      <Tab icon={<MdiIcon iconClass="mdi-view-dashboard"></MdiIcon>} style={{minWidth:'80px', }}/>
      <Tab icon={<MdiIcon iconClass="mdi-brush"></MdiIcon>} style={{minWidth:'80px', }}/>
      <Tab icon={<MdiIcon iconClass="mdi-view-list-outline"></MdiIcon>}  style={{minWidth:'80px', }}/>
    </Tabs>          
    </div>

  
    <Scrollbar>
      <TabPanel value={value} index={0}>
        <Toolbox></Toolbox>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <AttributeBox node = {focusedNode} fields = {fields}></AttributeBox>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FieldBox fields = {fields} onChange = {onFieldsChange} />
      </TabPanel>
    </Scrollbar>
  </SidebarWidthPlaceholder>
  )
}
