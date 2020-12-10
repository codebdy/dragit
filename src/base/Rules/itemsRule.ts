import { IProp } from "base/Model/IProp";
import SelectItemsInputItemDialog from "components/Select/PropsInputs/SelectItemsInputItemDialog";

const itemsRule:IProp = {
  name:'items',
  label:'items-data',
  xs:12,
  input:SelectItemsInputItemDialog,
}

export default itemsRule;