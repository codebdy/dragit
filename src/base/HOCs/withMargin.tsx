import React from 'react';

export const makeSpaceStyle = (spacing:any)=>{
  return ((spacing?spacing:0) * 8) + 'px'
}

//转出来的ref实时性不能满足要求，暂时弃用改高阶组件，上面的函数还在使用
const withMargin = (Component:any)=>{
  const WithMargin = (props:any)=>{
    const {
      style,     
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      forwardedRef, ...rest
    } = props;

    const mergedStyle = {
      ...style,
      marginTop : makeSpaceStyle(marginTop),
      marginRight : makeSpaceStyle(marginRight),
      marginBottom : makeSpaceStyle(marginBottom),
      marginLeft : makeSpaceStyle(marginLeft),    
    }
  
    return(
      <Component ref={forwardedRef} style={mergedStyle} {...rest} />
    )
  }

  return React.forwardRef((props, ref) => {
    return <WithMargin {...props} forwardedRef={ref} />;
  });
}

export default withMargin