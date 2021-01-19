import React from 'react';
import { Grid, Divider } from '@material-ui/core';

import { observer } from 'mobx-react';

const OneToManyPortletRow = observer(React.forwardRef((
  props: {
    children:any,
  },
  ref:any
)=>{
  const {children, ...rest} = props;

  return (
    <Grid item xs={12} {...rest}>
      <Divider />
      {children}
    </Grid>
  )
}))

export default OneToManyPortletRow