import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

const Input = ({ label, name, className, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <Field
        id={name}
        name={name}
        {...rest}
        className={className ? 'input ' + className : 'input'}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
