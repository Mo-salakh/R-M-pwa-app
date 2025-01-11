/* eslint-disable react/prop-types */

export function TextInput({ name, label, value, type = 'text', required = false, placeHolder, error }) {
  const labelText = `${label}${required ? '*' : ''}`;
  return (
    <div className="input_box">
      <label className="label" >
      {labelText}
      {error && <span className="error-message">Ошибка ввода</span>}
        <input
          className="input"
          placeholder={placeHolder}
          name={name}
          type={type}
          value={value}
          required={required}
        />
      </label>
    </div>
  );
}

