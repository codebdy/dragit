import BooleanInput from "./BooleanInput";
import ItemsInputDialog from "./ItemInputDialog";
import JSONInput from "./JSONInput";
import NumberInput from "./NumberInput";
import OptionSelect from "./OptionSelect";
import StringInput from "./StringInput";

export const propsInputs:{
  [key:string]:any
} ={
  'string': StringInput,
  'boolean': BooleanInput,
  'number': NumberInput,
  select: OptionSelect,
  items:ItemsInputDialog,
  'JSON':JSONInput,
}