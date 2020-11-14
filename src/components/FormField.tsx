import React, { Fragment } from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import resolveSkeleton from 'admin/views/Page/resolveSkeleton';
import { Controller } from 'react-hook-form';
import { resolveNode } from 'DragIt';

const FormField = React.forwardRef((props:any, ref:any) => {
  const {as, control, value,...rest} = props
  
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const skeletonView = resolveSkeleton(as);  
  const InputControl = resolveNode(as);

  return (
    pageInStore.modelLoading ? skeletonView :
    <Fragment>
      {
        control?
        <Controller
          as={InputControl}
          control = {control}
          defaultValue = {value}
          {...rest}
          ref={ref}
        />
        :
        <InputControl
          {...rest}
          ref={ref}
        />
      }

    </Fragment>
  )
});

export default FormField