import React from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import RadioButton from './RadioButton'
import CheckboxGroup from './CheckboxGroup'
import AppDatePicker from './AppDatePicker'
import Toggle from './Checkbox'

const FormikControl = ({ control, ...rest }) => {
    switch(control){
        case 'input': 
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'radio':
            return <RadioButton {...rest} />
        case 'checkbox':
            return <CheckboxGroup {...rest} />
        case 'toggle':
            return <Toggle {...rest} />
        case 'date':
            return <AppDatePicker {...rest} />
        default : return <Input {...rest} />
    }
}

export default FormikControl
