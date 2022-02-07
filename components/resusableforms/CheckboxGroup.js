import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function CheckboxGroup ({ label, name, options, ...rest }) {
  return (
    <div className='form-control flex flex-row flex-wrap'>
      <div className="inline-flex items-center mb-2 flex-wrap">
        <label>{label}</label>
        <Field name={name} >
          {({ field }) => {
            return options.map(option => {
              return (
                <div key={option.key} className="inline-flex mb-2">
                  <input
                    type='checkbox'
                    id={option.value}
                    className="checkbox mr-2" 
                    {...field}
                    {...rest}
                    value={option.value}
                    checked={field.value.includes(option.value)}
                  />
                  <label htmlFor={option.value} className="mr-4">{option.key}</label>
                </div>
              )
            })
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </div>
    </div>
  )
}

export default CheckboxGroup