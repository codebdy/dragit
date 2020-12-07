import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles, Accordion, Grid, TextField } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { INode } from 'designer/PageEditor/Core/Node/INode';
import { IProp } from "base/Model/IProp";
import intl from 'react-intl-universal';
import AttributeBoxActionSection from './ActionSection';
import AttributeBoxValidateArea, { ValidateRule } from 'designer/PageEditor/AttrebuteBox2/ValidateArea';
import { API_GET_AUTHS } from 'APIs/modules';
import MultiSelectBox from 'components/Select/MultiSelectBox';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    panelPaper:{
      background:'rgba(255,255,255, 0.02)',
    },
    pannelDetail:{
      display:'flex',
      flexFlow:'column',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },

    input:{
      background:'#41474c', 
      outline:'0', 
      border:'1px', 
      color:'#cdcfd0', 
      borderRadius:'3px', 
      padding:'4px',
      '&:focus':{
        border:'#0a6fb7 solid 1px'
      }
    },
    nodeLabel:{
      padding:'16px',
    }
  }),
);

export default function AttributeBox(props:{node:INode|null}){
  const classes = useStyles();
  const {node} = props;
  const [field, setField] = React.useState(node?.meta.props?.field);
  const [rule, setRule] = React.useState(node?.meta.props?.rule);
  const [auths, setAuths] = React.useState(node?.meta.props?.auths);
  const propChange = (field:string, value:any) => {
    node?.updateProp(field, value);
  };

  useEffect(() => {
    setField(node?.meta.props?.field)
  },[node]);

  const handleFieldChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let newField = event.target.value as string;
    node?.updateProp('field', newField);
    setField(newField);
  }

  const handleRuleChange = (rule:ValidateRule)=>{
    node?.updateProp('rule', rule);
    setRule(rule);
  }

  const handleChangeAuths = (auths : string[]|undefined)=>{
    node?.updateProp('auths', auths);
    setAuths(auths);
  }

  return (
    <div className={classes.root}>
      {node&&
        <Fragment>
          <div className={classes.nodeLabel}>
            {intl.get('selected-node')}
            <span style={{color:'#5d78ff'}}>{node.label}</span>
          </div>
          
          <Accordion className={classes.panelPaper}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>{intl.get('attributes')}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.pannelDetail}>
              <Grid container spacing={2}>
                {
                  node.rule.getFields(node.meta).map((field:IProp)=>{
                    return(
                      <Grid item key={node.id + '-' + field.name} xs={field.xs || 6}>
                          <field.input
                            label={field.label && (intl.get(field.label)||field.label)}
                            field={field.name}
                            value={node.props[field.name]}
                            onChange= {propChange}
                            props={field.props}
                          />

                      </Grid>                  
                    )
                  })
                }

              </Grid>
            </AccordionDetails>
          </Accordion>
          {node.rule.hasField &&
            <Accordion  className={classes.panelPaper}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={classes.heading}>{intl.get('data')}</Typography>
              </AccordionSummary>
              <AccordionDetails  key={node.id + '-data'} className={classes.pannelDetail}>
               
                  <TextField
                    size="small" 
                    variant = "outlined" 
                    label={intl.get("field")} value={field || ''}
                    onChange={handleFieldChange}>
                  </TextField>
                
              </AccordionDetails>            
            </Accordion>
          }
          {
            node.rule.hasValidation && 
              <Accordion  className={classes.panelPaper}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.heading}>{intl.get('validate')}</Typography>
                </AccordionSummary>
                <AccordionDetails  key={node.id + '-rule'} className={classes.pannelDetail}>
                  <AttributeBoxValidateArea rule={rule} onChange={handleRuleChange} /> 
                </AccordionDetails>            
              </Accordion>            
          }
          {node.rule.hasAction && 
            <Accordion  className={classes.panelPaper}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={classes.heading}>{intl.get('action')}</Typography>
              </AccordionSummary>
              <AccordionDetails key={node.id + '-action'} className={classes.pannelDetail}>
                <AttributeBoxActionSection node={node} />
              </AccordionDetails>            
            </Accordion>
          }
          <Accordion  className={classes.panelPaper}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>{intl.get('authority')}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.pannelDetail}>
              <MultiSelectBox label={'权限'} 
                variant="outlined" 
                size="small"
                api = {API_GET_AUTHS}
                itemKey = "slug"
                groupByField = "module"
                value = {auths || []}
                multiple
                onChange = {(e:any)=>handleChangeAuths(e.target.value)}
              />
                </AccordionDetails>
          </Accordion>
        </Fragment>
      }
    </div>
  )
}