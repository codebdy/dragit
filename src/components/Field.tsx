import React from 'react';
import { resolveNode } from 'designer/Core/resoveNode';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import resolveSkeleton from 'admin/views/Page/resolveSkeleton';

const Field = React.forwardRef((props:{as:string}, ref:any) => {
  const {as, ...rest} = props
  const InputControl = resolveNode(as);
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);

  const skeletonView = resolveSkeleton(as);
  return (
    pageInStore.modelLoading ? skeletonView :
    <InputControl {...rest} ref={ref}/>
  )
});

export default Field