import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

const Checkbox = ({ label, name, ...rest }) => {
  return (
    <div className='form-control'>
      <Field
        id={name}
        name={name}
        {...rest}
        className='toggle toggle-lg toggle-accent'
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Checkbox;
