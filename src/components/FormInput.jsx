function FormInput({ label, id, value, onChange, placeholder, error, required = false, multiline = false, type = 'text' }) {
  const commonProps = {
    id,
    name: id,
    value,
    onChange: (event) => onChange(event.target.value),
    placeholder,
    required,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
  }

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
      {multiline ? (
        <textarea {...commonProps} rows="5" />
      ) : (
        <input {...commonProps} type={type} />
      )}
      {error && <small className="form-error" id={`${id}-error`}>{error}</small>}
    </div>
  )
}

export default FormInput
