import React from "react";
import { useForm, Controller } from "react-hook-form";
import {TextField} from "@material-ui/core"

export default function FormikExample() {
  const { register, errors, control, handleSubmit } = useForm({mode:'all'});
  const onSubmit = data => console.log(data);
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={TextField}
        name="firstName"
        control={control}
        defaultValue=""
        error={errors&&errors.hasOwnProperty('firstName')}
        helperText={errors.firstName && '出错了'}
        rules={{ required: '必须输入', maxLength: 3 }}
      />
      
      <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
      {errors.lastName && "Last name error"}
      <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
}