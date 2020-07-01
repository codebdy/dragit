import React from 'react';
import { makeStyles, Theme, createStyles, Tabs, Tab } from '@material-ui/core';
import SidebarWidthPlaceholder from 'admin/Sidebar/SidebarWidthPlaceholder';
import MdiIcon from 'components/common/MdiIcon';
import Scrollbar from 'admin/common/Scrollbar';
import Toolbox from './Toolbox/Toolbox';
import Box from '@material-ui/core/Box';
import AttributeBox from './AttributeBox';

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
export default function LeftArea(){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
       <AttributeBox></AttributeBox>
      </TabPanel>
      <TabPanel value={value} index={2}>
        3
      </TabPanel>
    </Scrollbar>
  </SidebarWidthPlaceholder>
  )
}
