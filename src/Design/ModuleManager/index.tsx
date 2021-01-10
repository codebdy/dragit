import { Button } from "@material-ui/core";
import Spacer from "Components/common/Spacer";
import DesignerLayout from "Design/Layout";
import React, { Fragment, useState } from "react";
import LeftContent from "./LeftContent";
import intl from "react-intl-universal";
import ModuleContent from "./ModuleContent";
import { useHistory } from "react-router";
import { useAuthCheck } from "Store/Helpers/useAuthCheck";
import { AUTH_CUSTOMIZE } from "Base/authSlugs";

const ModuleManager = (props:{children?: any})=>{
  const history = useHistory();

  const [selectedModuleId, setSelectedModuleId] = useState('');

  useAuthCheck(AUTH_CUSTOMIZE);

  const handleReturn = ()=>{
    history.goBack();
  }

  return (
    <DesignerLayout
      leftArea={
        <LeftContent onSelect = {moduleId=>setSelectedModuleId(moduleId)}/>
      }
      toolbar = {
        <Fragment>
          <Spacer></Spacer>
          <Button variant="contained" color="primary" onClick={handleReturn} size="large">
            {intl.get('go-back')}
          </Button>          
        </Fragment>
      }      
    >
      {
        selectedModuleId &&
        <ModuleContent moduleId = {selectedModuleId} />        
      }

    </DesignerLayout>
  )
}

export default  ModuleManager