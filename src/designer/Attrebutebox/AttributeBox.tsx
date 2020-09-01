import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, ExpansionPanel, Select, MenuItem } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {RowGroup, AttributeRow, RowLabel, RowValue} from './AttributeRow';
import { INode } from 'designer/Core/Node/INode';
import { IField } from 'designer/Core/Rules/IRule';
import StyleList from './Inputs/StyleList';

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
    }
  }),
);

export default function AttributeBox(props:{node:INode|null}){
  const classes = useStyles();
  const {node} = props
  const propChange = (field:string, value:any) => {
    node?.updateProp(field, value)
  };

  const hanleStyleChange = (value:any)=>{
    //console.log(value);
    node?.updateProp('style', value);
  }

  return (
    <div className={classes.root}>
      {node&&
      <Fragment>
        <ExpansionPanel className={classes.panelPaper}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>属性</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.pannelDetail}>
            {
              node.rule.getFields().map((field:IField)=>{
                return(
                  <AttributeRow key={field.name}>
                    <RowLabel>{field.label}</RowLabel>
                    <RowValue>
                      <field.input
                        field={field.name}
                        value={node.props[field.name]}
                        onChange= {propChange}
                        schema={field.schema}
                      />
                    </RowValue>
                  </AttributeRow>                  
                )
              })
            }
            <RowGroup
              totalLabel='外边距'
              totalInput = {
                <input type="number"
                  min="0"
                  max="10"
                  step="2"
                  className={classes.input}
                />
              }
            >
              <AttributeRow>
                <RowLabel nested>上</RowLabel>
                <RowValue>
                  <input type="number"
                    min="0"
                    max="10"
                    step="2"
                    className={classes.input}
                  />
                </RowValue>
              </AttributeRow>
              <AttributeRow>
                <RowLabel nested>下</RowLabel>
                <RowValue>
                  <input type="number"
                    min="0"
                    max="10"
                    step="2"
                    className={classes.input}
                  />
                </RowValue>
              </AttributeRow>
              <AttributeRow>
                <RowLabel nested>左</RowLabel>
                <RowValue>
                  <input type="number"
                    min="0"
                    max="10"
                    step="2"
                    className={classes.input}
                  />
                </RowValue>
              </AttributeRow>
              <AttributeRow>
                <RowLabel nested>右</RowLabel>
                <RowValue>
                  <input type="number"
                    min="0"
                    max="10"
                    step="2"
                    className={classes.input}
                  />
                </RowValue>
              </AttributeRow>
            </RowGroup>

            <RowGroup
              totalLabel='内边距'
              totalInput = {
                <input type="number"
                  min="0"
                  max="10"
                  step="2"
                  className={classes.input}
                />
              }
            >
              <AttributeRow>
                <RowLabel nested>上</RowLabel>
                <RowValue>
                  <input type="number"
                    min="0"
                    max="10"
                    step="2"
                    className={classes.input}
                  />
                </RowValue>
              </AttributeRow>
              <AttributeRow>
                <RowLabel nested>下</RowLabel>
                <RowValue>
                  <input type="number"
                    min="0"
                    max="10"
                    step="2"
                    className={classes.input}
                  />
                </RowValue>
              </AttributeRow>
              <AttributeRow>
                <RowLabel nested>左</RowLabel>
                <RowValue>
                  <input type="number"
                    min="0"
                    max="10"
                    step="2"
                    className={classes.input}
                  />
                </RowValue>
              </AttributeRow>
              <AttributeRow>
                <RowLabel nested>右</RowLabel>
                <RowValue>
                  <input type="number"
                    min="0"
                    max="10"
                    step="2"
                    className={classes.input}
                  />
                </RowValue>
              </AttributeRow>
            </RowGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel  className={classes.panelPaper}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>样式</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <StyleList value={node.props.style} onChange={hanleStyleChange} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel  className={classes.panelPaper}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>数据</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>绑定字段</div>
          
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fragment>
      }
    </div>
  )
}