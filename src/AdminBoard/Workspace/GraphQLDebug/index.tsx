import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Fab, Hidden, Drawer, Divider, IconButton, Typography, Box, Tab, Tabs} from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import { useLeftDrawer } from 'store/helpers/useAppStore';
import { Close } from '@material-ui/icons';
import intl from 'react-intl-universal';
import { usePageGQLStore } from 'base/GraphQL/PageGQLProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(1),
      zIndex:theme.zIndex.snackbar + 1,
    },
    title: {
      margin: 0,
      display:'flex',
      alignItems:'center',
      paddingLeft:theme.spacing(1),
    },
    titleText:{
      marginLeft:theme.spacing(1),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(0.2),
      top: theme.spacing(0.2),
      color: theme.palette.grey[500],
    },
    content:{
      height:'400px',
      display:'flex',
      flexFlow:'row',
    },
    tabs: {
      marginLeft:theme.spacing(2),
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
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function GraphQLDebug(){
  const classes = useStyles();
  const leftDrawer = useLeftDrawer();
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);  
  
  const fabLeft = leftDrawer.isMini ? leftDrawer.compactWidth : leftDrawer.fullWidth;
  const handleClose = ()=>{
    setOpen(false)
  }

  const pageGqlStore = usePageGQLStore();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Hidden smDown>
      {
        !open &&
        <Fab 
          className={classes.fab} 
          size="small" 
          aria-label="GraphQL Debug" 
          style={{left:(fabLeft + 8) + 'px'}}
          onClick={()=>setOpen(true)} 
        >        
          <MdiIcon iconClass="mdi-graphql"  color={'#e10098'} />
        </Fab>
      }

      <Drawer anchor="bottom" open={open} onClose={handleClose}>
        <div className = {classes.title}>
          <MdiIcon iconClass="mdi-graphql" />        
          <Typography className={classes.titleText} variant="h6">GraphQL </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="GraphQL vertical tabs"
            className={classes.tabs}
          >
            <Tab label={intl.get('query')} id='query-tab-index' />
            <Tab label={intl.get('mutation')} id='mutation-tab-index' />
          </Tabs>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.content}> 
          <TabPanel value={value} index={0}>
            {pageGqlStore?.queries.map((query)=>{
              return(
                query.name + '-' + query.source
              )
            })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {intl.get('mutation')}
          </TabPanel>
        </div>
      </Drawer>
    </Hidden>     
  )
}
