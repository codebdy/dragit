import { IPropConfig } from "rx-drag/models/IPropConfig";
import SelectItemsInputItemDialog from "Components/Inputs/Select/PropsInputs/SelectItemsInputItemDialog";

const itemsRule:IPropConfig = {
  name:'items',
  label:'items-data',
  input:SelectItemsInputItemDialog,
}

export default itemsRule;