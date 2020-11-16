import { Button } from "@material-ui/core";
import Spacer from "components/common/Spacer";
import DesignerLayout from "designer/Layout";
import React, { Fragment } from "react";
import LeftContent from "./LeftContent";
import intl from "react-intl-universal";
import { withRouter } from 'react-router-dom';

const ModuleManager = (props:{children?: any, history:any})=>{
  const{history} = props;
  const handleReturn = ()=>{
    history.goBack();
  }

  return (
    <DesignerLayout
      leftArea={
        <LeftContent />
      }
      toolbar = {
        <Fragment>
          <Spacer></Spacer>
          <Button variant="contained" color="primary" onClick={handleReturn}>
            {intl.get('go-back')}
          </Button>          
        </Fragment>
      }      
    >
      模块管理
      
    </DesignerLayout>
  )
}

export default  withRouter(ModuleManager)