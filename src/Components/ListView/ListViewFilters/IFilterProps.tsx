import { DADA_RXID_CONST } from 'rx-drag/RxNode';
import { InputSize, InputVariant } from 'Components/Inputs/InputPropTypes';


export interface IFilterProps {
  [DADA_RXID_CONST]:string;
  variant?: InputVariant;
  label?: string;
  width?: string;
  size?: InputSize;
  withoutAll?: boolean;
  helperText?: string;
  style?:any,
}
