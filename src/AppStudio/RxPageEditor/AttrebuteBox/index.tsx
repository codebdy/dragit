import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles, Accordion as MuiAccordion, Grid, TextField, withStyles } from '@material-ui/core';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IPropConfig } from "rx-drag/models/IPropConfig";
import intl from 'react-intl-universal';
import AttributeBoxActionSection from './ActionSection';
import AttributeBoxValidateArea from 'AppStudio/RxPageEditor/AttrebuteBox/ValidateArea';
import { IValidateRule } from "Base/Model/IValidateRule";
import { MultiSelectBox } from 'Components/Inputs/Select/MultiSelectBox';
import { resolveMetaConfig } from 'rx-drag/RxDrag';
import { observer } from 'mobx-react';
import { useDesign } from '../../../rx-drag/store/useDesign';
import { toJS } from 'mobx';
import { propsInputs } from './PropsInputs';
import { cloneObject } from 'rx-drag/utils/cloneObject';
import { MetaConfig } from 'Base/RXNode/MetaConfig';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { IAuth } from 'Base/Model/IAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:'100%',
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },

    nodeLabel:{
      padding:'16px',
      color: theme.palette.text.secondary,
    },

    moreIcon:{
      color:theme.palette.text.secondary,
    }
  }),
);

const Accordion = withStyles((theme) => ({
  root: {
    border: '1px solid ' + theme.palette.divider,
    borderLeft: '0',
    borderRight: '0',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid ' + theme.palette.divider,
    marginBottom: -1,
    minHeight: 46,
    '&$expanded': {
      minHeight: 46,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3, 2, 2, 2),
  },
}))(MuiAccordionDetails);

export const AttributeBox = observer(()=>{
  const classes = useStyles();
  const {rxDragStore} = useDesign();
  const studioStore = useAppStudioStore();
  const node = rxDragStore?.selectedNode;  
  const [metaConfig, setMetaConfig] = React.useState<MetaConfig>();
  const [metaProps, setMetaProps] =  React.useState<any>({});
  const [validateRule, setValidateRule] = React.useState<IValidateRule>();
  //const [auths, setAuths] = React.useState(node?.meta.auths);

  useEffect(() => {
    //setAuths(node?.meta.auths);
    if(node?.meta.name){
      setMetaProps(node?.meta.props || {});
      setMetaConfig(resolveMetaConfig(node?.meta.name) as MetaConfig)
    }

  },[node]);

  useEffect(() => {
    setMetaProps(node?.meta.props || {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[node?.meta.props]);

  const handlePropChange = (key:string, value:any) => {
    const props = cloneObject(toJS(node?.meta.props)||{});
    props[key] = value;  
    rxDragStore?.updateSelecteMeta('props', props);
  };

  const handleFieldChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let newField = event.target.value as string;
    rxDragStore?.updateSelecteMeta('field', newField);
  }

  const handleRuleChange = (rule:IValidateRule)=>{
    //node?.updateProp('rule', rule);
    setValidateRule(rule);
  }

  const handleChangeAuths = (auths : IAuth[]|undefined)=>{
    rxDragStore?.updateSelecteMeta('auths', auths);
  }

  return (
    <div className={classes.root}>
      {node&&
        <Fragment>
          <div className={classes.nodeLabel}>
            {intl.get('selected-node')}
            <span style={{color:'#5d78ff'}}>{node.meta.name}</span>
          </div>
          
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className = {classes.moreIcon} />}
            >
              <Typography className={classes.heading}>{intl.get('attributes')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {
                  metaConfig?.getPropConfigs().map((config:IPropConfig, index)=>{
                    const PropInput = config.propType ? propsInputs[config.propType] : undefined;
                    const label = config.label || intl.get(config.labelKey||'');
                    console.assert(PropInput, `Config editor not exist,Meta:${node?.meta.name}, prop:${config.name}, propType：${config.propType}`);
                    return(
                      PropInput && 
                      <PropInput 
                        key={index + '-' + config.name} 
                        label = {label}
                        value = {metaProps[config.name]}
                        onChange={(value: any) => handlePropChange(config.name, value)} 
                        {...config.props} 
                      />
                    )
                  })
                }
              </Grid>
            </AccordionDetails>
          </Accordion>
          {metaConfig?.hasField &&
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className = {classes.moreIcon} />}
              >
                <Typography className={classes.heading}>{intl.get('data')}</Typography>
              </AccordionSummary>
              <AccordionDetails  key={node.id + '-data'}>
                <TextField
                  size="small" 
                  variant = "outlined" 
                  label={intl.get("field")} value={node?.meta.field === undefined ? '' : node?.meta.field }
                  onChange={handleFieldChange}>
                </TextField>
              </AccordionDetails>            
            </Accordion>
          }
          {
            metaConfig?.hasValidation && 
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className = {classes.moreIcon} />}
                >
                  <Typography className={classes.heading}>{intl.get('validate')}</Typography>
                </AccordionSummary>
                <AccordionDetails  key={node.id + '-rule'}>
                  <AttributeBoxValidateArea rule={validateRule} onChange={handleRuleChange} /> 
                </AccordionDetails>            
              </Accordion>            
          }
          {metaConfig?.hasAction && 
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className = {classes.moreIcon} />}
              >
                <Typography className={classes.heading}>{intl.get('action')}</Typography>
              </AccordionSummary>
              <AccordionDetails key={node.id + '-action'}>
                <Grid container spacing={2}>
                  <AttributeBoxActionSection />
                </Grid>
              </AccordionDetails>            
            </Accordion>
          }
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className = {classes.moreIcon} />}
            >
              <Typography className={classes.heading}>{intl.get('authority')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MultiSelectBox fullWidth label={intl.get('authority')} 
                    variant="outlined" 
                    size="small"
                    items = {studioStore?.rxApp?.auths || []}
                    value = {node?.meta.auths || []}
                    onChange = {(e:any)=>handleChangeAuths(e.target.value)}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Fragment>
      }
    </div>
  )
})