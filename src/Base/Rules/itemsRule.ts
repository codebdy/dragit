import { IProp } from "Base/Model/IProp";
import SelectItemsInputItemDialog from "Components/Inputs/Select/PropsInputs/SelectItemsInputItemDialog";

const itemsRule:IProp = {
  name:'items',
  label:'items-data',
  xs:12,
  input:SelectItemsInputItemDialog,
}

export default itemsRule;