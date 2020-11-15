import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles, ExpansionPanel, Grid } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {AttributeRow, RowLabel, RowValue} from './AttributeRow';
import { INode } from 'designer/Core/Node/INode';
import { IProp } from "base/IProp";
import intl from 'react-intl-universal';
import AttributeBoxActionSection from './AttributeBoxActionSection';
import {StyledTextInput} from './Inputs/StyledInput';
import AttributeBoxValidateArea, { ValidateRule } from 'designer/Attrebutebox/AttributeBoxValidateArea';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    panelPaper:{
      background:'transparent',
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

  return (
    <div className={classes.root}>
      {node&&
        <Fragment>
          <div className={classes.nodeLabel}>
            {intl.get('selected-node')}
            <span style={{color:'#5d78ff'}}>{node.label}</span>
          </div>
          <ExpansionPanel className={classes.panelPaper}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>{intl.get('attributes')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.pannelDetail}>
              <Grid container spacing={1}>
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {node.rule.hasData &&
            <Fragment> 
              <ExpansionPanel  className={classes.panelPaper}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.heading}>{intl.get('data')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails  key={node.id + '-data'} className={classes.pannelDetail}>
                  <AttributeRow>
                    <RowLabel>{intl.get("field")}</RowLabel>
                    <RowValue>
                      <StyledTextInput value={field || ''}
                        onChange={handleFieldChange}>
                      </StyledTextInput>
                    </RowValue>
                  </AttributeRow>  
                </ExpansionPanelDetails>            
              </ExpansionPanel>
              <ExpansionPanel  className={classes.panelPaper}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.heading}>{intl.get('validate')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails  key={node.id + '-rule'} className={classes.pannelDetail}>
                  <AttributeBoxValidateArea rule={rule} onChange={handleRuleChange} /> 
                </ExpansionPanelDetails>            
              </ExpansionPanel>
            </Fragment>
          }
          {node.rule.hasAction && 
            <ExpansionPanel  className={classes.panelPaper}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={classes.heading}>{intl.get('action')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails key={node.id + '-action'} className={classes.pannelDetail}>
                <AttributeBoxActionSection node={node} />
              </ExpansionPanelDetails>            
            </ExpansionPanel>
          }
          <ExpansionPanel  className={classes.panelPaper}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>{intl.get('authority')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.pannelDetail}>
              可见<br/>
              可编辑
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Fragment>
      }
    </div>
  )
}