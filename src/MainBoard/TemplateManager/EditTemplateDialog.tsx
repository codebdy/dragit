import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { Grid, Button, TextField, DialogActions } from '@material-ui/core';
import PageDialog from 'Base/Widgets/PageDialog';
import { MediaSelect } from 'Components/Inputs/MediaSelect/MediaSelect';
import { useEffect, useState } from 'react';
import { IRxMedia } from 'Base/Model/IRxMedia';
import SubmitButton from 'Components/common/SubmitButton';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { IRxTemplate } from 'Base/Model/IRxTemplate';
import useLayzyAxios from 'Data/useLayzyAxios';
import { API_MAGIC_POST } from 'APIs/magic';
import { MagicPostBuilder } from 'Data/MagicPostBuilder';
import { RxTemplate } from './constants';
import { mutate } from 'swr';
import { queryAllTemplates } from 'MainBoard/querys';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent:{
      width:'100%',
      padding:theme.spacing(2),
    }
  }),
);


export const EditTemplateDialog = observer((
  props:{
    template?:IRxTemplate,
    open:boolean,
    onClose?:()=>void,
  }
) => {
  const {template, open, onClose} = props;
  const classes = useStyles();
  const [name, setName] = useState('');
  const [media, setMedia] = useState<IRxMedia>();
  const [schema, setSchema] = useState('[]');
  const [nameError, setNameError] = useState('');
  const [schemaError, setSchemaError] = useState('');

  const reset = ()=>{
    setName(template?.name||'');
    setMedia(template?.media);
    setSchema(template?.schema||'[]');
  }

  useEffect(()=>{
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[template])

  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value as string);
  }
  const handleMediaChange = (event: any)=>{
    setMedia(event?.target?.value as IRxMedia);
  }

  const handleClose = ()=>{
    reset();
    onClose && onClose();
  }

  const [excutePost, {loading:updating, error}] = useLayzyAxios(API_MAGIC_POST,
      {
        onCompleted(newTemplate:any){
          onClose && onClose();
          const url = queryAllTemplates.toAxioConfig().url||null;
          mutate(url, 
            (data: any)=>{
              data.data = data?.data?.map((oneTemplate: IRxTemplate)=>{
                if(template?.id === oneTemplate.id){
                  return newTemplate[RxTemplate];
                }
                return oneTemplate;
              });
              if(!template?.id){
                data.data = [...data.data, newTemplate[RxTemplate]];
              }
              return data;
            });
        }
      }
    );

  useShowServerError(error);

  const handleSchemaChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setSchema(event.target.value as string);
  }

  const handleSave = ()=>{
    if(!name){
      setNameError(intl.get('required'))
      return;
    }
    else{
      setNameError('')
    }

    if(!schema){
      setSchemaError(intl.get('required'))
      return;
    }
    else{
      setSchemaError('')
    }
    const data = new MagicPostBuilder()
      .setModel(RxTemplate)
      .setSingleData({
        id:template?.id,
        name,
        media: media?.id || null,
        schema,
      })
      .toData();
      excutePost({data});
  }

  return (
    <PageDialog title={intl.get('edit-template')} open = {open} onClose = {onClose}>
      <div className = {classes.dialogContent}>
        <Grid container spacing = {2}>
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                variant="outlined" 
                label = {intl.get('name')}
                value = {name}
                required
                error = {!!nameError}
                helperText = {nameError}
                onChange = {handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MediaSelect 
                label = {intl.get('thumbnail')}
                width = "200px"
                value = {media}
                onChange = {handleMediaChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                variant="outlined" 
                label = "Schema"
                multiline
                required
                error = {!!schemaError}
                helperText = {schemaError}
                value = {schema}
                onChange = {handleSchemaChange}
                rows = {20}
              />
            </Grid>
        </Grid>
      </div>
      <DialogActions>
        <Button onClick = {handleClose}>
          {intl.get('cancel')}
        </Button>
        <SubmitButton 
          submitting = {updating}
          color = "primary" 
          variant = "contained"
          onClick = {handleSave}
        >
          {intl.get('save')}
        </SubmitButton>
      </DialogActions>
    </PageDialog>

  );
})
