import React, { useState, useEffect } from 'react'

export const DynamicForm = props => {
  const [fields, setFields] = useState([])
  const [inputValues, setInputValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if (fields.length > 0) {
      if (validateForm()) {
        try {
          const response = await props.bp.axios.post('/mod/custom-component/test-end-point', {
            endpoint: props.endpoint,
            inputValues: inputValues
          })
          if (response.status === 200) {
            props.onSendData?.({
              type: 'form_submitted',
              payload: {
                title: props.response?.data?.title
              }
            })
          }
        } catch (error) {
          console.error('ERROR:', error)
        }
      }
    }
  }

  const handleInputChange = (e, field) => {
    setInputValues({
      ...inputValues,
      [field?.name]: e?.target?.value
    })
  }

  const capetilizeFirstLetter = name => name[0].toUpperCase() + name.slice(1)

  const validateForm = () => {
    let formIsValid = true
    const newErrors = {}
    for (const field of fields) {
      if (field.isRequired && !inputValues[field.name]) {
        newErrors[field.name] = `${capetilizeFirstLetter(field.name)} is required!`
        formIsValid = false
      }
    }

    setErrors(newErrors)
    return formIsValid
  }

  const renderInputField = field => {
    switch (field?.type) {
      case 'dropdown':
        return (
          <>
            <select
              name={field?.name}
              id={field?.name}
              onChange={e => handleInputChange(e, field)}
              className="dropdown"
              required={field?.isRequired ? true : false}
            >
              {field?.options?.split(',')?.map((option, index) => {
                return (
                  <option value={option} className="dropdown_option">
                    {option}
                  </option>
                )
              })}
            </select>
          </>
        )
        break
      case 'radio':
        return (
          <>
            <div onChange={e => handleInputChange(e, field)}>
              {field?.options?.split(',')?.map((option, index) => {
                return (
                  <>
                    <input
                      type={field?.type}
                      value={option}
                      name={field?.name}
                      className="input_field_radio"
                      required={field?.isRequired ? true : false}
                    />
                    {option}
                  </>
                )
              })}
            </div>
            <br />
          </>
        )
        break
      case 'checkbox':
        return (
          <>
            <div>
              {field?.options?.split(',')?.map((option, index) => {
                return (
                  <>
                    <input
                      type={field?.type}
                      onChange={e => handleInputChange(e, field)}
                      value={option}
                      name={field?.name}
                      className="input_field_box"
                      required={field?.isRequired ? true : false}
                    />
                    {option}
                  </>
                )
              })}
            </div>
            <br />
          </>
        )
        break
      case 'text':
        return (
          <>
            <input
              name={field?.name}
              id={field?.name}
              type={field?.type}
              className="input_field_type"
              value={inputValues[field?.name] || ''}
              onChange={e => handleInputChange(e, field)}
              required={field?.isRequired ? true : false}
            />
          </>
        )
        break
      case 'textarea':
        return (
          <>
            <textarea
              name={field?.name}
              id={field?.name}
              className="input_field_textarea"
              value={inputValues[field?.name] || ''}
              onChange={e => handleInputChange(e, field)}
              required={field?.isRequired ? true : false}
            />
          </>
        )
        break
      case 'file':
        return (
          <>
            <input
              name={field?.name}
              id={field?.name}
              type={field?.type}
              className="input_field_type"
              value={inputValues[field?.name] || ''}
              onChange={e => handleInputChange(e, field)}
              required={field?.isRequired ? true : false}
            />
          </>
        )
        break
      case 'email':
        return (
          <>
            <input
              name={field?.name}
              id={field?.name}
              type={field?.type}
              className="input_field_type"
              value={inputValues[field?.name] || ''}
              onChange={e => handleInputChange(e, field)}
              required={field?.isRequired ? true : false}
            />
          </>
        )
        break
      case 'password':
        return (
          <>
            <input
              name={field?.name}
              id={field?.name}
              type={field?.type}
              className="input_field_type"
              value={inputValues[field?.name] || ''}
              onChange={e => handleInputChange(e, field)}
              required={field?.isRequired ? true : false}
            />
          </>
        )
        break
      case 'date':
        return (
          <>
            <input
              name={field?.name}
              id={field?.name}
              type={field?.type}
              className="input_field_type"
              value={inputValues[field?.name] || ''}
              onChange={e => handleInputChange(e, field)}
              required={field?.isRequired ? true : false}
            />
          </>
        )
        break

      default:
        return <></>
        break
    }
  }

  const visible = props.isLastGroup && props.isLastOfGroup

  const renderForm = () => {
    if (visible) {
      return (
        <>
          <form className="form_container">
            <h3 className="form_title">{props.response?.data?.title}</h3>
            {props.response?.data?.input_fields?.map((field, index) => (
              <div className="input_group" key={index}>
                <label htmlFor={field?.name} className="input_field_label">
                  {field?.label}
                </label>
                <br />

                {renderInputField(field)}

                <br />
                <div className="error_message">{errors[field.name]}</div>
              </div>
            ))}

            <br />

            <button onClick={handleSubmit} className="form_button">
              Submit
            </button>
          </form>
        </>
      )
    } else {
      return (
        <>
          <p className="success_message">{props.response?.data?.title} is submitted!</p>
        </>
      )
    }
  }

  useEffect(() => {
    const filterFields = props.response?.data?.input_fields?.filter(field => field !== undefined)
    setFields(filterFields)
  }, [props])

  useEffect(() => {
    for (const field of fields) {
      setInputValues(prevState => {
        return { ...prevState, [field?.name]: '' }
      })
    }
    setErrors({})
  }, [fields])

  return renderForm()
}
