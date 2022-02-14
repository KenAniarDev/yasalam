import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl'

const FormikContainer = () => {
    const checkboxOptions = [
        {key: 'Option 1', value: 'cption1'},
        {key: 'Option 2', value: 'cption2'},
        {key: 'Option 3', value: 'cption3'}
    ]
    const radioOptions = [
        {key: 'Option 1', value: 'rption1'},
        {key: 'Option 2', value: 'rption2'},
        {key: 'Option 3', value: 'rption3'}
    ]
    const dropdownOptions = [
        {key: 'Select an option', value: ''},
        {key: 'Option 1', value: 'option1'},
        {key: 'Option 2', value: 'option2'},
        {key: 'Option 3', value: 'option3'}
    ]
    const initialValues = {
        email: '',
        description: '',
        selectOption: '',
        radioOption: '',
        checkboxOption: [],
        birthDate: null
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Required!').email(),
        description: Yup.string().required('Required!'),
        selectOption: Yup.string().required('Required!'),
        radioOption: Yup.string().required('Required!'),
        checkboxOption: Yup.array().required('Required!'),
        birthDate: Yup.date().required('Required!').nullable(),
    })
    const onSubmit = values => console.log('Form values', values)
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => 
                <Form>
                    <FormikControl control='input' label='Email' name='email' />
                    <FormikControl control='textarea' label='Description' name='description' />
                    <FormikControl control='select' label='Select a Topic' name='selectOption' options={dropdownOptions} />
                    <FormikControl control='radio' label='Radio Topic' name='radioOption' options={radioOptions} />
                    <FormikControl control='checkbox' label='Checkbox Topic' name='checkboxOption' options={checkboxOptions} />
                    <FormikControl control='date' label='Pick a date' name='birthDate' />
                    <button type="submit">Submit</button>
                </Form>
            }
        </Formik>
    )
}

export default FormikContainer
