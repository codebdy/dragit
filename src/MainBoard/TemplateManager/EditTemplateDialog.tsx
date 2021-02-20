import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { Grid, Button, TextField, DialogActions } from '@material-ui/core';
import PageDialog from 'Base/Widgets/PageDialog';
import { MediaSelect } from 'Components/Inputs/MediaSelect/MediaSelect';
import { useState } from 'react';
import { IRxMedia } from 'Base/Model/IRxMedia';
import { gql, useMutation } from '@apollo/react-hooks';
import SubmitButton from 'Components/common/SubmitButton';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';

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
    open:boolean,
    onClose?:()=>void,
  }
) => {
  const {open, onClose} = props;
  const classes = useStyles();
  const [name, setName] = useState('');
  const [media, setMedia] = useState<IRxMedia>();
  const [schema, setSchema] = useState('');
  const [nameError, setNameError] = useState('');
  const [schemaError, setSchemaError] = useState('');

  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value as string);
  }
  const handleMediaChange = (event: any)=>{
    setMedia(event?.target?.value as IRxMedia);
  }

  const [excuteCreate, {loading:creating, error:createError}] = useMutation(
    gql`
      mutation($rxTemplate:CreateRxTemplateInput){
        createRxTemplate(rxTemplate:$rxTemplate){
        id
      }
    }
    `,
    {
      errorPolicy:'all',
      onCompleted(){
        onClose && onClose();
      }
    }
  )

  useShowAppoloError(createError);

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

    excuteCreate({variables:{
      rxTemplate:{
        name,
        rx_media_id: media?.id || null,
        schema,
      }
    }})
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
        <Button onClick = {onClose}>
          {intl.get('cancel')}
        </Button>
        <SubmitButton 
          submitting = {creating}
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
