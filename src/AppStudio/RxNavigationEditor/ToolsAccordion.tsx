import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import intl from "react-intl-universal";
import { List, ListItem, ListItemText } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IMenuItem from 'Base/Model/IMenuItem';
import { RxNode } from 'rx-drag/models/RxNode';
import Scrollbar from 'Common/Scrollbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {observer} from 'mobx-react';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '300px',
      height:'calc(100vh - 100px)',
      display:'flex',
      flexFlow:'column',
    },
    list:{
      width:'100%',
    },
    category:{
      padding:theme.spacing(1.5, 0),
    },
    item:{
      userSelect:'none',
      cursor:'move',
      "&:hover,&:focus": {
        backgroundColor:  fade(theme.palette.primary.main, 0.1),
      }
    },
    subItem:{
      marginLeft:theme.spacing(1),
    }

  }),
);


export const ToolsAccordion = observer((
  props:{
    onStartDragNode:(node:RxNode<IMenuItem>)=>void,
    onEndDragNode:()=>void,
  }
) => {
  const {onStartDragNode, onEndDragNode} = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const studioStore = useAppStudioStore();

  //const [moduleCategories] = useAxios<IModuleCategory[]>(API_GET_MODULES);
  const [assistItems] = useState([
    {
      label:intl.get('fold-group'),
      meta:{
        type:"group",
        title:intl.get('fold-group'),
        icon:"mdi-help",
      }
    },
    {
      label:intl.get('subheader'),
      meta:{
        type:"subheader",
        title:intl.get('subheader'),
      }
    },
  
    {
      label:intl.get('divider'),
      meta:{
        type:"divider",
      }
    },
  ])

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDragStart = (itemMeta:IMenuItem) => {
    let draggedNode = RxNode.make<IMenuItem>(itemMeta);
    onStartDragNode(draggedNode);
  }

  return (
    <div className={classes.root}>
      <Scrollbar>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>{intl.get('assist-items')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.list}>
              {
                assistItems.map((item, index)=>{
                  return (
                    <ListItem 
                      key={index} 
                      draggable = {true}  
                      className={classes.item}
                      onDragStart = {()=>handleDragStart(item.meta as any)}
                      onDragEnd = {onEndDragNode}
                    >
                      <ListItemText primary={item.label} />
                    </ListItem>
                  )
                })
              }
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography >{intl.get('pages')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.list}>
              {
                studioStore?.rxApp?.pages?.map(page=>{
                  const meta:IMenuItem ={
                    type:'item',
                    title:page.name,
                    icon:"mdi-circle-small",
                    pageId:page.id,
                  }
                  return (
                    <ListItem 
                      key={page.id} 
                      draggable = {true}  
                      className={classes.item}
                      onDragStart = {()=>handleDragStart(meta)}
                      onDragEnd = {onEndDragNode}
                    >
                      <ListItemText primary={page.name} />
                    </ListItem>
                  )
                })
              }
            </List>
          </AccordionDetails>
        </Accordion>
      </Scrollbar>
    </div>
  );
})
