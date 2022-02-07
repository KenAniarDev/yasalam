import React from 'react';
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError';

const Select = ({ label, name, options, ...rest}) => {
    return (
        <div className="form-control">
            <label htmlFor={label}>{label}</label>
            <Field id={name} name={name} {...rest} as='select' className="select select-bordered w-full">
                {
                    options.map((option) => {
                        return (
                            <option key={option.key} value={option.value}>{option.key}</option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}

export default Select;