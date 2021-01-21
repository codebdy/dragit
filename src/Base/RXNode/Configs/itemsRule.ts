import { IPropConfig } from "Base/RXNode/IPropConfig";
import SelectItemsInputItemDialog from "Components/Inputs/Select/PropsInputs/SelectItemsInputItemDialog";

const itemsRule:IPropConfig = {
  name:'items',
  label:'items-data',
  xs:12,
  input:SelectItemsInputItemDialog,
}

export default itemsRule;