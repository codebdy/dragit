import React from "react";
import { useForm } from "react-hook-form";
import FieldTest from "./FieldTest"

export default function FormikExample() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldTest />
      <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
      {errors.lastName && "Last name error"}
      <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
}