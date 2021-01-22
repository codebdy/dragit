import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import Toolbox from './Toolbox';
import Box from '@material-ui/core/Box';
import { AttributeBox } from './AttrebuteBox';
import SettingsBox from './SettingsBox';
import LeftArea from 'Design/Layout/LeftArea';
import Scrollbar from 'AdminBoard/Common/Scrollbar';

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
export default function LeftContent(){
  //const {pageSchema, onSettingsChange} = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


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
      <Scrollbar>
        <TabPanel value={value} index={0}>
          <Toolbox></Toolbox>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AttributeBox></AttributeBox>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {
            <SettingsBox />
          }
        </TabPanel>
      </Scrollbar>
    </LeftArea>
  )
}
