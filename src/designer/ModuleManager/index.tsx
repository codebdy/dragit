import DesignerLayout from "designer/Layout";
import React from "react";
import LeftContent from "./LeftContent";

export default function ModuleManager(props:{children?: any}) {
  return (
    <DesignerLayout
      leftArea={
        <LeftContent />
      }
      toolbar = {
        'xx'
      }      
    >
      模块管理
      
    </DesignerLayout>
  )
}