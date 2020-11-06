import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

export default function FieldTest(){
  const { register, errors } = useForm();

  return (
    <Fragment>
      <input name="firstName" ref={register({ required: true, maxLength: 20 })} />
      {errors.firstName && "First name is required"}
    </Fragment>
  )
}
