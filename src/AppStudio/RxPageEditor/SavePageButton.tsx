import * as React from 'react';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import SubmitButton from 'Components/Common/SubmitButton';

export const SavePageButton = observer(() => {

  return (
    <SubmitButton variant = "contained" color= "primary">
      {intl.get('save')}
    </SubmitButton>
  );
})
