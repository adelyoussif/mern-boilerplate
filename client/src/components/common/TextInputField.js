import React from 'react';

const TextInputField = ({
  name,
  type,
  value,
  placeholder,
  label,
  onChange,
  onBlur,
  disabled,
  autoFocus,
  autoComplete,
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
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        className={className}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </fieldset>
  );
};

TextInputField.defaultProps = {
  type: 'text',
  className: 'text-input',
  minLength: 2,
  maxLength: 63,
  required: true
};

export default TextInputField;