import React from 'react';

const makeSpaceStyle = (spacing:any)=>{
  return ((spacing?spacing:0) * 8) + 'px'
}

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