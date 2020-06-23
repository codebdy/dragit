import React from 'react';
import { resolveNode } from 'components/resoveNode';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import resolveSkeleton from 'admin/views/Page/resolveSkeleton';

const FormField = React.forwardRef((props:any, ref:any) => {
  const {as, ...rest} = props
  
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const skeletonView = resolveSkeleton(as);  
  const InputControl = resolveNode(as);

  return (
    pageInStore.modelLoading ? skeletonView :
    <InputControl 
      {...rest} 
      ref={ref}
    />
  )
});

export default FormField