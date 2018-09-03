import React from 'react';

const TextAreaField = ({
  name,
  value,
  placeholder,
  label,
  onChange,
  onBlur,
  disabled,
  autoFocus,
  autoComplete,
  rows,
  className,
  id,
  minLength,
  maxLength,
  required
}) => {
  return (
    <fieldset>
      {/* <label htmlFor={name}>
        {label}
      </label> */}
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        className={className}
        id={id}
        rows={rows}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      >
      </textarea>
    </fieldset>
  );
};

TextAreaField.defaultProps = {
  className: 'text-area',
  rows: 5,
  required: false
};

export default TextAreaField;