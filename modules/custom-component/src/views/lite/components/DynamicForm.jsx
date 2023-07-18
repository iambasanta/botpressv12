import React, { useState, useEffect } from 'react'

export const DynamicForm = props => {
  const [fields, setFields] = useState([])
  const [inputValues, setInputValues] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if (fields.length > 0) {
      const confirm = window.confirm(`This would be sent to the configured endpoint: ${props.endpoint}`)
      if (confirm) {
        await props.bp.axios.post('/mod/custom-component/test-end-point', {
          endpoint: props.endpoint,
          inputValues: inputValues
        })
      }
    }
  }

  const handleInputChange = (e, field) => {
    setInputValues({
      ...inputValues,
      [field?.title]: e?.target?.value
    })
  }

  useEffect(() => {
    const filterFields = props.response?.data?.input_fields?.filter(field => field !== undefined)
    setFields(filterFields)
  }, [props])

  useEffect(() => {
    for (const field of fields) {
      setInputValues(prevState => {
        return { ...prevState, [field.title]: '' }
      })
    }
  }, [fields])

  return (
    <div>
      <form className="form_container">
        <h3 className="form_title">{props.response?.data?.title}</h3>
        {props.response?.data?.input_fields?.map((field, index) => (
          <div className="input_group" key={index}>
            <label htmlFor={field.title} className="input_field_label">
              {field.title}
            </label>
            <br />
            <input
              name={field.title}
              id={field.title}
              type={field.type}
              className="input_field_type input_field_box input_field_radio"
              value={inputValues[field.title] || ''}
              onChange={e => handleInputChange(e, field)}
            />
            <br />
          </div>
        ))}
        <br />
        <button onClick={handleSubmit} className="form_button">
          Submit
        </button>
      </form>
    </div>
  )
}
