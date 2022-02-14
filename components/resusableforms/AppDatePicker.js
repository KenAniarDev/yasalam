import React from 'react'
import DatePicker from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import 'react-datepicker/dist/react-datepicker.css'

const AppDatePicker = ({ label, name, ...rest }) => {
  const onChange = (val) => {
    // setFieldValue(name, val)
    console.log(val)
  }
  return (
    <div className='form-control text-left'>
      <label htmlFor={name} className="label">{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          // const { setFieldValue } = form
          const { value } = field
          return (
            <DatePicker
              id={name}
              selected={value}
              onChange={val => onChange(val) }
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              {...field}
              {...rest}
              className="btn btn-primary"
            />
            // <DateView
            //   id={name}
            //   {...field}
            //   {...rest}
            //   selected={value}
            //   onChange={val => setFieldValue(name, val)}
            //   className="btn btn-primary pt-2"
            // />
          )
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default AppDatePicker