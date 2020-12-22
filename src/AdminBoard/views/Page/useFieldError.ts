import { useFormContext } from "./Form/useFormContext";

export default function useFieldError(field:string){

  const {errors} = useFormContext();

  if(!errors){
    return undefined;
  }

  let error = errors[field]
  return error;
}