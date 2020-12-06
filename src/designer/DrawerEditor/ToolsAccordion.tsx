import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import intl from "react-intl-universal";
import { List, ListItem, ListItemText } from '@material-ui/core';
import { API_GET_MODULES } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IMenuItem from 'base/Model/IMenuItem';
import { RXNode } from 'base/RXNode/RXNode';
import Scrollbar from 'admin/common/Scrollbar';
import { IModuleCategory } from 'base/Model/IModuleCategory';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeItem, TreeView } from '@material-ui/lab';

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


export default function ToolsAccordion(
  props:{
    onStartDragNode:(node:RXNode<IMenuItem>)=>void,
    onEndDragNode:()=>void,
  }
) {
  const {onStartDragNode, onEndDragNode} = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [moduleCategories] = useAxios<IModuleCategory[]>(API_GET_MODULES);
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
    let draggedNode = RXNode.make<IMenuItem>(itemMeta);
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
            <Typography >{intl.get('customized-modules')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TreeView 
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              disableSelection
              className = {classes.list}
            >
              {
                moduleCategories?.map(category=>{
                  return (
                    <TreeItem nodeId = {'' + category.id} key={category.id} 
                      label = {
                        <div className={classes.category}>{category.name}</div>
                      }
                    >
                        {
                          category.modules?.map(module=>{
                            const meta:IMenuItem ={
                              type:'item',
                              title:module.name,
                              icon:"mdi-circle-small",
                              to:`/admin/module/${module.slug}/`,
                            }
                            return (
                              <ListItem key={module.id} draggable = {true}  className={classes.item}
                                onDragStart = {()=>handleDragStart(meta)}
                                onDragEnd = {onEndDragNode}
                              >
                                <ListItemText primary={module.name} className = {classes.subItem} />
                              </ListItem>                  
                            )
                          })
                        }
  
                    </TreeItem>                  
                  )
                })
              }
            </TreeView>

          </AccordionDetails>
        </Accordion>
      </Scrollbar>
    </div>
  );
}
