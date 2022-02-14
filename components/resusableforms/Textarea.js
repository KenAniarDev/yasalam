import React from 'react';
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError';

const Textarea = ({ label, name, className, ...rest }) => {
    return (
        <div className="form-control">
            <label htmlFor={label} className="label">
                <span className="label-text">{label}</span>
            </label>
            <Field id={name} name={name} {...rest} as='textarea' className={className ? "textarea h-24 " + className : "textarea h-24 "} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}

export default Textarea;