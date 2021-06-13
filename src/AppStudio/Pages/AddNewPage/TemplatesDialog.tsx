import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { gql, useMutation } from '@apollo/react-hooks';
import { CREATE_RX_PAGE, pageFieldsGQL } from "Base/GraphQL/PAGE_GQLs";
import intl from 'react-intl-universal';
import { Divider, DialogContent, Grid, DialogActions, TextField, Button } from '@material-ui/core';
import RxDialog from 'AppStudio/RxDialog';
import { IRxTemplate } from 'Base/Model/IRxTemplate';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import TemplatesSkeleton from './TemplatesSkeleton';
import { useState } from 'react';
import Image from 'Components/common/Image';
import classNames from 'classnames';
import SubmitButton from 'Components/common/SubmitButton';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { useMagicQuery } from 'Data/useMagicQuery';
import { queryAllTemplates } from 'MainBoard/AppManager/querys';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content:{
      flex:1,
      minHeight:'300px',
    },
    actions:{
      display:'flex',
      justifyContent:'space-between',
      padding:theme.spacing(2),
    },
    pageName:{
      minWidth:'260px',
    },
    buttons:{
      display:'flex',
      alignItems:'center',
    },
    confirmButton:{
      marginLeft:theme.spacing(1),
    },
    image:{
      border:theme.palette.divider + ' solid 1px',
      '&:hover':{
        outline: theme.palette.primary.main + ' solid 1px',
      }
    },
    selected:{
      outline: theme.palette.primary.main + ' solid 2px',
      '&:hover':{
        outline: theme.palette.primary.main + ' solid 2px',
      }
    },
    templateGrid:{
      display:'flex',
      flexFlow:'column',
      cursor: 'pointer',
    },
    templateName:{
      flex:1,
      display:'flex',
      justifyContent: 'center',
      alignItems : 'center',
      padding:theme.spacing(1),
      fontSize:'1.1rem',
    }
  }),
);


export const TemplatesDialog = observer((
  props:{
    open:boolean,
    onClose:()=>void,
  }
) => {
  const {open, onClose} = props;
  const classes = useStyles();
  const [name, setName] = useState(intl.get('new-page'));
  const [selected, setSelected] = useState<IRxTemplate>();
  const {loading, data, error} = useMagicQuery<IRxTemplate[]>(queryAllTemplates);
  const dragItStore = useDragItStore();
  const studioStore = useAppStudioStore();
  const [excuteCreate, {loading:creating, error:createError}] = useMutation(CREATE_RX_PAGE, {
    errorPolicy:'all',
    //更新缓存
    update(cache, { data: { createRxPage } }){
      cache.modify({
        id: cache.identify(studioStore?.rxApp as any),
        fields: {
          pages(existingPageRefs = []){
            const newPageRef = cache.writeFragment({
              data: createRxPage,
              fragment: gql`
                fragment NewPage on RxPage {
                  ${pageFieldsGQL}
                }
              `
            });
            return [...existingPageRefs, newPageRef];
          }
        }
      });
    },
    //结束后返回
    onCompleted: (data)=>{
      dragItStore.setSuccessAlert(true)
      onClose();
    }
  })

  useShowServerError(error||createError);

  const templates = data?.data;

  const handleClose = ()=>{
    onClose();
    setName(intl.get('new-page'));
  }

  const handelNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const newValue = event.target.value as string;
    setName(newValue);
  }

  const handleConfirm = ()=>{
    excuteCreate({variables:{
      rx_app_id:studioStore?.rxApp?.id,
      schema:selected?.schema,
      name
    }})
  }

  
  return (
    <RxDialog 
      open = {open}
      title = {intl.get('add-new-page')}
      onClose = {handleClose}
      maxWidth = "sm"
    >
      <Divider />
      <DialogContent className={classes.content}>
        {
          loading
          ? <TemplatesSkeleton />
          : <Grid container spacing = {2}>
              {
                templates?.map((template:IRxTemplate)=>{
                  return(
                    <Grid 
                      key={template.id} item  md={4} 
                      className = {classes.templateGrid}
                      onClick={()=>{setSelected(template)}}
                    >
                      <Image 
                        src = {template.media?.thumbnail} 
                        className={
                          classNames(classes.image,{[classes.selected]:selected?.id === template.id})
                        }
                      />
                      <div className = {classes.templateName}>{template.name}</div>
                    </Grid>
                  )
                })
              }
            </Grid>
        }
      </DialogContent>
      <Divider />
      <DialogActions className = {classes.actions}>
          <TextField 
            className={classes.pageName} 
            variant = "outlined" 
            size="small" 
            label = {intl.get('page-name')}
            value = {name}
            onChange = {handelNameChange}
          />    
          <div className = {classes.buttons}>
            <Button 
              variant = "outlined"
              onClick = {handleClose}
            >
              {intl.get('cancel')}
            </Button>
            <SubmitButton 
              className = {classes.confirmButton} 
              variant = "contained" 
              color = "primary"
              submitting = {creating}
              onClick = {handleConfirm}
              disabled = {!name || !selected}
            >
              {intl.get('confirm')}
            </SubmitButton>
          </div>
        </DialogActions>   
    </RxDialog>
  );
})
