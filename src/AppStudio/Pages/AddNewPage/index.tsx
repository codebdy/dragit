import * as React from 'react';
import { observer } from 'mobx-react';
import { Fragment, useState } from 'react';
import { Button } from '@material-ui/core';
import intl from 'react-intl-universal';
import { TemplatesDialog } from './TemplatesDialog';

export const AddNewPage = observer(() => {
  const [open, setOpen] = useState(false);

 
  const handleNew = ()=>{
    setOpen(true);
  }

  const handleClose = ()=>{
    setOpen(false);
  }

  return (
    <Fragment>
      <Button 
        variant="outlined" 
        color = "primary"
        onClick = {handleNew}
      >{intl.get('add-new')}</Button>
      {
        open&&
        <TemplatesDialog open = {open} onClose = {handleClose} />
      }
      
    </Fragment>
  );
})
