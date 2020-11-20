import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import intl from "react-intl-universal";
import { List, ListItem, ListItemText } from '@material-ui/core';
import { openBackground, openBackgroundLight } from 'admin/Sidebar/SidebarLinks';
import { API_GET_MODULES } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { ItemMeta } from 'designer/Common/EditableList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '300px',
    },
    list:{
      width:'100%',
    },
    item:{
      userSelect:'none',
      cursor:'move',
      "&:hover,&:focus": {
        backgroundColor:  theme.palette.type === 'dark' ? openBackground : openBackgroundLight,
      }
    },

  }),
);

export default function ToolsAccordion() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [customizedModules] = useAxios<ItemMeta[]>(API_GET_MODULES);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
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
            <ListItem className={classes.item}>
              <ListItemText primary={intl.get('fold-group')} />
            </ListItem>
            <ListItem className={classes.item}>
              <ListItemText primary={intl.get('subheader')} />
            </ListItem>
            <ListItem className={classes.item}>
              <ListItemText primary={intl.get('divider')} />
            </ListItem>
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
          <List className={classes.list}>
            {
              customizedModules?.map(module=>{
                return (
                  <ListItem key={module.id} className={classes.item}>
                    <ListItemText primary={module.title} />
                  </ListItem>                  
                )
              })
            }
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography >{intl.get('preorder-modules')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List className={classes.list}>
            <ListItem className={classes.item}>
              <ListItemText primary={intl.get('dashboard')} />
            </ListItem>
            <ListItem className={classes.item}>
              <ListItemText primary={intl.get('medias')} />
            </ListItem>
            <ListItem className={classes.item}>
              <ListItemText primary={intl.get('users-management')} />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
