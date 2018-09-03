import React from 'react';

const ButtonField = ({
  type,
  disabled,
  autoFocus,
  autoComplete,
  className,
  id,
  content
}) => {
  return (
    <fieldset>
      <button
        type={type}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        className={className}
        id={id}
      >
        {content}
      </button>
    </fieldset>
  );
};

ButtonField.defaultProps = {
  type: 'submit',
  className: 'button'
};

export default ButtonField;