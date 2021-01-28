import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles, Accordion, Grid, TextField } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IPropConfig } from "rx-drag/models/IPropConfig";
import intl from 'react-intl-universal';
import AttributeBoxActionSection from './ActionSection';
import AttributeBoxValidateArea from 'Design/PageEditor/AttrebuteBox/ValidateArea';
import { IValidateRule } from "Base/Model/IValidateRule";
import MultiSelectBox from 'Components/Inputs/Select/MultiSelectBox';
import { resolveMetaConfig } from 'rx-drag/RxDrag';
import { IRxMetaConfig } from 'rx-drag/models/IRxMetaConfig';
import { observer } from 'mobx-react';
import { useDesign } from '../../../rx-drag/store/useDesign';
import { toJS } from 'mobx';
import { propsInputs } from './PropsInputs';
import { cloneObject } from 'rx-drag/utils/cloneObject';
import { MetaConfig } from 'Base/RXNode/MetaConfig';

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

export const AttributeBox = observer(()=>{
  const classes = useStyles();
  const {rxDragCoreStore: editorStore} = useDesign();
  const node = editorStore?.selectedNode;  
  const [metaConfig, setMetaConfig] = React.useState<MetaConfig>();
  const [validateRule, setValidateRule] = React.useState<IValidateRule>();
  const [auths, setAuths] = React.useState(node?.meta.props?.auths);

  useEffect(() => {
    node?.meta.name && setMetaConfig(resolveMetaConfig(node?.meta.name) as MetaConfig)
  },[node]);

  const handlePropChange = (key:string, value:any) => {
    const props = cloneObject(toJS(node?.meta.props)||{});
    props[key] = value;  
    editorStore?.updateSelecteMeta('props', props);
  };

  const handleFieldChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let newField = event.target.value as string;
    editorStore?.updateSelecteMeta('field', newField);
  }

  const handleRuleChange = (rule:IValidateRule)=>{
    //node?.updateProp('rule', rule);
    setValidateRule(rule);
  }

  const handleChangeAuths = (auths : string[]|undefined)=>{
    //node?.updateProp('auths', auths);
    setAuths(auths);
  }

  const props = node?.meta.props || {};

  return (
    <div className={classes.root}>
      {node&&
        <Fragment>
          <div className={classes.nodeLabel}>
            {intl.get('selected-node')}
            <span style={{color:'#5d78ff'}}>{node.meta.name}</span>
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
                  metaConfig?.getPropConfigs().map((config:IPropConfig, index)=>{
                    const PropInput = config.propType ? propsInputs[config.propType] : undefined;
                    const label = config.label || intl.get(config.labelKey||'');
                    console.assert(PropInput, `Config editor not exist,Meta:${node?.meta.name}, prop:${config.name}, propType：${config.propType}`);
                    return(
                      PropInput && 
                      <PropInput 
                        key={index + '-' + config.name} 
                        label = {label}
                        value = {props[config.name]}
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
                  label={intl.get("field")} value={node?.meta.field === undefined ? '' : node?.meta.field }
                  onChange={handleFieldChange}>
                </TextField>
              </AccordionDetails>            
            </Accordion>
          }
          {
            metaConfig?.hasValidation && 
              <Accordion  className={classes.panelPaper}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.heading}>{intl.get('validate')}</Typography>
                </AccordionSummary>
                <AccordionDetails  key={node.id + '-rule'} className={classes.pannelDetail}>
                  <AttributeBoxValidateArea rule={validateRule} onChange={handleRuleChange} /> 
                </AccordionDetails>            
              </Accordion>            
          }
          {metaConfig?.hasAction && 
            <Accordion  className={classes.panelPaper}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={classes.heading}>{intl.get('action')}</Typography>
              </AccordionSummary>
              <AccordionDetails key={node.id + '-action'} className={classes.pannelDetail}>
                <Grid container spacing={2}>
                  <AttributeBoxActionSection />
                </Grid>
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
              <MultiSelectBox label={intl.get('authority')} 
                variant="outlined" 
                size="small"
                //dataApi = {API_GET_AUTHS}
                itemKey = "slug"
                groupByField = "module"
                value = {auths || []}
                onChange = {(e:any)=>handleChangeAuths(e.target.value)}
              />
                </AccordionDetails>
          </Accordion>
        </Fragment>
      }
    </div>
  )
})