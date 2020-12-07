import React, { useEffect } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import Toolbox from './Toolbox';
import Box from '@material-ui/core/Box';
import AttributeBox from './AttrebuteBox';
import bus, { FOCUS_NODE, UN_FOCUS_NODE } from './Core/bus';
import { INode } from 'designer/PageEditor/Core/Node/INode';
import SettingsBox from './SettingsBox';
import LeftArea from 'designer/Layout/LeftArea';
import { IPageSchema } from 'base/Model/IPage';


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
export default function LeftContent(props:{pageSchema?:IPageSchema, onChange:(pageSchema:IPageSchema)=>void}){
  const {pageSchema, onChange} = props;
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
    <LeftArea
      title={
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
          <Tab icon={<MdiIcon iconClass="mdi-file-cog-outline"/>}  style={{minWidth:'80px', }}/>
        </Tabs> 
      }
    >
      <TabPanel value={value} index={0}>
        <Toolbox></Toolbox>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <AttributeBox node = {focusedNode}></AttributeBox>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          <SettingsBox pageSchema = {pageSchema} onChange = {onChange} />
        }
      </TabPanel>
    </LeftArea>
  )
}
